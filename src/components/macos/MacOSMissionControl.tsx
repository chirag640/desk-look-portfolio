"use client";

import React, { useEffect } from "react";
import { useWindowManager, WindowId } from "@/hooks/useWindowManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Folder,
  Terminal,
  Disc3,
  FileEdit,
  LayoutGrid,
  Maximize2,
  X
} from "lucide-react";

interface WindowPreviewConfig {
  id: WindowId;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  previewSnippet: string;
}

export const MacOSMissionControl: React.FC = () => {
  const {
    isMissionControlOpen,
    closeMissionControl,
    toggleMissionControl,
    windows,
    activeWindow,
    focusWindow,
    openWindow,
    finderTab
  } = useWindowManager();

  const { playMacSwoosh, playMacPop, playClick } = useSoundEffects();

  // Listen for F3, ⌘Tab / Ctrl+Tab, and Escape hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F3 or Cmd/Ctrl+Tab to toggle Mission Control
      if (e.key === "F3" || ((e.metaKey || e.ctrlKey) && e.key === "Tab")) {
        e.preventDefault();
        playMacSwoosh();
        toggleMissionControl();
      } else if (e.key === "Escape" && isMissionControlOpen) {
        e.preventDefault();
        playMacSwoosh();
        closeMissionControl();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMissionControlOpen, toggleMissionControl, closeMissionControl, playMacSwoosh]);

  if (!isMissionControlOpen) return null;

  const windowConfigs: WindowPreviewConfig[] = [
    {
      id: "finder",
      name: "Finder — ChiragOS",
      category: `Active Space: ${finderTab.toUpperCase()}`,
      icon: Folder,
      accentColor: "text-blue-400 bg-blue-500/20 border-blue-500/30",
      previewSnippet: "Enterprise Software Engineer, TCS Digital, Flutter, Next.js, System Architecture"
    },
    {
      id: "terminal",
      name: "Terminal — zsh",
      category: "Developer Shell",
      icon: Terminal,
      accentColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500/30",
      previewSnippet: "neofetch · matrix · snake · hire chirag · flutter pub get"
    },
    {
      id: "music",
      name: "Studio Vinyl Player",
      category: "Hi-Fi Studio Audio",
      icon: Disc3,
      accentColor: "text-amber-400 bg-amber-500/20 border-amber-500/30",
      previewSnippet: "Vintage Bollywood Classics & English Melodic Chillout Playlists"
    },
    {
      id: "notes",
      name: "Desk Scratchpad",
      category: "Quick Notes",
      icon: FileEdit,
      accentColor: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      previewSnippet: "3M Desk sticky note for feedback, ideas, and quick messages"
    }
  ];

  const handleSelectWindow = (id: WindowId) => {
    playMacPop();
    openWindow(id);
    focusWindow(id);
    closeMissionControl();
  };

  return (
    <div
      onClick={() => {
        playMacSwoosh();
        closeMissionControl();
      }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 select-none animate-in fade-in duration-200"
    >
      {/* ── TOP MISSION CONTROL DESKTOP SPACES BAR ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#16181D]/90 border border-white/10 shadow-2xl backdrop-blur-3xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
            <LayoutGrid className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white tracking-tight flex items-center gap-2">
              <span>Mission Control & Stage Manager</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                F3 or ⌘Tab
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Click any window below to bring it to the foreground
            </div>
          </div>
        </div>

        {/* Virtual Desktop Spaces */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-white/15 border border-white/20 text-white text-xs font-medium shadow-sm">
            Desktop 1 (Active)
          </div>
          <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-white cursor-pointer transition-colors">
            Code Lab
          </div>
          <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs hover:text-white cursor-pointer transition-colors">
            Studio Audio
          </div>
        </div>

        <button
          onClick={() => {
            playMacSwoosh();
            closeMissionControl();
          }}
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ── TILED WINDOWS PERSPECTIVE GRID ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl my-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6"
      >
        {windowConfigs.map((cfg) => {
          const Icon = cfg.icon;
          const winState = windows[cfg.id];
          const isActive = activeWindow === cfg.id;
          const isOpen = winState?.isOpen && !winState?.isMinimized;

          return (
            <div
              key={cfg.id}
              onClick={() => handleSelectWindow(cfg.id)}
              className={`group relative rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer transform hover:-translate-y-2 hover:scale-[1.03] ${
                isOpen
                  ? "bg-[#181B24]/90 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                  : "bg-[#12141A]/70 border border-white/10 opacity-70 hover:opacity-100"
              } ${isActive ? "ring-2 ring-sky-500/70 shadow-[0_0_30px_rgba(14,165,233,0.3)]" : ""}`}
            >
              {/* Window Card Title & Status */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg ${cfg.accentColor} flex items-center justify-center border shrink-0`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate leading-tight">
                        {cfg.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 truncate block">
                        {cfg.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${
                      isOpen
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {isOpen ? "OPEN" : "STANDBY"}
                  </span>
                </div>

                {/* Perspective Window Preview Canvas Mock */}
                <div className="mt-3 rounded-xl bg-black/40 border border-white/10 p-3 h-32 flex flex-col justify-between overflow-hidden relative group-hover:border-white/30 transition-colors">
                  {/* macOS Traffic Lights decoration */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {cfg.previewSnippet}
                  </p>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-white/5">
                    <span>{cfg.id.toUpperCase()}.APP</span>
                    <Maximize2 className="w-2.5 h-2.5 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="mt-3 flex items-center justify-center py-1.5 rounded-xl bg-white/5 group-hover:bg-sky-500 group-hover:text-white text-slate-300 text-[11px] font-medium transition-all">
                Focus Window
              </div>
            </div>
          );
        })}
      </div>

      {/* ── FOOTER BAR WITH HELPFUL HINT ── */}
      <div className="text-[11px] font-mono text-slate-400 text-center flex items-center gap-3">
        <span>Click anywhere to dismiss</span>
        <span>·</span>
        <span>Press ESC to exit</span>
      </div>
    </div>
  );
};
