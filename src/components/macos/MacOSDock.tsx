"use client";

import React from "react";
import { useWindowManager, FinderTab } from "@/hooks/useWindowManager";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Folder,
  Layers,
  Box,
  Terminal,
  Disc3,
  Pin,
  Mail,
  Monitor,
  LayoutGrid,
  Code
} from "lucide-react";

type DockAction = "finder" | "tech" | "projects" | "terminal" | "music" | "notes" | "contact" | "mission" | "desk";

export const MacOSDock: React.FC = () => {
  const {
    windows,
    openWindow,
    toggleWindow,
    focusWindow,
    setFinderTab,
    isMissionControlOpen,
    toggleMissionControl
  } = useWindowManager();
  const { cameraView, setCameraView } = useAtmosphereStore();
  const { playClick, playMacSwoosh, playPaperRustle } = useSoundEffects();

  const handleAppClick = (app: DockAction) => {
    playClick();

    if (app === "finder") {
      if (!windows.finder.isOpen || windows.finder.isMinimized) {
        openWindow("finder");
      } else {
        focusWindow("finder");
      }
    } else if (app === "tech") {
      setFinderTab("tech");
    } else if (app === "projects") {
      setFinderTab("projects");
    } else if (app === "contact") {
      setFinderTab("contact");
    } else if (app === "terminal") {
      toggleWindow("terminal");
    } else if (app === "music") {
      toggleWindow("music");
    } else if (app === "notes") {
      playPaperRustle();
      toggleWindow("notes");
    } else if (app === "mission") {
      playMacSwoosh();
      toggleMissionControl();
    } else if (app === "desk") {
      setCameraView(cameraView === "screen" ? "desk" : "screen");
    }
  };

  const dockApps: {
    id: DockAction;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    isOpen: boolean;
  }[] = [
    {
      id: "finder",
      name: "Finder (About)",
      icon: Folder,
      color: "from-blue-500 to-indigo-600",
      isOpen: windows.finder.isOpen && !windows.finder.isMinimized
    },
    {
      id: "tech",
      name: "Technologies",
      icon: Layers,
      color: "from-emerald-500 to-teal-600",
      isOpen: windows.finder.isOpen && !windows.finder.isMinimized
    },
    {
      id: "projects",
      name: "Projects & Architecture",
      icon: Box,
      color: "from-amber-500 to-orange-600",
      isOpen: windows.finder.isOpen && !windows.finder.isMinimized
    },
    {
      id: "mission",
      name: "Mission Control [F3]",
      icon: LayoutGrid,
      color: "from-sky-500 to-blue-700",
      isOpen: isMissionControlOpen
    },
    {
      id: "terminal",
      name: "Terminal (zsh)",
      icon: Terminal,
      color: "from-slate-800 to-slate-950",
      isOpen: windows.terminal.isOpen && !windows.terminal.isMinimized
    },
    {
      id: "music",
      name: "Studio Music Player",
      icon: Disc3,
      color: "from-rose-500 to-pink-600",
      isOpen: windows.music.isOpen && !windows.music.isMinimized
    },
    {
      id: "notes",
      name: "Quick Scratchpad",
      icon: Pin,
      color: "from-yellow-400 to-amber-500",
      isOpen: windows.notes.isOpen && !windows.notes.isMinimized
    },
    {
      id: "contact",
      name: "Contact Engineer",
      icon: Mail,
      color: "from-sky-500 to-blue-600",
      isOpen: windows.finder.isOpen && !windows.finder.isMinimized
    }
  ];

  return (
    <footer className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none">
      <div className="flex items-end gap-2 sm:gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/10 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
        {dockApps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="group relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-2 active:scale-95"
            >
              {/* Tooltip */}
              <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-[#0F172A]/95 border border-white/15 text-[11px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {app.name}
              </div>

              {/* Icon Tile */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${app.color} p-2 flex items-center justify-center text-white shadow-lg border border-white/20 transition-all`}
              >
                <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 drop-shadow" />
              </div>

              {/* Running Dot Indicator */}
              <div className="h-1 flex items-center justify-center mt-1">
                {app.isOpen && <div className="w-1 h-1 rounded-full bg-white/90 shadow-[0_0_4px_white]" />}
              </div>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-8 bg-white/20 mx-0.5 self-center" />

        {/* 3D Studio Desk Camera Switcher */}
        <button
          onClick={() => handleAppClick("desk")}
          className="group relative flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-2 active:scale-95"
        >
          <div className="absolute -top-9 px-2.5 py-1 rounded-md bg-[#0F172A]/95 border border-white/15 text-[11px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {cameraView === "screen" ? "View 3D Studio Desk [Z]" : "Return to Full Screen [Z]"}
          </div>

          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 p-2 flex items-center justify-center text-[#38BDF8] shadow-lg border border-white/20">
            <Monitor className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>

          <div className="h-1 flex items-center justify-center mt-1">
            {cameraView === "desk" && <div className="w-1 h-1 rounded-full bg-[#38BDF8] shadow-[0_0_4px_#38BDF8]" />}
          </div>
        </button>
      </div>
    </footer>
  );
};
