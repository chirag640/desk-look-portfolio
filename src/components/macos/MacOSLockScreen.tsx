"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import {
  Fingerprint,
  Wifi,
  BatteryCharging,
  Sun,
  Moon,
  Clock,
  Sparkles,
  Lock,
  Unlock
} from "lucide-react";

export const MacOSLockScreen: React.FC = () => {
  const { isLocked, lockScreen, unlockScreen } = useWindowManager();
  const { playMacPop, playMacSwoosh } = useSoundEffects();

  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [secondsStr, setSecondsStr] = useState("");
  const [saverStyle, setSaverStyle] = useState<"aerial" | "retro">("aerial");
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Clock & Date updater
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setTimeStr(`${hours}:${minutes}`);
      setSecondsStr(seconds);

      const d = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
      });
      setDateStr(d);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. 60-second inactivity detector (wakes screen or locks screen)
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // If already locked, any interaction unlocks!
    if (isLocked) {
      playMacPop();
      unlockScreen();
    }

    // Set 60-second inactivity trigger
    idleTimerRef.current = setTimeout(() => {
      lockScreen();
    }, 60000); // 60 seconds
  }, [isLocked, lockScreen, unlockScreen, playMacPop]);

  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "wheel"
    ];

    const handleUserActivity = () => {
      resetIdleTimer();
    };

    activityEvents.forEach((ev) => {
      window.addEventListener(ev, handleUserActivity, { passive: true });
    });

    // Initial timer setup
    idleTimerRef.current = setTimeout(() => {
      lockScreen();
    }, 60000);

    return () => {
      activityEvents.forEach((ev) => {
        window.removeEventListener(ev, handleUserActivity);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetIdleTimer, lockScreen]);

  // Global ⌃⌘Q or Alt+L hotkey to manually lock
  useEffect(() => {
    const handleLockShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.metaKey && e.key.toLowerCase() === "q") || (e.altKey && e.key.toLowerCase() === "l")) {
        e.preventDefault();
        playMacSwoosh();
        lockScreen();
      }
    };
    window.addEventListener("keydown", handleLockShortcut);
    return () => window.removeEventListener("keydown", handleLockShortcut);
  }, [lockScreen, playMacSwoosh]);

  if (!isLocked) return null;

  return (
    <div
      onClick={() => {
        playMacPop();
        unlockScreen();
      }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 select-none cursor-pointer overflow-hidden animate-in fade-in duration-700 backdrop-blur-3xl bg-[#090C12]/95"
    >
      {/* ── BACKGROUND AERIAL ATMOSPHERE CANVAS ── */}
      {saverStyle === "aerial" ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle slow panning twilight nebula */}
          <div className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#090D16] animate-pulse duration-[10000ms] opacity-80" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0284C7]/15 blur-[160px] animate-pulse duration-[8000ms]" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/10 blur-[150px]" />
          {/* Subtle grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>
      ) : (
        /* Retro Flip Style */
        <div className="absolute inset-0 pointer-events-none bg-[#08090D]">
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        </div>
      )}

      {/* ── TOP HEADER BAR: STATUS & SWITCHER ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full flex items-center justify-between text-xs text-white/70 font-sans"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <Lock className="w-3 h-3 text-sky-400" />
            <span className="text-[11px] font-medium tracking-wide">ChiragOS Locked</span>
          </div>
          <span className="hidden sm:inline text-[11px] text-white/40 font-mono">
            Gandhinagar Node (IST)
          </span>
        </div>

        {/* Style Switcher (Aerial vs Retro) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSaverStyle(saverStyle === "aerial" ? "retro" : "aerial")}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white/80 text-[11px] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Style: {saverStyle === "aerial" ? "Apple TV Aerial" : "Retro Flip"}</span>
          </button>
        </div>
      </div>

      {/* ── CENTER HERO: LARGE CUPERTINO CLOCK & PROFILE ── */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-6 text-center">
        {/* Date Display */}
        <div className="text-sm sm:text-base md:text-lg font-medium tracking-widest text-slate-300 drop-shadow uppercase">
          {dateStr}
        </div>

        {/* Massive SF Digital Clock */}
        <div className="flex items-baseline justify-center">
          <h1 className="text-7xl sm:text-9xl md:text-[140px] font-extralight tracking-tighter text-white font-sans drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] select-none">
            {timeStr}
          </h1>
          <span className="text-xl sm:text-3xl font-mono text-sky-400/80 ml-2 drop-shadow">
            :{secondsStr}
          </span>
        </div>

        {/* Gandhinagar Local Weather Pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-xs text-slate-300 shadow-lg">
          <Moon className="w-3.5 h-3.5 text-sky-400" />
          <span>Gandhinagar, GJ</span>
          <span>·</span>
          <span className="font-mono text-white">28°C · Clear Night</span>
        </div>

        {/* Chirag Chaudhary User Profile Card */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full ring-2 ring-white/20 ring-offset-4 ring-offset-black/50 overflow-hidden shadow-2xl bg-[#1A2234] flex items-center justify-center">
            {/* Monogram Badge */}
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wider">CC</span>
          </div>

          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Chirag Chaudhary
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Software Engineer · TCS Digital
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER: UNLOCK PROMPT & SYSTEM STATUS ── */}
      <div className="relative z-10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 font-sans">
        {/* Unlock Prompt */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white animate-pulse">
          <Fingerprint className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-medium">Touch ID or move mouse / press any key to wake</span>
        </div>

        {/* macOS Status Indicators */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1">
            <Wifi className="w-3.5 h-3.5 text-white/70" />
            <span>Wi-Fi 6</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
