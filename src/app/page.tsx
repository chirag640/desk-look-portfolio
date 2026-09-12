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
    <main className="relative w-full h-screen bg-[#0B0E14] overflow-hidden select-none font-sans">
      {/* ── 1. 3D STUDIO WORKSTATION BACKGROUND ── */}
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

      {/* ── 2. APPLE STUDIO DISPLAY FRAME & INSIDE-THE-SCREEN VIEWPORT ── */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] p-2 sm:p-6 md:p-8 ${
          isFocusedOnScreen
            ? "scale-100 opacity-100 pointer-events-auto"
            : cameraView === "macbook"
            ? "scale-[0.62] translate-x-44 translate-y-12 opacity-30 pointer-events-none"
            : "scale-[0.78] translate-y-6 shadow-2xl opacity-90 pointer-events-auto"
        }`}
      >
        {/* Apple Studio Display Aluminum Monitor Bezel Frame */}
        <div className="relative w-full max-w-[1440px] h-[92vh] max-h-[920px] rounded-[24px] bg-[#0A0D14] p-3 sm:p-4 border-[6px] sm:border-[8px] border-[#334155] os-screen-bezel flex flex-col shadow-2xl transition-all">
          {/* Top Bezel Center Camera Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-50 pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B] border border-black/80 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-[#0284C7]/60" />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]/40" />
          </div>

          {/* Top ScreenBar Light Fixture (Visual Accent) */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-2.5 rounded-full bg-[#1E293B] border border-white/20 shadow-[0_4px_16px_rgba(254,243,199,0.3)] z-50 pointer-events-none" />

          {/* ── INSIDE THE SCREEN: VIRTUAL DESKTOP SPACES ── */}
          <div className="relative flex-1 w-full h-full rounded-[14px] overflow-hidden bg-[#0B0E14] border border-white/10">
            <ScreenSpacesContainer
              progress={progress}
              onScrollToProgress={scrollTo}
              isZoomedIn={isFocusedOnScreen}
              onToggleZoom={handleToggleZoom}
            />
          </div>

          {/* Bottom Monitor Bezel Center Apple Logo Placeholder */}
          <div className="h-3 flex items-center justify-center pt-1">
            <div className="w-3 h-3 rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      {/* Floating View Switcher & Sidecar Quick Launcher Buttons */}
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
              : "Zoom into Screen [Z]"}
          </span>
        </button>
      </div>

      {/* ── 3. 3M YELLOW STICKY NOTE MODAL SCRATCHPAD ── */}
      <StickyNoteModal />

      {/* ── 4. MACBOOK PRO SIDECAR LIVE CODE & GITHUB MODAL ── */}
      <MacBookScreenContent />
    </main>
  );
}
