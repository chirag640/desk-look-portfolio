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
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollTo(0.0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollTo(1.0);
      } else if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        const nextSpace = Math.min(6, Math.round(progress * 6) + 1);
        scrollTo(nextSpace / 6);
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        const prevSpace = Math.max(0, Math.round(progress * 6) - 1);
        scrollTo(prevSpace / 6);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [progress, scrollTo, cameraView, setCameraView]);

  const handleToggleZoom = useCallback(() => {
    if (cameraView === "macbook") {
      setCameraView("screen");
    } else {
      setCameraView(cameraView === "screen" ? "desk" : "screen");
    }
  }, [cameraView, setCameraView]);

  return (
    <main className="relative w-full h-screen bg-[#07090E] overflow-hidden select-none font-sans">
      {/* ── 1. 3D STUDIO WORKSTATION (PHOTOREALISTIC APPLE MAC & DESK) ── */}
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

      {/* ── 2. IMMERSIVE CHIRAGOS SCREEN VIEWPORT (ACTIVE WHEN SCREEN-FOCUSED) ── */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center p-1 sm:p-4 md:p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFocusedOnScreen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.96] pointer-events-none"
        }`}
      >
        {/* Authentic Apple Liquid Retina Display Bezel Frame */}
        <div className="relative w-full max-w-[1480px] h-[94vh] max-h-[960px] rounded-[20px] sm:rounded-[26px] bg-[#0A0D14] p-2.5 sm:p-3.5 border-2 sm:border-[3px] border-[#2A3444] shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
          {/* Top Bezel Center Camera Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#151C28] border border-black/80 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#0284C7]/70" />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]/60" />
          </div>

          {/* ── INSIDE THE SCREEN: VIRTUAL DESKTOP SPACES ── */}
          <div className="relative flex-1 w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#090C12] border border-white/10">
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
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#131823]/90 hover:bg-[#1C2436] border border-[#38BDF8]/40 hover:border-[#38BDF8] text-white shadow-[0_10px_30px_rgba(2,132,199,0.3)] backdrop-blur-md transition-all cursor-pointer text-sm font-medium"
          >
            <span className="text-base text-[#38BDF8]"></span>
            <span>Enter ChiragOS Workstation</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono">
              [Z]
            </span>
          </button>
          <span className="text-[11px] text-slate-400 font-mono tracking-wide">
            Click anywhere on the Mac or desk to interact
          </span>
        </div>
      )}

      {/* ── 4. FLOATING VIEW SWITCHER & SIDECAR LAUNCHER ── */}
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
              : isFocusedOnScreen
              ? "View 3D Studio Desk [Z]"
              : "Enter ChiragOS [Z]"}
          </span>
        </button>
      </div>

      {/* ── 5. 3M YELLOW STICKY NOTE MODAL SCRATCHPAD ── */}
      <StickyNoteModal />

      {/* ── 6. MACBOOK PRO SIDECAR LIVE CODE & GITHUB MODAL ── */}
      <MacBookScreenContent />
    </main>
  );
}
