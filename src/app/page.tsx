"use client";

import React, { useEffect, useCallback, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { ScreenSpacesContainer } from "@/components/screen-spaces/ScreenSpacesContainer";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useResponsive } from "@/hooks/useMediaQuery";
import { useAtmosphereStore } from "@/hooks/useAtmosphereStore";
import { isWebGLAvailable } from "@/lib/webgl";
import { WebGLFallbackNotice } from "@/ui/WebGLFallback";
import { StickyNoteModal } from "@/components/desk-elements/StickyNoteModal";
import { MacBookScreenContent } from "@/components/macbook/MacBookScreenContent";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MinimalNavigation } from "@/components/ui/MinimalNavigation";
import { HeroSection } from "@/components/narrative/HeroSection";
import { AboutSection } from "@/components/narrative/AboutSection";
import { CaseStudiesSection } from "@/components/narrative/CaseStudiesSection";
import { EngineeringTree } from "@/components/narrative/EngineeringTree";
import { ContactSection } from "@/components/narrative/ContactSection";
import { X } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

// Client-only dynamic 3D Canvas
const Experience3D = dynamic(
  () => import("@/components/3d/Experience").then((mod) => mod.Experience),
  {
    ssr: false,
    loading: () => null
  }
);

export default function Home() {
  const { progress, activeChapter, scrollToChapter } = useScrollProgress();
  const { isMobile, prefersReducedMotion } = useResponsive();
  const { playClick, playMacPop } = useSoundEffects();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const hasWebGL = isClient ? isWebGLAvailable() : true;
  const { cameraView, setCameraView } = useAtmosphereStore();
  const isFocusedOnScreen = cameraView === "screen";

  // Keyboard navigation & zoom toggle [Z]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key.toLowerCase() === "z") {
        if (cameraView === "screen") {
          playClick();
          setCameraView("desk");
        } else {
          playMacPop();
          setCameraView("screen");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cameraView, setCameraView, playClick, playMacPop]);

  // Deep-linking hash URL slug handler (#about, #projects, etc.)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (!hash) return;
      if (hash === "#about") scrollToChapter(1);
      else if (hash === "#projects" || hash === "#work") scrollToChapter(2);
      else if (hash === "#architecture" || hash === "#skills" || hash === "#stack") scrollToChapter(3);
      else if (hash === "#contact" || hash === "#terminal") scrollToChapter(4);
      else if (hash === "#chiragos") setCameraView("screen");
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [scrollToChapter, setCameraView]);

  const handleToggleZoom = useCallback(() => {
    if (cameraView === "screen") {
      playClick();
      setCameraView("desk");
    } else {
      playMacPop();
      setCameraView("screen");
    }
  }, [cameraView, setCameraView, playClick, playMacPop]);

  return (
    <main id="main-content" className="relative w-full min-h-screen bg-[#07090E] font-sans selection:bg-sky-500/30 selection:text-white">
      {/* ── DESKTOP SPRING CURSOR SYSTEM ── */}
      <CustomCursor />

      {/* ── FLOATING EDITORIAL NAVIGATION ── */}
      <MinimalNavigation
        activeChapter={activeChapter}
        onNavigate={scrollToChapter}
        onToggleChiragOS={handleToggleZoom}
      />

      {/* ── ACCESSIBILITY & SEARCH ENGINE DIRECTORY ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Semantic Crawl Links for Googlebot & Screen Readers */}
      <nav aria-label="Portfolio Sections Directory" className="sr-only">
        <h1 className="text-xl font-bold">Chirag Chaudhary — Software Engineer &amp; Mobile Architect</h1>
        <p>
          Software Engineer at Tata Consultancy Services (TCS) &amp; creator of flutter_blueprint on Pub.dev (v3.0.0).
          Building enterprise mobile architectures, full-stack microservices with NestJS, and developer tooling.
        </p>
        <ul>
          <li><a href="#hero">01 Studio Hero &amp; Engineering Overview</a></li>
          <li><a href="#about">02 About Chirag Chaudhary &amp; TCS Experience</a></li>
          <li><a href="#projects">03 Selected Systems &amp; Case Studies (flutter_blueprint, FinFlow, CollabStream)</a></li>
          <li><a href="#architecture">04 Technical Architecture &amp; Production Pipeline (Flutter, Dart, NestJS, Next.js, Docker)</a></li>
          <li><a href="#contact">05 Terminal Dispatch &amp; Contact Channels</a></li>
        </ul>
      </nav>

      {/* ── 1. CINEMATIC 3D DEVELOPER STUDIO (FIXED BACKGROUND ANCHOR) ── */}
      {isClient && hasWebGL && (
        <Experience3D
          progress={progress}
          isZoomedIn={isFocusedOnScreen}
          isMobile={isMobile}
          reducedMotion={prefersReducedMotion}
        />
      )}

      {/* WebGL Fallback Notification if unavailable */}
      {!hasWebGL && <WebGLFallbackNotice />}

      {/* ── 2. SCROLL STORYTELLING CHAPTERS (FOREGROUND EDITORIAL NARRATIVE) ── */}
      <div className="relative z-10 flex flex-col w-full">
        {/* Chapter 01: Hero Studio */}
        <HeroSection
          onExploreClick={() => scrollToChapter(2)}
          onToggleChiragOS={handleToggleZoom}
        />

        {/* Chapter 02: The Engineer (About & Philosophy) */}
        <AboutSection />

        {/* Chapter 03: Selected Systems & Mini Case Studies */}
        <CaseStudiesSection />

        {/* Chapter 04: Systems Architecture & Pipeline */}
        <EngineeringTree />

        {/* Chapter 05: Terminal & Communication Station */}
        <ContactSection />
      </div>

      {/* ── 3. FULL-SCREEN CHIRAGOS MACBOOK SANDBOX OVERLAY [TRIGGERED VIA Z] ── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-3 md:p-4 bg-black/85 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFocusedOnScreen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.96] pointer-events-none"
        }`}
      >
        {/* Exit Floating Button */}
        <button
          onClick={() => setCameraView("desk")}
          className="absolute top-4 right-6 z-[100] px-4 py-2 rounded-full bg-[#131823]/90 hover:bg-[#1A2234] border border-white/20 text-white text-xs font-mono flex items-center gap-2 shadow-2xl backdrop-blur-md transition-all cursor-pointer"
          title="Exit to Cinematic Studio [Z]"
          aria-label="Exit ChiragOS and return to cinematic studio"
        >
          <X className="w-3.5 h-3.5 text-sky-400" />
          <span>Exit ChiragOS [Z]</span>
        </button>

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

          {/* ── INSIDE THE RETINA SCREEN: CHIRAGOS DESKTOP SPACES ── */}
          <div className="relative flex-1 w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#080B11] border border-white/10">
            <ScreenSpacesContainer />
          </div>
        </div>
      </div>

      {/* ── 4. 3M YELLOW STICKY NOTE MODAL ── */}
      <StickyNoteModal />

      {/* ── 5. MACBOOK PRO LIVE CODE MODAL ── */}
      <MacBookScreenContent />
    </main>
  );
}
