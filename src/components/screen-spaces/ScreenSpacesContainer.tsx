"use client";

import React, { useEffect } from "react";
import { MacOSMenuBar } from "@/components/macos/MacOSMenuBar";
import { MacOSControlCenter } from "@/components/macos/MacOSControlCenter";
import { FinderWindow } from "@/components/macos/FinderWindow";
import { MacOSDock } from "@/components/macos/MacOSDock";
import { TerminalWindow } from "./TerminalWindow";
import { MusicPopWidget } from "@/components/music/MusicPopWidget";
import { useWindowManager, FinderTab } from "@/hooks/useWindowManager";
import { useAtmosphereStore, WallpaperTheme } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Folder,
  Layers,
  Box,
  Clock,
  FileText,
  Mail,
  Terminal,
  Disc3,
  Pin,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface ScreenSpacesContainerProps {
  progress?: number;
  onScrollToProgress?: (p: number) => void;
  isZoomedIn?: boolean;
  onToggleZoom?: () => void;
}

export const ScreenSpacesContainer: React.FC<ScreenSpacesContainerProps> = ({
  progress = 0,
  onScrollToProgress,
  isZoomedIn = true,
  onToggleZoom
}) => {
  const { wallpaperTheme, toggleTerminal, toggleStickyNote } = useAtmosphereStore();
  const { windows, openWindow, setFinderTab, closeAllMenus } = useWindowManager();
  const { playClick, playPaperRustle } = useSoundEffects();

  // Synchronize external scroll progress with Finder tabs
  useEffect(() => {
    const tabs: FinderTab[] = ["about", "tech", "projects", "history", "resume", "contact"];
    const idx = Math.min(tabs.length - 1, Math.max(0, Math.round(progress * (tabs.length - 1))));
    // Only update if Finder is already open
    if (windows.finder.isOpen) {
      setFinderTab(tabs[idx]);
    }
  }, [progress, windows.finder.isOpen, setFinderTab]);

  // Soothing macOS Sequoia wallpapers
  const wallpaperStyles: Record<WallpaperTheme, { bg: string; orb1: string; orb2: string }> = {
    obsidian: {
      bg: "from-[#080B12] via-[#0D121F] to-[#06080E]",
      orb1: "bg-[#0284C7]/15",
      orb2: "bg-[#6366F1]/10"
    },
    sakura: {
      bg: "from-[#120B1A] via-[#1F122B] to-[#0A0710]",
      orb1: "bg-[#EC4899]/15",
      orb2: "bg-[#8B5CF6]/15"
    },
    sonoma: {
      bg: "from-[#170E08] via-[#2A180E] to-[#0E0905]",
      orb1: "bg-[#F97316]/15",
      orb2: "bg-[#EAB308]/10"
    },
    nordic: {
      bg: "from-[#07111B] via-[#0E1E2E] to-[#050A10]",
      orb1: "bg-[#06B6D4]/15",
      orb2: "bg-[#3B82F6]/10"
    }
  };

  const currentWp = wallpaperStyles[wallpaperTheme] || wallpaperStyles.obsidian;

  // Desktop shortcuts to access spaces quickly
  const desktopShortcuts = [
    {
      id: "about" as FinderTab,
      label: "About Chirag",
      icon: Folder,
      color: "text-blue-400 bg-blue-500/20"
    },
    {
      id: "tech" as FinderTab,
      label: "Tech Stack",
      icon: Layers,
      color: "text-emerald-400 bg-emerald-500/20"
    },
    {
      id: "projects" as FinderTab,
      label: "Projects (v3)",
      icon: Box,
      color: "text-amber-400 bg-amber-500/20"
    },
    {
      id: "history" as FinderTab,
      label: "TCS Experience",
      icon: Clock,
      color: "text-purple-400 bg-purple-500/20"
    },
    {
      id: "resume" as FinderTab,
      label: "Resume.pdf",
      icon: FileText,
      color: "text-rose-400 bg-rose-500/20"
    },
    {
      id: "contact" as FinderTab,
      label: "Contact.app",
      icon: Mail,
      color: "text-sky-400 bg-sky-500/20"
    }
  ];

  const handleOpenFinderTab = (tab: FinderTab) => {
    playClick();
    setFinderTab(tab);
    openWindow("finder");
  };

  return (
    <div
      onClick={closeAllMenus}
      className={`relative w-full h-full bg-gradient-to-br ${currentWp.bg} text-white flex flex-col overflow-hidden select-none font-sans transition-colors duration-700`}
    >
      {/* Dynamic Ambient Blur Orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full ${currentWp.orb1} blur-[120px] pointer-events-none transition-all duration-1000`}
      />
      <div
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full ${currentWp.orb2} blur-[140px] pointer-events-none transition-all duration-1000`}
      />

      {/* ── 1. NATIVE MACOS MENU BAR ── */}
      <MacOSMenuBar />

      {/* ── 2. NATIVE MACOS CONTROL CENTER POPOVER ── */}
      <MacOSControlCenter />

      {/* ── 3. MACOS DESKTOP WORKSPACE CANVAS ── */}
      <div className="relative flex-1 w-full overflow-hidden p-3 sm:p-5">
        {/* Desktop Icons Grid (Top-Right macOS arrangement) */}
        <div className="absolute top-4 right-4 sm:right-6 flex flex-col gap-3 z-10">
          {desktopShortcuts.map((sc) => {
            const Icon = sc.icon;
            return (
              <button
                key={sc.id}
                onClick={() => handleOpenFinderTab(sc.id)}
                className="group flex flex-col items-center gap-1 w-20 p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer text-center"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${sc.color} flex items-center justify-center border border-white/10 shadow-md group-hover:scale-105 group-hover:shadow-lg transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-slate-200 group-hover:text-white font-medium drop-shadow leading-tight line-clamp-2">
                  {sc.label}
                </span>
              </button>
            );
          })}

          {/* Quick Terminal Shortcut */}
          <button
            onClick={() => {
              playClick();
              toggleTerminal();
            }}
            className="group flex flex-col items-center gap-1 w-20 p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 text-emerald-400 flex items-center justify-center border border-white/10 shadow-md group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="text-[11px] text-slate-200 group-hover:text-white font-medium drop-shadow leading-tight">
              Terminal.app
            </span>
          </button>
        </div>

        {/* Desktop Welcome Watermark (Visible when windows are minimized) */}
        <div className="absolute bottom-24 left-6 sm:left-10 z-0 pointer-events-none opacity-40 max-w-sm select-none">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl text-white font-light"></span>
            <span className="text-sm font-semibold tracking-wider text-white uppercase font-mono">
              ChiragOS Sequoia
            </span>
          </div>
          <p className="text-xs text-slate-300 font-mono">
            TCS Software Engineer · Gandhinagar Node
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            Double-click any desktop folder or dock app to explore. Press [Z] to return to 3D desk.
          </p>
        </div>

        {/* ── 4. AUTHENTIC FROSTED-GLASS FINDER WINDOW ── */}
        <FinderWindow />

        {/* ── 5. DRAGGABLE INTERACTIVE TERMINAL WINDOW ── */}
        <TerminalWindow />

        {/* ── 6. STUDIO VINYL MUSIC PLAYER WIDGET ── */}
        <MusicPopWidget />
      </div>

      {/* ── 7. NATIVE MACOS DOCK ── */}
      <MacOSDock />
    </div>
  );
};
