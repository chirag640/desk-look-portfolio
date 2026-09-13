"use client";

import React from "react";
import { useWindowManager, FinderTab } from "@/hooks/useWindowManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { ProfileSpace } from "@/components/screen-spaces/ProfileSpace";
import { TechSpace } from "@/components/screen-spaces/TechSpace";
import { ProjectsSpace } from "@/components/screen-spaces/ProjectsSpace";
import { HistorySpace } from "@/components/screen-spaces/HistorySpace";
import { RepoResumeSpace } from "@/components/screen-spaces/RepoResumeSpace";
import { ContactSpace } from "@/components/screen-spaces/ContactSpace";
import {
  User,
  Cpu,
  Box,
  Clock,
  FileText,
  Mail,
  Folder,
  ChevronRight,
  Search,
  Laptop,
  Cloud,
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";

export const FinderWindow: React.FC = () => {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, finderTab, setFinderTab, activeWindow } =
    useWindowManager();
  const { playClick, playThock } = useSoundEffects();

  const win = windows.finder;
  if (!win.isOpen || win.isMinimized) return null;

  const isFocused = activeWindow === "finder";

  const tabs: { id: FinderTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: "about", label: "About Chirag", icon: User },
    { id: "tech", label: "Tech Stack", icon: Cpu },
    { id: "projects", label: "Featured Projects", icon: Box },
    { id: "history", label: "TCS Experience", icon: Clock },
    { id: "resume", label: "Resume & Repos", icon: FileText },
    { id: "contact", label: "Contact Engineer", icon: Mail }
  ];

  return (
    <div
      onClick={() => focusWindow("finder")}
      style={{ zIndex: win.zIndex }}
      className={`absolute transition-all duration-300 ${
        win.isMaximized
          ? "inset-2 sm:inset-4"
          : "inset-2 sm:inset-4 md:inset-x-8 md:inset-y-6 lg:inset-x-12 lg:inset-y-8 max-w-[1400px] max-h-[860px] mx-auto my-auto"
      } rounded-2xl bg-[#090D16]/90 border ${
        isFocused ? "border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95)]" : "border-white/10 shadow-xl opacity-95"
      } backdrop-blur-3xl flex flex-col overflow-hidden select-none`}
    >
      {/* ── 1. MACOS WINDOW TITLE BAR & TRAFFIC LIGHTS ── */}
      <div className="h-10 px-3.5 bg-[#0D1322]/80 border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
        {/* Left: Traffic Lights */}
        <div className="flex items-center gap-2">
          {/* Red: Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              closeWindow("finder");
            }}
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-110 flex items-center justify-center group cursor-pointer transition-transform active:scale-90"
            title="Close Finder"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold leading-none">×</span>
          </button>

          {/* Yellow: Minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              minimizeWindow("finder");
            }}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] hover:brightness-110 flex items-center justify-center group cursor-pointer transition-transform active:scale-90"
            title="Minimize Finder"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold leading-none">−</span>
          </button>

          {/* Green: Maximize / Zoom */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              playClick();
              maximizeWindow("finder");
            }}
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] hover:brightness-110 flex items-center justify-center group cursor-pointer transition-transform active:scale-90"
            title="Zoom Finder"
          >
            <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black font-bold leading-none">+</span>
          </button>

          {/* Window Title */}
          <div className="ml-3 hidden sm:flex items-center gap-1.5 text-slate-400 font-medium">
            <Folder className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[11px] text-white">Chirag Chaudhary</span>
            <span className="text-slate-500">/</span>
            <span className="text-[11px] capitalize text-[#38BDF8]">{finderTab}</span>
          </div>
        </div>

        {/* Center: Active Tab Indicator */}
        <div className="text-[11px] font-medium text-slate-300 font-mono hidden md:block">
          chirag.engineer · macOS Sequoia v2.6
        </div>

        {/* Right: Quick Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-[11px]">
            <Search className="w-3 h-3" />
            <span className="font-mono text-[10px]">Spotlight ⌘K</span>
          </div>
        </div>
      </div>

      {/* ── 2. FINDER MAIN WORKSPACE: SIDEBAR + CONTENT ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-48 sm:w-56 bg-[#080B12]/80 border-r border-white/10 flex flex-col justify-between p-2.5 sm:p-3 overflow-y-auto select-none">
          <div className="space-y-4">
            {/* Favorites Section */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase px-2 mb-1.5">
                Favorites
              </div>
              <div className="space-y-0.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = finderTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playClick();
                        setFinderTab(tab.id);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-left ${
                        isActive
                          ? "bg-[#0284C7] text-white shadow-sm font-semibold"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#38BDF8]"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Locations Section */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase px-2 mb-1.5">
                Locations
              </div>
              <div className="space-y-0.5 text-xs text-slate-400">
                <a
                  href="https://github.com/chirag640"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Cloud className="w-3.5 h-3.5 text-slate-400" />
                    <span>GitHub @chirag640</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
                <a
                  href="https://www.linkedin.com/in/chiragchaudhary1910/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Laptop className="w-3.5 h-3.5 text-slate-400" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Footer Status */}
          <div className="pt-3 border-t border-white/10 px-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>TCS Node</span>
            <span className="text-emerald-400">● Production Ready</span>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-[#06080F]/60 overflow-y-auto relative">
          {finderTab === "about" && <ProfileSpace />}
          {finderTab === "tech" && <TechSpace />}
          {finderTab === "projects" && <ProjectsSpace />}
          {finderTab === "history" && <HistorySpace />}
          {finderTab === "resume" && <RepoResumeSpace />}
          {finderTab === "contact" && (
            <ContactSpace
              onNavigateSpace={(idx: number) => {
                const navTabs: FinderTab[] = ["about", "tech", "projects", "history", "resume", "contact"];
                if (navTabs[idx]) {
                  setFinderTab(navTabs[idx]);
                }
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};
