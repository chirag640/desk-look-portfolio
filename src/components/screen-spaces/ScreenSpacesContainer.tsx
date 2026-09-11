"use client";

import React, { useState, useEffect } from "react";
import { DesktopSpace } from "./DesktopSpace";
import { ProfileSpace } from "./ProfileSpace";
import { TechSpace } from "./TechSpace";
import { ProjectsSpace } from "./ProjectsSpace";
import { HistorySpace } from "./HistorySpace";
import { RepoResumeSpace } from "./RepoResumeSpace";
import { ContactSpace } from "./ContactSpace";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Monitor, User, Cpu, Box, Clock, FileText, Mail, Volume2, VolumeX } from "lucide-react";

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
  const { soundEnabled, playClick } = useSoundEffects();
  const [time, setTime] = useState("");

  // Continuous active space mapping (0 to 6)
  const activeSpace = Math.max(0, Math.min(6, Math.round(progress * 6)));

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
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

  return (
    <div className="relative w-full h-full bg-[#0B0E14] text-white flex flex-col overflow-hidden select-none font-sans">
      {/* ── TOP OS MENU BAR ── */}
      <div className="h-10 px-4 flex items-center justify-between border-b border-white/10 bg-[#121620]/90 backdrop-blur-md z-40 text-xs font-mono">
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#63C58A] animate-pulse" />
            <span className="font-bold tracking-tight text-white">ChiragOS</span>
            <span className="text-[10px] text-slate-400 bg-white/10 px-1.5 py-0.5 rounded">
              v2.6
            </span>
          </div>

          <span className="text-white/20">|</span>

          <span className="hidden md:inline text-slate-300 font-sans">
            Tata Consultancy Services (TCS) · Software Engineer
          </span>
        </div>

        {/* Center: Mission Control Virtual Spaces Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
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

        {/* Right: Sound, Zoom toggle, Time */}
        <div className="flex items-center gap-3">
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
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#5B8DEF]" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {time && (
            <span className="text-slate-400 font-mono hidden sm:inline">
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
          <div className="w-[14.2857%] h-full shrink-0">
            <DesktopSpace onNavigateSpace={handleNavigate} />
          </div>

          {/* Space 2: Profile */}
          <div className="w-[14.2857%] h-full shrink-0">
            <ProfileSpace />
          </div>

          {/* Space 3: Tech Stack */}
          <div className="w-[14.2857%] h-full shrink-0">
            <TechSpace />
          </div>

          {/* Space 4: Projects (flutter_blueprint) */}
          <div className="w-[14.2857%] h-full shrink-0">
            <ProjectsSpace />
          </div>

          {/* Space 5: History */}
          <div className="w-[14.2857%] h-full shrink-0">
            <HistorySpace />
          </div>

          {/* Space 6: Resume & 70 Repos */}
          <div className="w-[14.2857%] h-full shrink-0">
            <RepoResumeSpace />
          </div>

          {/* Space 7: Contact */}
          <div className="w-[14.2857%] h-full shrink-0">
            <ContactSpace onNavigateSpace={handleNavigate} />
          </div>
        </div>
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
        </div>
      </div>
    </div>
  );
};
