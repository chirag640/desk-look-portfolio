"use client";

import React, { useState, useEffect } from "react";
import { useAtmosphereStore, getSunSyncMood } from "@/hooks/useAtmosphereStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Sun,
  Moon,
  CloudRain,
  GitBranch,
  Cpu,
  BatteryCharging,
  ExternalLink,
  MapPin,
  BookOpen
} from "lucide-react";

export const MacOSWidgets: React.FC = () => {
  const { lightingMood } = useAtmosphereStore();
  const { playClick } = useSoundEffects();

  const [istTime, setIstTime] = useState("");
  const [istDate, setIstDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      const dateStr = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        month: "short",
        day: "numeric"
      });
      setIstTime(timeStr);
      setIstDate(dateStr);
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const sunInfo = getSunSyncMood();
  const isRain = lightingMood === "rain";

  // 4 rows x 7 cols contribution commit blocks
  const contributionGrid = [
    [2, 3, 1, 4, 3, 2, 4],
    [1, 2, 4, 3, 2, 4, 3],
    [3, 4, 2, 1, 4, 3, 2],
    [4, 3, 4, 2, 3, 4, 4]
  ];

  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-900/60";
      case 2:
        return "bg-emerald-700/80";
      case 3:
        return "bg-emerald-500";
      case 4:
        return "bg-emerald-400 shadow-[0_0_6px_#34D399]";
      default:
        return "bg-white/5";
    }
  };

  return (
    <div className="absolute top-12 left-6 z-0 hidden xl:flex flex-col gap-4 pointer-events-auto select-none max-w-[280px]">
      {/* ── 1. GANDHINAGAR STUDIO WEATHER & CLOCK WIDGET ── */}
      <div className="p-4 rounded-2xl bg-[#0E1524]/60 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white transition-all hover:border-white/20 hover:bg-[#0E1524]/75">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-1 font-mono">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-slate-300 font-medium">Gandhinagar, GJ</span>
          </div>
          <span className="text-[10px] text-emerald-400">● Live Studio</span>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="text-2xl font-bold font-mono tracking-tight text-white">
            {istTime || "8:30 PM"}
          </div>
          <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
            {isRain ? (
              <CloudRain className="w-4 h-4 text-sky-400" />
            ) : sunInfo.mood === "golden" ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-300" />
            )}
            <span className="font-mono text-xs">{isRain ? "24°C" : "28°C"}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between">
          <span>{istDate || "Sun, Sep 13"}</span>
          <span className="text-[10px] font-mono text-slate-500">
            {isRain ? "Rainy Studio Glass" : sunInfo.label}
          </span>
        </div>
      </div>

      {/* ── 2. GITHUB ACTIVITY & CONTRIBUTIONS WIDGET ── */}
      <a
        href="https://github.com/chirag640"
        target="_blank"
        rel="noreferrer"
        onClick={() => playClick()}
        className="no-underline p-4 rounded-2xl bg-[#0E1524]/60 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white transition-all hover:border-[#38BDF8]/40 hover:bg-[#0E1524]/80 group block"
      >
        <div className="flex items-center justify-between text-xs pb-2">
          <div className="flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-200">GitHub Activity</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
        </div>

        {/* 4x7 Simulated Live Commit Matrix */}
        <div className="grid grid-cols-7 gap-1.5 py-1">
          {contributionGrid.flatMap((row, rIdx) =>
            row.map((lvl, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`w-4 h-4 rounded-sm ${getCellColor(lvl)} transition-transform hover:scale-125`}
              />
            ))
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5 mt-2">
          <span>@chirag640</span>
          <span className="text-emerald-400 font-semibold">70+ Repos</span>
        </div>
      </a>

      {/* ── 3. CHIRAGOS SYSTEM SPECS WIDGET ── */}
      <div className="p-3.5 rounded-2xl bg-[#0E1524]/60 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white text-xs space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1 border-b border-white/5">
          <div className="flex items-center gap-1.5 text-slate-200">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold">MacBook Pro M3 Max</span>
          </div>
          <span className="text-[10px] text-blue-400">16-inch</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-1.5 rounded-lg bg-white/5 flex flex-col">
            <span className="text-slate-400">Memory</span>
            <span className="text-white font-semibold">64GB Unified</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white/5 flex flex-col">
            <span className="text-slate-400">Battery</span>
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> 100%
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. WHAT I'M EXPLORING / READING WIDGET ── */}
      <div className="p-3.5 rounded-2xl bg-[#0E1524]/60 border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white text-xs space-y-2.5 hover:border-white/20 transition-all">
        <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-slate-200">Currently Exploring</span>
          </div>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Active Study
          </span>
        </div>

        <div className="space-y-2">
          {/* Item 1: Book */}
          <div className="group/item flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
            <span className="text-sm mt-0.5">📖</span>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-slate-200 group-hover/item:text-white truncate">
                Designing Data-Intensive Apps
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Martin Kleppmann · Distributed Storage
              </div>
            </div>
          </div>

          {/* Item 2: RFC */}
          <div className="group/item flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
            <span className="text-sm mt-0.5">⚡</span>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-slate-200 group-hover/item:text-white truncate">
                Dart Macros & Metaprogramming
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Flutter / Dart RFC · Compile-Time Codegen
              </div>
            </div>
          </div>

          {/* Item 3: Tech Blog / Architecture */}
          <div className="group/item flex items-start gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-default">
            <span className="text-sm mt-0.5">🛡️</span>
            <div className="min-w-0">
              <div className="text-[11px] font-medium text-slate-200 group-hover/item:text-white truncate">
                Enterprise NestJS Event-Driven CQRS
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Transactional Outbox & Scalable APIs
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
