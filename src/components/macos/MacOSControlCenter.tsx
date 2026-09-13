"use client";

import React from "react";
import { useAtmosphereStore, LightingMood, WallpaperTheme, KeyboardSwitchType, SWITCH_PROFILES, getSunSyncMood } from "@/hooks/useAtmosphereStore";
import { useSoundEffects, useSoundStore } from "@/hooks/useSoundEffects";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useWindowManager } from "@/hooks/useWindowManager";
import {
  Sun,
  Moon,
  CloudRain,
  Volume2,
  VolumeX,
  Radio,
  Sliders,
  Sparkles,
  Monitor,
  Check,
  Disc3,
  Keyboard,
  X
} from "lucide-react";

export const MacOSControlCenter: React.FC = () => {
  const { isControlCenterOpen, closeControlCenter } = useWindowManager();
  const {
    lightingMood,
    setLightingMood,
    wallpaperTheme,
    setWallpaperTheme,
    isAutoSkySync,
    toggleAutoSkySync,
    cameraView,
    setCameraView,
    keyboardSwitch,
    setKeyboardSwitch
  } = useAtmosphereStore();

  const { isTapeWarmth, toggleTapeWarmth, isPlaying, togglePlay } = useMusicStore();
  const { soundEnabled, playClick, playThock } = useSoundEffects();
  const { toggleSound } = useSoundStore();

  if (!isControlCenterOpen) return null;

  return (
    <div
      className="absolute top-9 right-3 w-80 sm:w-88 rounded-2xl bg-[#0F172A]/90 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl z-50 p-3.5 space-y-3 text-white text-xs select-none animate-in fade-in zoom-in-95 duration-150"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-semibold text-[13px] tracking-tight">Control Center</span>
        </div>
        <button
          onClick={closeControlCenter}
          className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* ── 1. STUDIO LIGHTING & SKY SYNC ── */}
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Atmosphere Lighting</span>
          </div>
          <button
            onClick={() => {
              playClick();
              toggleAutoSkySync();
            }}
            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer border ${
              isAutoSkySync
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            {isAutoSkySync ? `Sky Sync: ${getSunSyncMood().label}` : "Manual"}
          </button>
        </div>

        {/* Lighting Mood Pills */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          {(
            [
              { id: "night", label: "Night", icon: Moon },
              { id: "golden", label: "Golden", icon: Sun },
              { id: "rain", label: "Rainy", icon: CloudRain }
            ] as const
          ).map((m) => {
            const Icon = m.icon;
            const isSel = lightingMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  playClick();
                  setLightingMood(m.id as LightingMood);
                }}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                  isSel
                    ? "bg-[#0284C7] border-[#38BDF8] text-white shadow-sm"
                    : "bg-black/30 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. AUDIO & VINTAGE TAPE CONTROLS ── */}
      <div className="grid grid-cols-2 gap-2">
        {/* Sound Effects */}
        <button
          onClick={() => {
            playClick();
            toggleSound();
          }}
          className={`p-2.5 rounded-xl border flex flex-col items-start gap-1.5 transition-all cursor-pointer text-left ${
            soundEnabled
              ? "bg-[#0284C7]/20 border-[#38BDF8]/40 text-white"
              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#38BDF8]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-[10px] font-mono">{soundEnabled ? "ON" : "OFF"}</span>
          </div>
          <div>
            <div className="font-medium text-[11px]">System Audio</div>
            <div className="text-[10px] text-slate-400">Sound Effects & Thocks</div>
          </div>
        </button>

        {/* Vintage Tape Saturation */}
        <button
          onClick={() => {
            playClick();
            toggleTapeWarmth();
          }}
          className={`p-2.5 rounded-xl border flex flex-col items-start gap-1.5 transition-all cursor-pointer text-left ${
            isTapeWarmth
              ? "bg-amber-500/20 border-amber-400/40 text-white"
              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            <Radio className={`w-4 h-4 ${isTapeWarmth ? "text-amber-400" : "text-slate-400"}`} />
            <span className="text-[10px] font-mono">{isTapeWarmth ? "ON" : "OFF"}</span>
          </div>
          <div>
            <div className="font-medium text-[11px]">Vinyl Warmth</div>
            <div className="text-[10px] text-slate-400">Analog Tape Hiss</div>
          </div>
        </button>
      </div>

      {/* ── 3. MECHANICAL KEYBOARD ACOUSTIC PROFILE ── */}
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-200 font-medium">
            <Keyboard className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Mechanical Switch</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            {SWITCH_PROFILES[keyboardSwitch].name.split(" ")[0]}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {(
            [
              { id: "cherry_blue", label: "Cherry Blue", desc: "Clicky" },
              { id: "gateron_yellow", label: "Gateron Yellow", desc: "Creamy" },
              { id: "boba_u4t", label: "Boba U4T", desc: "Thock" }
            ] as const
          ).map((s) => {
            const isSel = keyboardSwitch === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setKeyboardSwitch(s.id as KeyboardSwitchType);
                  playThock(s.id as KeyboardSwitchType);
                }}
                className={`py-1 px-1.5 rounded-lg text-[10px] flex flex-col items-center transition-all cursor-pointer border ${
                  isSel
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-200 font-bold"
                    : "bg-black/30 border-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span>{s.label.split(" ")[0]}</span>
                <span className="text-[9px] text-slate-400 font-normal">{s.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. WALLPAPER SELECTION ── */}
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
        <div className="flex items-center gap-1.5 text-slate-200 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span>Desktop Wallpaper</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {(
            [
              { id: "obsidian", label: "Obsidian", color: "from-slate-900 to-black" },
              { id: "sakura", label: "Sakura", color: "from-purple-900 via-pink-950 to-slate-950" },
              { id: "sonoma", label: "Sonoma", color: "from-amber-900 via-rose-950 to-slate-950" },
              { id: "nordic", label: "Nordic", color: "from-cyan-950 via-slate-900 to-blue-950" }
            ] as const
          ).map((w) => {
            const isSel = wallpaperTheme === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  playClick();
                  setWallpaperTheme(w.id as WallpaperTheme);
                }}
                className={`p-1.5 rounded-lg text-[10px] flex items-center justify-center gap-1 font-medium transition-all cursor-pointer border ${
                  isSel
                    ? "bg-[#0284C7]/30 border-[#38BDF8] text-white"
                    : "bg-black/40 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${w.color}`} />
                <span>{w.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 5. 3D STUDIO DESK VIEW TOGGLE ── */}
      <button
        onClick={() => {
          playClick();
          closeControlCenter();
          setCameraView(cameraView === "screen" ? "desk" : "screen");
        }}
        className="w-full py-2 px-3 rounded-xl bg-[#1E293B]/80 hover:bg-[#334155] border border-white/15 flex items-center justify-between text-slate-200 hover:text-white transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Monitor className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span className="font-medium text-[11px]">
            {cameraView === "screen" ? "View 3D Studio Desk" : "Return to Full Screen"}
          </span>
        </div>
        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300">
          [Z]
        </span>
      </button>
    </div>
  );
};
