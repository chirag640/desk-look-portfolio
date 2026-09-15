"use client";

import React from "react";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { ArrowDown, FileDown } from "lucide-react";
import { getAssetPath } from "@/lib/assets";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface HeroSectionProps {
  onExploreClick: () => void;
  onToggleChiragOS: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onToggleChiragOS
}) => {
  const { playClick, playMacPop } = useSoundEffects();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-28 sm:pt-36 pb-12 pointer-events-none"
    >
      {/* ── Top Header / Status Eyebrow ── */}
      <div className="max-w-4xl pointer-events-auto space-y-4">
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#141B2D]/90 border border-sky-400/20 backdrop-blur-md text-slate-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399] animate-pulse" />
          <span className="text-slate-200">Software Engineer @ Tata Consultancy Services</span>
          <span className="text-slate-600">|</span>
          <span className="text-sky-400 hidden sm:inline font-semibold">Pub.dev Maintainer</span>
        </div>

        {/* ── Main Editorial Heading ── */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
          ENGINEERING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">
            SYSTEMS &amp; CODE.
          </span>
        </h1>

        {/* ── Concise Positioning Statement ── */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Designing production mobile architectures, clean developer tooling, and full-stack microservices with{" "}
          <span className="text-white font-semibold">Flutter, Dart, NestJS, and Next.js</span>. Focused on deterministic architectures, clean state isolation, and zero-compromise UX.
        </p>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap items-center gap-3.5 pt-4">
          <MagneticWrapper strength={16}>
            <button
              onClick={() => {
                playClick();
                onExploreClick();
              }}
              data-cursor="project"
              className="px-6 py-3 rounded-xl bg-white text-black hover:bg-slate-100 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(255,255,255,0.2)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span>Explore Selected Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </MagneticWrapper>

          <MagneticWrapper strength={16}>
            <button
              onClick={() => {
                playMacPop();
                onToggleChiragOS();
              }}
              data-cursor="link"
              className="px-5 py-3 rounded-xl bg-[#141C2E]/90 hover:bg-[#1A253E] border border-white/15 text-white font-mono text-xs font-medium backdrop-blur-md shadow-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span className="text-sky-400"></span>
              <span>Launch ChiragOS Sandbox</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-mono">
                [Z]
              </span>
            </button>
          </MagneticWrapper>

          <MagneticWrapper strength={12}>
            <a
              href={getAssetPath("/resume/Chirag_Resume.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono cursor-pointer"
              title="Download Verified PDF Resume"
              aria-label="Download Chirag's verified resume PDF"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Resume.pdf</span>
            </a>
          </MagneticWrapper>
        </div>
      </div>

      {/* ── Bottom Technical Credentials Bar & Scroll Cue ── */}
      <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-auto border-t border-white/10 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 font-mono">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Core Framework</span>
            <span className="text-sm sm:text-base font-bold text-white">Flutter &amp; Dart</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Pub.dev Package</span>
            <span className="text-sm sm:text-base font-bold text-sky-400">flutter_blueprint v3</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Backend &amp; API</span>
            <span className="text-sm sm:text-base font-bold text-white">NestJS &amp; PostgreSQL</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Studio Location</span>
            <span className="text-sm sm:text-base font-bold text-slate-300">Gandhinagar, India</span>
          </div>
        </div>

        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition-colors font-mono text-xs cursor-pointer select-none group"
          aria-label="Scroll to next chapter"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO EXPLORE WORKSPACE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-sky-400" />
        </button>
      </div>
    </section>
  );
};
