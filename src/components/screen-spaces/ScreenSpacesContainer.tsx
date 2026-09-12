"use client";

import React, { useState, useEffect } from "react";
import { DesktopSpace } from "./DesktopSpace";
import { ProfileSpace } from "./ProfileSpace";
import { TechSpace } from "./TechSpace";
import { ProjectsSpace } from "./ProjectsSpace";
import { HistorySpace } from "./HistorySpace";
import { RepoResumeSpace } from "./RepoResumeSpace";
import { ContactSpace } from "./ContactSpace";
import { TerminalWindow } from "./TerminalWindow";
import { MusicPopWidget } from "@/components/music/MusicPopWidget";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useAtmosphereStore, WallpaperTheme, LightingMood, KeyboardSwitchType, SWITCH_PROFILES } from "@/hooks/useAtmosphereStore";
import { useMusicStore, PLAYLISTS } from "@/hooks/useMusicStore";
import {
  Monitor,
  User,
  Cpu,
  Box,
  Clock,
  FileText,
  Mail,
  Volume2,
  VolumeX,
  Disc3,
  Sun,
  Moon,
  Sparkles,
  Terminal as TerminalIcon,
  Keyboard,
  Pin
} from "lucide-react";

interface ScreenSpacesContainerProps {
  progress: number;
  onScrollToProgress?: (p: number) => void;
  isZoomedIn?: boolean;
  onToggleZoom?: () => void;
}

const SPACES = [
  { id: "desktop", title: "Desktop", icon: Monitor, scrollProgress: 0 / 6 },
  { id: "profile", title: "Profile", icon: User, scrollProgress: 1 / 6 },
  { id: "tech", title: "Tech Stack", icon: Cpu, scrollProgress: 2 / 6 },
  { id: "projects", title: "Projects", icon: Box, scrollProgress: 3 / 6 },
  { id: "history", title: "History", icon: Clock, scrollProgress: 4 / 6 },
  { id: "resume", title: "Resume", icon: FileText, scrollProgress: 5 / 6 },
  { id: "contact", title: "Contact", icon: Mail, scrollProgress: 6 / 6 }
];

export const ScreenSpacesContainer: React.FC<ScreenSpacesContainerProps> = ({
  progress,
  onScrollToProgress,
  isZoomedIn = false,
  onToggleZoom
}) => {
  const { soundEnabled, playClick, playThock, playPaperRustle } = useSoundEffects();
  const {
    lightingMood,
    setLightingMood,
    wallpaperTheme,
    setWallpaperTheme,
    toggleTerminal,
    keyboardSwitch,
    setKeyboardSwitch,
    toggleStickyNote
  } = useAtmosphereStore();

  const {
    activePlaylist,
    isPlaying,
    togglePlay,
    setPlayerOpen,
    isMinimized,
    toggleMinimize
  } = useMusicStore();

  const [time, setTime] = useState("");
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Active space mapping (0 to 6)
  const activeSpace = Math.max(0, Math.min(6, Math.round(progress * 6)));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time (IST) display for Chirag's home location
      const istTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
      setTime(`${istTime} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (idx: number) => {
    playClick();
    if (onScrollToProgress) {
      onScrollToProgress(SPACES[idx].scrollProgress);
    }
  };

  const handleOpenMusic = () => {
    playClick();
    setPlayerOpen(true);
    if (isMinimized) {
      toggleMinimize();
    }
  };

  // Background wallpapers
  const wallpaperBg = {
    obsidian: "bg-gradient-to-br from-[#0A0D14] via-[#0E131F] to-[#080B10]",
    sakura: "bg-gradient-to-br from-[#160D1E] via-[#231330] to-[#0F0815]",
    sonoma: "bg-gradient-to-br from-[#1E120A] via-[#2D1B10] to-[#120B05]",
    nordic: "bg-gradient-to-br from-[#0C141F] via-[#132030] to-[#070D14]"
  }[wallpaperTheme];

  return (
    <div
      className={`relative w-full h-full ${wallpaperBg} text-white flex flex-col overflow-hidden select-none font-sans transition-colors duration-700`}
    >
      {/* ── TOP OS MENU BAR ── */}
      <div className="h-10 px-3 sm:px-4 flex items-center justify-between border-b border-white/10 bg-[#121620]/90 backdrop-blur-md z-40 text-xs font-mono">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
            <span className="font-bold tracking-tight text-white">ChiragOS</span>
            <span className="text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">
              v2.6
            </span>
          </div>

          <span className="text-white/20 hidden sm:inline">|</span>

          {/* Studio Vinyl Music Player Pill */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleOpenMusic}
              className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                isPlaying
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-sm"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
              title="Open Studio Vinyl Player (Old Hindi Songs & English Chill)"
            >
              <Disc3 className={`w-3.5 h-3.5 text-amber-400 ${isPlaying ? "animate-spin" : ""}`} />
              <span className="text-[10px] font-bold hidden md:inline">
                {activePlaylist === "retro_hindi" ? "Old Hindi Songs" : "English Chill"}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5 ml-0.5">
                  <span className="w-0.5 h-2 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-amber-400 animate-bounce" />
                </span>
              )}
            </button>

            {/* Quick Play/Pause Button */}
            <button
              onClick={() => {
                playClick();
                togglePlay();
              }}
              className="px-1.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-[10px] font-mono border border-white/10 transition-colors cursor-pointer"
              title={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        </div>

        {/* Center: Mission Control Virtual Spaces Switcher */}
        <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
          {SPACES.map((space, idx) => {
            const isActive = activeSpace === idx;
            return (
              <button
                key={space.id}
                onClick={() => handleNavigate(idx)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#5B8DEF] text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                Space {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Right: Switch Profile / Scratchpad / Theme / Wallpaper / Zoom / Clock */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 relative">
          {/* Desk Scratchpad 3M Note Quick Launcher */}
          <button
            onClick={() => {
              playPaperRustle();
              toggleStickyNote();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FEF08A]/20 hover:bg-[#FEF08A]/30 text-yellow-300 border border-yellow-300/30 text-[11px] transition-colors cursor-pointer"
            title="Desk Scratchpad (3M Yellow Sticky Note) - Leave quick feedback"
          >
            <Pin className="w-3 h-3 text-yellow-300" />
            <span className="hidden sm:inline">Scratchpad</span>
          </button>

          {/* Mechanical Keyboard Switch Profile Customizer Button */}
          <button
            onClick={() => {
              const next: KeyboardSwitchType =
                keyboardSwitch === "boba_u4t"
                  ? "gateron_yellow"
                  : keyboardSwitch === "gateron_yellow"
                  ? "cherry_blue"
                  : "boba_u4t";
              setKeyboardSwitch(next);
              playThock(next);
            }}
            className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer border border-white/10"
            title={`Mechanical Switch: ${SWITCH_PROFILES[keyboardSwitch].name} (${SWITCH_PROFILES[keyboardSwitch].soundDescription}) - Click to toggle profile`}
          >
            <Keyboard className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[10px]">{SWITCH_PROFILES[keyboardSwitch].name.split(" ")[0]}</span>
          </button>

          {/* Theme & Wallpaper Selector Dropdown Toggle */}
          <button
            onClick={() => {
              playClick();
              setShowThemeMenu(!showThemeMenu);
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
            title="Custom Wallpapers & Moods"
          >
            <Sparkles className="w-3 h-3 text-[#FBBF24]" />
            <span className="hidden lg:inline">Atmosphere</span>
          </button>

          {/* Dropdown Menu */}
          {showThemeMenu && (
            <div className="absolute top-10 right-14 w-60 p-3 rounded-xl bg-[#141A28]/95 border border-white/20 backdrop-blur-2xl shadow-2xl z-50 space-y-2.5 text-xs">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                Studio Lighting Mood
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(["night", "golden", "rain"] as LightingMood[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      playClick();
                      setLightingMood(m);
                    }}
                    className={`px-1.5 py-1 rounded text-[10px] capitalize font-mono transition-colors cursor-pointer ${
                      lightingMood === m ? "bg-[#38BDF8] text-black font-bold" : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {m === "night" ? "🌙 Night" : m === "golden" ? "☀️ Sunset" : "🌧️ Moody"}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase pt-1">
                Acoustic Mechanical Switches
              </div>
              <div className="grid grid-cols-1 gap-1 font-mono text-[10px]">
                {(["boba_u4t", "gateron_yellow", "cherry_blue"] as KeyboardSwitchType[]).map((sw) => (
                  <button
                    key={sw}
                    onClick={() => {
                      setKeyboardSwitch(sw);
                      playThock(sw);
                    }}
                    className={`p-1.5 rounded text-left flex items-center justify-between transition-colors cursor-pointer ${
                      keyboardSwitch === sw
                        ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <span>{SWITCH_PROFILES[sw].name}</span>
                    <span className="text-[9px] text-slate-400">({SWITCH_PROFILES[sw].soundDescription})</span>
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase pt-1">
                Desktop Wallpaper
              </div>
              <div className="grid grid-cols-2 gap-1">
                {(
                  [
                    { id: "obsidian", label: "🌑 Obsidian" },
                    { id: "sakura", label: "🌸 Sakura" },
                    { id: "sonoma", label: "🌅 Sonoma" },
                    { id: "nordic", label: "❄️ Nordic" }
                  ] as { id: WallpaperTheme; label: string }[]
                ).map((w) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      playClick();
                      setWallpaperTheme(w.id);
                    }}
                    className={`px-1.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                      wallpaperTheme === w.id
                        ? "bg-white text-black font-bold"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {onToggleZoom && (
            <button
              onClick={() => {
                playClick();
                onToggleZoom();
              }}
              className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors cursor-pointer"
            >
              {isZoomedIn ? "Desk View [Z]" : "Screen View [Z]"}
            </button>
          )}

          <button
            onClick={() => {
              const store = (window as unknown as { __SOUND_TOGGLE?: () => void }).__SOUND_TOGGLE;
              if (store) store();
              playClick();
            }}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? "Mute Sound" : "Enable Sound Effects"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#5B8DEF]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>

          {time && (
            <span className="text-slate-400 font-mono hidden xl:inline">
              {time}
            </span>
          )}
        </div>
      </div>

      {/* ── MAIN VIRTUAL DESKTOP SPACES SLIDER ── */}
      <div className="relative flex-1 w-full overflow-hidden">
        <div
          className="flex h-full w-[700%] transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{ transform: `translateX(-${activeSpace * (100 / 7)}%)` }}
        >
          {/* Space 1: Desktop Boot */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={0}>
            <DesktopSpace onNavigateSpace={handleNavigate} />
          </div>

          {/* Space 2: Profile */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={1}>
            <ProfileSpace />
          </div>

          {/* Space 3: Tech Stack */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={2}>
            <TechSpace />
          </div>

          {/* Space 4: Projects (flutter_blueprint) */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={3}>
            <ProjectsSpace />
          </div>

          {/* Space 5: History */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={4}>
            <HistorySpace />
          </div>

          {/* Space 6: Resume & 70 Repos */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={5}>
            <RepoResumeSpace />
          </div>

          {/* Space 7: Contact */}
          <div className="w-[14.2857%] h-full shrink-0" data-space-index={6}>
            <ContactSpace onNavigateSpace={handleNavigate} />
          </div>
        </div>

        {/* ── DRAGGABLE INTERACTIVE TERMINAL WINDOW OVERLAY ── */}
        <TerminalWindow />

        {/* ── STUDIO VINYL MUSIC PLAYER POPUP WIDGET ── */}
        <MusicPopWidget />
      </div>

      {/* ── BOTTOM DOCK ── */}
      <div className="h-16 flex items-center justify-center z-40 pb-2">
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 shadow-2xl">
          {SPACES.map((space, idx) => {
            const Icon = space.icon;
            const isActive = activeSpace === idx;
            return (
              <button
                key={space.id}
                onClick={() => handleNavigate(idx)}
                className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-lg -translate-y-1 scale-105"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/15 hover:-translate-y-0.5"
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />

                {/* Tooltip */}
                <span className="pointer-events-none absolute -top-8 px-2 py-0.5 text-[10px] font-mono text-white bg-black/90 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  {space.title}
                </span>

                {/* Active Dot */}
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#5B8DEF]" />
                )}
              </button>
            );
          })}

          <div className="w-[1px] h-6 bg-white/20 mx-0.5" />

          {/* Vinyl Music Player Launcher in Dock */}
          <button
            onClick={handleOpenMusic}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all cursor-pointer ${
              isPlaying
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 -translate-y-0.5"
                : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/15 hover:-translate-y-0.5"
            }`}
            title="Studio Vinyl Player"
          >
            <Disc3 className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${isPlaying ? "animate-spin" : ""}`} />
            <span className="pointer-events-none absolute -top-8 px-2 py-0.5 text-[10px] font-mono text-white bg-black/90 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Vinyl Player
            </span>
          </button>

          {/* Terminal Launcher in Dock */}
          <button
            onClick={() => {
              playClick();
              toggleTerminal();
            }}
            className="group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#0284C7]/20 text-[#38BDF8] border border-[#38BDF8]/40 hover:bg-[#0284C7]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            title="Open Interactive Terminal"
          >
            <TerminalIcon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute -top-8 px-2 py-0.5 text-[10px] font-mono text-white bg-black/90 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Terminal
            </span>
          </button>

          {/* Desk Scratchpad 3M Note Launcher in Dock */}
          <button
            onClick={() => {
              playPaperRustle();
              toggleStickyNote();
            }}
            className="group relative flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FEF08A]/20 text-yellow-300 border border-yellow-300/40 hover:bg-[#FEF08A]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            title="Desk Scratchpad (3M Yellow Note)"
          >
            <Pin className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
            <span className="pointer-events-none absolute -top-8 px-2 py-0.5 text-[10px] font-mono text-white bg-black/90 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              Scratchpad
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
