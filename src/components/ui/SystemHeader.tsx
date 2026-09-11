"use client";

import React, { useState, useEffect } from "react";
import { SYSTEM_META } from "@/lib/constants";
import { Volume2, VolumeX, Sparkles, Terminal } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SystemHeaderProps {
  onNavigate: (progress: number) => void;
  activeSceneName?: string;
}

export const SystemHeader: React.FC<SystemHeaderProps> = ({
  onNavigate,
  activeSceneName = "System Boot"
}) => {
  const { soundEnabled, playClick } = useSoundEffects();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-2.5 flex items-center justify-between backdrop-blur-md bg-white/75 border-b border-[rgba(21,21,21,0.06)] transition-all">
      {/* Top Left: OS Brand & Status */}
      <div className="flex items-center gap-2.5 select-none">
        <button
          onClick={() => onNavigate(0.0)}
          className="flex items-center gap-2 font-bold text-xs sm:text-sm tracking-tight text-[#151515] hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#63C58A] animate-status-pulse shadow-[0_0_8px_#63C58A]" />
          <span className="font-semibold">{SYSTEM_META.owner}</span>
          <span className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-[#F0F1EE] text-[#6B6F73] rounded border border-[rgba(21,21,21,0.08)]">
            v{SYSTEM_META.osVersion}
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#6B6F73] pl-2 border-l border-[rgba(21,21,21,0.08)]">
          <Terminal className="w-3.5 h-3.5 text-[#5B8DEF]" />
          <span className="font-mono text-[11px]">{activeSceneName}</span>
        </div>
      </div>

      {/* Top Center: Subtitle */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-[#475569] select-none font-medium">
        <Sparkles className="w-3.5 h-3.5 text-[#5B8DEF]" />
        <span>TCS Software Engineer · Creator of flutter_blueprint (Pub.dev)</span>
      </div>

      {/* Top Right: System utilities (Audio, Time, Direct Actions) */}
      <div className="flex items-center gap-2 sm:gap-3 select-none">
        <button
          type="button"
          onClick={() => {
            const store = (window as unknown as { __SOUND_TOGGLE?: () => void }).__SOUND_TOGGLE;
            if (store) store();
            playClick();
          }}
          aria-label={soundEnabled ? "Mute audio" : "Enable micro-sound effects"}
          className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
            soundEnabled
              ? "bg-[#5B8DEF15] border-[#5B8DEF40] text-[#3465C5]"
              : "bg-[#F0F1EE] border-[rgba(21,21,21,0.08)] text-[#6B6F73] hover:text-[#151515]"
          }`}
          title={soundEnabled ? "Mute sound" : "Enable micro-sound effects (Muted by default)"}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline text-[11px] font-mono">
            {soundEnabled ? "Audio ON" : "Audio OFF"}
          </span>
        </button>

        <button
          onClick={() => onNavigate(0.88)}
          className="hidden md:inline-flex px-2.5 py-1 text-xs font-medium rounded-lg bg-[#F0F1EE] hover:bg-[#E4E6E2] text-[#151515] border border-[rgba(21,21,21,0.08)] transition-colors cursor-pointer"
        >
          Resume
        </button>

        <button
          onClick={() => onNavigate(0.98)}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#151515] hover:bg-[#252525] text-white transition-all shadow-sm cursor-pointer"
        >
          Get in Touch
        </button>

        {time && (
          <span className="hidden sm:inline-block font-mono text-xs text-[#6B6F73] pl-2 border-l border-[rgba(21,21,21,0.08)]">
            {time}
          </span>
        )}
      </div>
    </header>
  );
};
