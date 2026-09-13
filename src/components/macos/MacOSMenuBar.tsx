"use client";

import React, { useState, useEffect } from "react";
import { useWindowManager, FinderTab } from "@/hooks/useWindowManager";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useMusicStore, PLAYLISTS } from "@/hooks/useMusicStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Sliders,
  Search,
  Wifi,
  BatteryCharging,
  Disc3,
  Play,
  Pause,
  ExternalLink,
  Code,
  Briefcase,
  Layers,
  Terminal,
  FileText,
  Mail
} from "lucide-react";

export const MacOSMenuBar: React.FC = () => {
  const {
    isAppleMenuOpen,
    toggleAppleMenu,
    closeAppleMenu,
    toggleControlCenter,
    toggleSpotlight,
    toggleMissionControl,
    lockScreen,
    setFinderTab,
    openWindow,
    closeAllMenus
  } = useWindowManager();

  const { cameraView, setCameraView } = useAtmosphereStore();
  const { activePlaylist, isPlaying, togglePlay } = useMusicStore();
  const { playClick } = useSoundEffects();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric"
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      });
      setTime(`${dateStr}  ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (menu: string) => {
    playClick();
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
      closeAllMenus();
    }
  };

  const handleGoTo = (tab: FinderTab) => {
    playClick();
    setFinderTab(tab);
    setActiveDropdown(null);
  };

  return (
    <header
      onClick={(e) => e.stopPropagation()}
      className="relative w-full h-7 bg-[#12141A]/90 backdrop-blur-2xl border-b border-white/10 z-40 flex items-center justify-between px-2 sm:px-3 text-xs text-slate-200 select-none font-sans"
    >
      {/* ── LEFT MENU ITEMS ── */}
      <div className="flex items-center gap-1">
        {/* Apple  Logo Button */}
        <div className="relative">
          <button
            onClick={() => {
              playClick();
              toggleAppleMenu();
              setActiveDropdown(null);
            }}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer text-sm ${
              isAppleMenuOpen ? "bg-white/20 text-white" : "hover:bg-white/10 text-white"
            }`}
          >
            
          </button>

          {/* Apple Dropdown Menu */}
          {isAppleMenuOpen && (
            <div
              className="absolute top-7 left-0 w-64 rounded-xl bg-[#16181D]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 py-1 text-xs text-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  handleGoTo("about");
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>About Chirag Chaudhary</span>
                <span className="text-[10px] text-slate-400">TCS SE</span>
              </button>
              <button
                onClick={() => {
                  window.open("https://github.com/chirag640", "_blank");
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>GitHub Profile (@chirag640)</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
              <button
                onClick={() => {
                  window.open("https://www.linkedin.com/in/chiragchaudhary1910/", "_blank");
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  playClick();
                  toggleMissionControl();
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Mission Control / Stage Manager</span>
                <span className="text-[10px] font-mono text-slate-400">F3</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  lockScreen();
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>Lock Screen</span>
                <span className="text-[10px] font-mono text-slate-400">⌃⌘Q</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  playClick();
                  setCameraView(cameraView === "screen" ? "desk" : "screen");
                  closeAppleMenu();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
              >
                <span>3D Studio Desk Camera View</span>
                <span className="text-[10px] font-mono text-slate-400">[Z]</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full px-3.5 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer text-slate-300"
              >
                <span>Restart ChiragOS</span>
                <span className="text-[10px] font-mono text-slate-400">⌘R</span>
              </button>
            </div>
          )}
        </div>

        {/* ChiragOS (Active Application Name) */}
        <span className="font-bold px-1.5 text-white tracking-tight">ChiragOS</span>

        {/* Standard macOS Menus */}
        <div className="hidden sm:flex items-center gap-0.5">
          {/* File Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick("file")}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer text-[12px] ${
                activeDropdown === "file" ? "bg-white/20 text-white" : "hover:bg-white/10 text-slate-300"
              }`}
            >
              File
            </button>
            {activeDropdown === "file" && (
              <div
                className="absolute top-7 left-0 w-48 rounded-xl bg-[#0F172A]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 py-1 text-xs text-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    openWindow("finder");
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white cursor-pointer"
                >
                  Open Finder
                </button>
                <button
                  onClick={() => {
                    openWindow("terminal");
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white cursor-pointer"
                >
                  New Terminal Window
                </button>
                <button
                  onClick={() => {
                    handleGoTo("resume");
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white cursor-pointer"
                >
                  Download Verified Resume
                </button>
              </div>
            )}
          </div>

          {/* Go Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick("go")}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer text-[12px] ${
                activeDropdown === "go" ? "bg-white/20 text-white" : "hover:bg-white/10 text-slate-300"
              }`}
            >
              Go
            </button>
            {activeDropdown === "go" && (
              <div
                className="absolute top-7 left-0 w-52 rounded-xl bg-[#0F172A]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 py-1 text-xs text-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleGoTo("about")}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>About Chirag</span>
                </button>
                <button
                  onClick={() => handleGoTo("tech")}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tech Stack & Runtimes</span>
                </button>
                <button
                  onClick={() => handleGoTo("projects")}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span>Projects & Architecture</span>
                </button>
                <button
                  onClick={() => handleGoTo("history")}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>TCS Career History</span>
                </button>
                <button
                  onClick={() => handleGoTo("contact")}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0284C7] hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                  <span>Contact Engineer</span>
                </button>
              </div>
            )}
          </div>

          {/* Window Menu */}
          <div className="relative">
            <button
              onClick={() => handleMenuClick("window")}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer text-[12px] ${
                activeDropdown === "window" ? "bg-white/20 text-white" : "hover:bg-white/10 text-slate-300"
              }`}
            >
              Window
            </button>
            {activeDropdown === "window" && (
              <div
                className="absolute top-7 left-0 w-56 rounded-xl bg-[#16181D]/95 border border-white/15 shadow-2xl backdrop-blur-3xl z-50 py-1 text-xs text-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    openWindow("finder");
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white cursor-pointer"
                >
                  Focus Finder
                </button>
                <button
                  onClick={() => {
                    openWindow("terminal");
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white cursor-pointer"
                >
                  Focus Terminal CLI
                </button>
                <button
                  onClick={() => {
                    openWindow("music");
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white cursor-pointer"
                >
                  Focus Music Player
                </button>
                <div className="h-px bg-white/10 my-1" />
                <button
                  onClick={() => {
                    playClick();
                    toggleMissionControl();
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>Mission Control</span>
                  <span className="text-[10px] font-mono text-slate-400">F3</span>
                </button>
                <button
                  onClick={() => {
                    playClick();
                    lockScreen();
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#0A84FF] hover:text-white flex items-center justify-between cursor-pointer"
                >
                  <span>Lock Screen</span>
                  <span className="text-[10px] font-mono text-slate-400">⌃⌘Q</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── RIGHT STATUS TRAY (NATIVE MACOS CONTROL ICONS) ── */}
      <div className="flex items-center gap-2 sm:gap-3 text-slate-300">
        {/* Compact Now Playing Audio Widget */}
        <button
          onClick={() => {
            playClick();
            openWindow("music");
          }}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-slate-200 transition-colors cursor-pointer"
          title="Studio Music Player"
        >
          <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-amber-400" : "text-slate-400"}`} />
          <span className="font-mono text-[10px] hidden md:inline truncate max-w-[130px]">
            {PLAYLISTS[activePlaylist]?.name || "Studio Music"}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              togglePlay();
            }}
            className="w-3.5 h-3.5 flex items-center justify-center rounded-full hover:text-white"
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 ml-0.5" />}
          </span>
        </button>

        {/* Battery Indicator */}
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-300" title="Battery: 100% (Plugged In / MagSafe 3)">
          <BatteryCharging className="w-4 h-4 text-emerald-400" />
          <span className="hidden lg:inline text-[10px]">100%</span>
        </div>

        {/* Wi-Fi Icon */}
        <div title="Wi-Fi 6E (Connected: Gandhinagar Node)">
          <Wifi className="w-3.5 h-3.5 text-slate-300" />
        </div>

        {/* Spotlight Search Icon */}
        <button
          onClick={() => {
            playClick();
            toggleSpotlight();
            closeAppleMenu();
            setActiveDropdown(null);
          }}
          className="p-1 rounded hover:bg-white/15 text-slate-200 transition-colors cursor-pointer"
          title="Spotlight Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
        </button>

        {/* macOS Control Center Icon (Two Sliders) */}
        <button
          onClick={() => {
            playClick();
            toggleControlCenter();
            closeAppleMenu();
            setActiveDropdown(null);
          }}
          className="p-1 rounded hover:bg-white/15 text-slate-200 transition-colors cursor-pointer"
          title="Control Center (Lighting, Sound, Wallpaper, 3D Desk)"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Date & Time */}
        <div className="font-medium text-[11px] text-slate-200 whitespace-nowrap pl-0.5">
          {time || "Sun Sep 13"}
        </div>
      </div>
    </header>
  );
};
