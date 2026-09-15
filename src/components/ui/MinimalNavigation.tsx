"use client";

import React, { useState, useEffect } from "react";
import { MagneticWrapper } from "./MagneticWrapper";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface MinimalNavigationProps {
  activeChapter: number; // 0 to 4
  onNavigate: (chapterIndex: number) => void;
  onToggleChiragOS: () => void;
}

const CHAPTERS = [
  { id: "hero", label: "Studio", code: "01" },
  { id: "about", label: "About", code: "02" },
  { id: "projects", label: "Case Studies", code: "03" },
  { id: "architecture", label: "Architecture", code: "04" },
  { id: "contact", label: "Terminal & Contact", code: "05" }
];

export const MinimalNavigation: React.FC<MinimalNavigationProps> = ({
  activeChapter,
  onNavigate,
  onToggleChiragOS
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { playClick, playMacPop } = useSoundEffects();
  const { lightingMood, setLightingMood } = useAtmosphereStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMoodCycle = () => {
    playClick();
    const nextMood = lightingMood === "night" ? "golden" : lightingMood === "golden" ? "rain" : "night";
    setLightingMood(nextMood);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 pointer-events-none px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between ${
        isScrolled
          ? "bg-[#070A10]/70 backdrop-blur-xl border-b border-white/5 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* ── Left: Brand & Engineering Role ── */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <MagneticWrapper strength={10}>
          <button
            onClick={() => onNavigate(0)}
            data-cursor="link"
            className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
            aria-label="Scroll to top"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
            <div className="flex flex-col">
              <span className="font-mono text-xs font-bold text-white tracking-widest uppercase group-hover:text-sky-400 transition-colors">
                CHIRAG.DEV
              </span>
              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                SWE @ TCS
              </span>
            </div>
          </button>
        </MagneticWrapper>
      </div>

      {/* ── Center: Editorial Chapter Navigation (Desktop) ── */}
      <nav
        aria-label="Main Chapters"
        className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#121826]/80 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-auto"
      >
        {CHAPTERS.map((chap, idx) => {
          const isActive = activeChapter === idx;
          return (
            <MagneticWrapper key={chap.id} strength={8}>
              <button
                onClick={() => {
                  playClick();
                  onNavigate(idx);
                }}
                data-cursor="link"
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer relative flex items-center gap-1.5 ${
                  isActive
                    ? "text-white font-semibold bg-white/15 shadow-inner"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-sky-400 font-bold" : "text-slate-500"}`}>
                  {chap.code}
                </span>
                <span>{chap.label}</span>
              </button>
            </MagneticWrapper>
          );
        })}
      </nav>

      {/* ── Right: Quick Actions (Mood, ChiragOS Sandbox) ── */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Studio Lighting Mood Switcher */}
        <MagneticWrapper strength={10}>
          <button
            onClick={handleMoodCycle}
            data-cursor="link"
            title={`Studio Mood: ${lightingMood.toUpperCase()} (Click to toggle)`}
            aria-label="Toggle studio lighting mood"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-xs text-slate-300 transition-all cursor-pointer"
          >
            {lightingMood === "night" ? "🌙" : lightingMood === "golden" ? "🌅" : "🌧️"}
          </button>
        </MagneticWrapper>

        {/* Enter ChiragOS MacBook Sandbox Mode */}
        <MagneticWrapper strength={14}>
          <button
            onClick={() => {
              playMacPop();
              onToggleChiragOS();
            }}
            data-cursor="link"
            className="group flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 to-blue-600/20 hover:from-sky-500/30 hover:to-blue-600/30 border border-sky-400/40 hover:border-sky-400 text-white text-xs font-mono font-medium shadow-[0_4px_16px_rgba(2,132,199,0.25)] transition-all cursor-pointer active:scale-95"
            aria-label="Toggle ChiragOS macOS Sandbox Window"
          >
            <span className="text-sky-400 text-sm"></span>
            <span className="hidden xs:inline">ChiragOS</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-sky-300 font-mono">
              [Z]
            </span>
          </button>
        </MagneticWrapper>
      </div>
    </header>
  );
};
