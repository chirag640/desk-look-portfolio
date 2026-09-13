"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWindowManager, FinderTab } from "@/hooks/useWindowManager";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { useMusicStore } from "@/hooks/useMusicStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Search,
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
  Command,
  ArrowRight,
  ExternalLink,
  Code2,
  Monitor
} from "lucide-react";

interface SpotlightItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Pages" | "Projects" | "Technologies" | "Apps & Easter Eggs";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
}

export const MacOSSpotlight: React.FC = () => {
  const {
    isSpotlightOpen,
    closeSpotlight,
    setFinderTab,
    openWindow,
    toggleWindow
  } = useWindowManager();

  const { toggleStickyNote, toggleTerminal, setCameraView } = useAtmosphereStore();
  const { setPlayerOpen } = useMusicStore();
  const { playClick, playMacPop, playMacSwoosh } = useSoundEffects();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isSpotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      playMacSwoosh();
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isSpotlightOpen, playMacSwoosh]);

  // Global ⌘K / Ctrl+K and Escape hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const { toggleSpotlight } = useWindowManager.getState();
        toggleSpotlight();
      } else if (e.key === "Escape" && isSpotlightOpen) {
        e.preventDefault();
        closeSpotlight();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSpotlightOpen, closeSpotlight]);

  const items: SpotlightItem[] = [
    // Pages
    {
      id: "page-about",
      title: "About Chirag Chaudhary",
      subtitle: "Software Engineer at TCS, Full Stack & Flutter Specialist",
      category: "Pages",
      icon: Folder,
      color: "text-blue-400 bg-blue-500/20",
      action: () => {
        setFinderTab("about");
        closeSpotlight();
      }
    },
    {
      id: "page-tech",
      title: "Technologies & Architecture",
      subtitle: "Enterprise Clean Architecture, Flutter, NestJS, Next.js, BLoC",
      category: "Pages",
      icon: Layers,
      color: "text-emerald-400 bg-emerald-500/20",
      action: () => {
        setFinderTab("tech");
        closeSpotlight();
      }
    },
    {
      id: "page-projects",
      title: "Featured Projects & Open Source",
      subtitle: "flutter_blueprint, FinFlow, CollabStream, Splitwise Flutter",
      category: "Pages",
      icon: Box,
      color: "text-amber-400 bg-amber-500/20",
      action: () => {
        setFinderTab("projects");
        closeSpotlight();
      }
    },
    {
      id: "page-history",
      title: "TCS Experience & Career Milestones",
      subtitle: "Software Engineer at Tata Consultancy Services (Present)",
      category: "Pages",
      icon: Clock,
      color: "text-purple-400 bg-purple-500/20",
      action: () => {
        setFinderTab("history");
        closeSpotlight();
      }
    },
    {
      id: "page-resume",
      title: "Verified Resume & 70 Repositories",
      subtitle: "PDF Credentials, verified skills, and GitHub portfolio archive",
      category: "Pages",
      icon: FileText,
      color: "text-rose-400 bg-rose-500/20",
      action: () => {
        setFinderTab("resume");
        closeSpotlight();
      }
    },
    {
      id: "page-contact",
      title: "Contact Engineer & Transmission Terminal",
      subtitle: "Direct messaging, email endpoint, LinkedIn, Gandhinagar Node",
      category: "Pages",
      icon: Mail,
      color: "text-sky-400 bg-sky-500/20",
      action: () => {
        setFinderTab("contact");
        closeSpotlight();
      }
    },

    // Projects
    {
      id: "proj-blueprint",
      title: "flutter_blueprint (Pub.dev v3.0.0)",
      subtitle: "Enterprise Flutter CLI scaffolder with 20 GitHub stars",
      category: "Projects",
      icon: Code2,
      color: "text-yellow-400 bg-yellow-500/20",
      action: () => {
        setFinderTab("projects");
        closeSpotlight();
      }
    },
    {
      id: "proj-finflow",
      title: "FinFlow — Personal & Group Finance",
      subtitle: "Full-stack Flutter client with secure NestJS microservices",
      category: "Projects",
      icon: Box,
      color: "text-cyan-400 bg-cyan-500/20",
      action: () => {
        setFinderTab("projects");
        closeSpotlight();
      }
    },
    {
      id: "proj-collabstream",
      title: "CollabStream Workspace",
      subtitle: "Real-time collaborative canvas and streaming architecture",
      category: "Projects",
      icon: Box,
      color: "text-indigo-400 bg-indigo-500/20",
      action: () => {
        setFinderTab("projects");
        closeSpotlight();
      }
    },

    // Technologies
    {
      id: "tech-flutter",
      title: "Flutter & Dart Ecosystem",
      subtitle: "Clean Architecture, BLoC, Riverpod, Provider, GetX, Drift",
      category: "Technologies",
      icon: Layers,
      color: "text-sky-400 bg-sky-500/20",
      action: () => {
        setFinderTab("tech");
        closeSpotlight();
      }
    },
    {
      id: "tech-nestjs",
      title: "NestJS & Node.js Backend",
      subtitle: "Scalable TypeScript APIs, JWT Auth, TypeORM, PostgreSQL",
      category: "Technologies",
      icon: Layers,
      color: "text-rose-400 bg-rose-500/20",
      action: () => {
        setFinderTab("tech");
        closeSpotlight();
      }
    },
    {
      id: "tech-nextjs",
      title: "Next.js & React Full Stack",
      subtitle: "React 19, Turbopack, App Router, SSR, Tailwind CSS",
      category: "Technologies",
      icon: Layers,
      color: "text-emerald-400 bg-emerald-500/20",
      action: () => {
        setFinderTab("tech");
        closeSpotlight();
      }
    },

    // Apps & Easter Eggs
    {
      id: "app-terminal",
      title: "Terminal.app (zsh)",
      subtitle: "Interactive CLI with neofetch, matrix, snake, and hiring commands",
      category: "Apps & Easter Eggs",
      icon: Terminal,
      color: "text-emerald-400 bg-emerald-500/20",
      action: () => {
        openWindow("terminal");
        closeSpotlight();
      }
    },
    {
      id: "app-music",
      title: "Studio Vinyl Player",
      subtitle: "Vintage Bollywood Classics & English Melodic Chill",
      category: "Apps & Easter Eggs",
      icon: Disc3,
      color: "text-amber-400 bg-amber-500/20",
      action: () => {
        openWindow("music");
        setPlayerOpen(true);
        closeSpotlight();
      }
    },
    {
      id: "app-notes",
      title: "Desk Scratchpad (3M Sticky Note)",
      subtitle: "Leave a private note or quick feedback on the studio desk",
      category: "Apps & Easter Eggs",
      icon: Pin,
      color: "text-yellow-400 bg-yellow-500/20",
      action: () => {
        toggleStickyNote();
        closeSpotlight();
      }
    },
    {
      id: "app-desk",
      title: "3D Studio Desk View",
      subtitle: "Switch camera perspective to wide architectural walnut desk",
      category: "Apps & Easter Eggs",
      icon: Monitor,
      color: "text-indigo-400 bg-indigo-500/20",
      action: () => {
        setCameraView("desk");
        closeSpotlight();
      }
    }
  ];

  const filteredItems = items.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: SpotlightItem) => {
    playMacPop();
    item.action();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      playClick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      playClick();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  if (!isSpotlightOpen) return null;

  return (
    <div
      onClick={closeSpotlight}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] bg-black/40 backdrop-blur-sm select-none p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[620px] rounded-2xl bg-[#0F1422]/95 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Spotlight Search Header */}
        <div className="h-14 px-4 bg-white/5 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search (e.g. Flutter, projects, resume, music, terminal)..."
            className="flex-1 bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none font-sans"
          />
          <span className="text-[10px] font-mono text-slate-400 px-2 py-1 rounded bg-white/10 border border-white/10">
            ESC to exit
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-400 font-sans text-xs">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;Flutter&rdquo;, &ldquo;TCS&rdquo;, or &ldquo;terminal&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-[#0284C7] text-white shadow-sm"
                      : "hover:bg-white/5 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg ${
                        isSelected ? "bg-white/20 text-white" : item.color
                      } flex items-center justify-center shrink-0 border border-white/10`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate leading-tight">
                        {item.title}
                      </div>
                      <div
                        className={`text-[11px] truncate leading-tight ${
                          isSelected ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}
                    >
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white animate-pulse" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Spotlight Footer Bar */}
        <div className="h-8 px-4 bg-[#080B12]/90 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>Navigate: ↑ ↓</span>
            <span>·</span>
            <span>Open: ↵</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Command className="w-3 h-3 text-slate-400" />
            <span>ChiragOS Spotlight Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
