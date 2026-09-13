"use client";

import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { ScreenSpacesContainer } from "@/components/screen-spaces/ScreenSpacesContainer";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useResponsive } from "@/hooks/useMediaQuery";
import { useSoundStore } from "@/hooks/useSoundEffects";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallbackNotice } from "@/ui/WebGLFallback";
import { StickyNoteModal } from "@/components/desk-elements/StickyNoteModal";
import { MacBookScreenContent } from "@/components/macbook/MacBookScreenContent";

// Client-only dynamic 3D Canvas
const Experience3D = dynamic(
  () => import("@/components/3d/Experience").then((mod) => mod.Experience),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Home() {
  const { progress, scrollTo } = useScrollProgress();
  const { isMobile, prefersReducedMotion } = useResponsive();
  const { toggleSound } = useSoundStore();
  const [hasWebGL, setHasWebGL] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { cameraView, setCameraView } = useAtmosphereStore();
  const isFocusedOnScreen = cameraView === "screen";

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());

    // Sound toggle hook
    (window as unknown as { __SOUND_TOGGLE?: () => void }).__SOUND_TOGGLE = toggleSound;
  }, [toggleSound]);

  // Keyboard navigation & zoom toggle [Z]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key.toLowerCase() === "z") {
        if (cameraView === "macbook") {
          setCameraView("screen");
        } else {
          setCameraView(cameraView === "screen" ? "desk" : "screen");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cameraView, setCameraView]);

  const handleToggleZoom = useCallback(() => {
    if (cameraView === "macbook") {
      setCameraView("screen");
    } else {
      setCameraView(cameraView === "screen" ? "desk" : "screen");
    }
  }, [cameraView, setCameraView]);

  return (
    <main className="relative w-full h-screen bg-[#07090E] overflow-hidden select-none font-sans">
      {/* ── 1. ARCHITECTURAL APPLE MINIMALIST STUDIO (3D BACKGROUND ENVIRONMENT) ── */}
      {mounted && hasWebGL && (
        <Experience3D
          progress={progress}
          isZoomedIn={isFocusedOnScreen}
          isMobile={isMobile}
          reducedMotion={prefersReducedMotion}
        />
      )}

      {/* WebGL Fallback Notification if unavailable */}
      {!hasWebGL && <WebGLFallbackNotice />}

      {/* ── 2. FULL-WINDOW MACBOOK PRO LIQUID RETINA DISPLAY CHASSIS ── */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center p-1 sm:p-2 md:p-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFocusedOnScreen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.96] pointer-events-none"
        }`}
      >
        {/* Full MacBook Pro Aluminum Outer Chassis Frame */}
        <div className="relative w-full h-full rounded-[18px] sm:rounded-[24px] bg-[#0A0D14] p-1.5 sm:p-2.5 border-2 sm:border-[3px] border-[#222B3A] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden ring-1 ring-white/5">
          {/* Authentic MacBook Pro Camera Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 sm:w-44 h-6 sm:h-7 rounded-b-[16px] sm:rounded-b-[18px] bg-black border-b border-x border-white/10 shadow-2xl flex items-center justify-center gap-2.5 z-50 pointer-events-none">
            {/* 12MP Center Stage Camera Lens */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-white/20 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#0284C7]/80 shadow-[0_0_4px_#0284C7]" />
            </span>
            {/* Emerald Privacy Indicator LED */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
            {/* Ambient Light Sensor */}
            <span className="w-1 h-1 rounded-full bg-[#1E293B]" />
          </div>

          {/* ── INSIDE THE SCREEN: VIRTUAL DESKTOP SPACES ── */}
          <div className="relative flex-1 w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#080B11] border border-white/10">
            <ScreenSpacesContainer
              progress={progress}
              onScrollToProgress={scrollTo}
              isZoomedIn={isFocusedOnScreen}
              onToggleZoom={handleToggleZoom}
            />
          </div>
        </div>
      </div>

      {/* ── 3. DESK VIEW PROMPT: ENTER CHIRAGOS CALL-TO-ACTION ── */}
      {!isFocusedOnScreen && cameraView !== "macbook" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce-subtle pointer-events-auto">
          <button
            onClick={() => setCameraView("screen")}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#131823]/95 hover:bg-[#1C2436] border border-[#38BDF8]/40 hover:border-[#38BDF8] text-white shadow-[0_12px_36px_rgba(2,132,199,0.35)] backdrop-blur-md transition-all cursor-pointer text-sm font-medium"
          >
            <span className="text-lg text-[#38BDF8]"></span>
            <span>Enter ChiragOS Full MacBook Screen</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono">
              [Z]
            </span>
          </button>
          <span className="text-[11px] text-slate-400 font-mono tracking-wide">
            Click anywhere on the Mac or desk to interact
          </span>
        </div>
      )}

      {/* ── 4. FLOATING VIEW SWITCHER & SIDECAR LAUNCHER (ONLY IN 3D DESK / SIDECAR VIEW) ── */}
      {!isFocusedOnScreen && (
        <div className="fixed bottom-3 right-4 z-40 flex items-center gap-2">
          {/* MacBook Sidecar Quick Jump Button */}
          <button
            onClick={() => {
              setCameraView(cameraView === "macbook" ? "screen" : "macbook");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono shadow-xl backdrop-blur-md transition-all cursor-pointer ${
              cameraView === "macbook"
                ? "bg-[#0284C7]/30 border-[#38BDF8] text-[#38BDF8]"
                : "bg-[#131823]/90 hover:bg-[#1A2234] border-white/15 text-slate-300 hover:text-white"
            }`}
            title="Open MacBook Pro M3 Sidecar Playground"
          >
            <span>💻 Sidecar [Dart & GitHub]</span>
          </button>

          {/* View Zoom Switcher Button */}
          <button
            onClick={handleToggleZoom}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131823]/90 hover:bg-[#1A2234] border border-white/15 text-xs font-mono text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-all cursor-pointer"
          >
            <span>
              {cameraView === "macbook"
                ? "Return to Screen [Z]"
                : "Enter MacBook Screen [Z]"}
            </span>
          </button>
        </div>
      )}

      {/* ── 5. 3M YELLOW STICKY NOTE MODAL SCRATCHPAD ── */}
      <StickyNoteModal />

      {/* ── 6. MACBOOK PRO SIDECAR LIVE CODE & GITHUB MODAL ── */}
      <MacBookScreenContent />
    </main>
  );
}
