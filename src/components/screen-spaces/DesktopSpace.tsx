"use client";

import React from "react";
import { personalData } from "@/data/social";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { Sparkles, ArrowRight, Box, Terminal, FileText, User, Star, ExternalLink } from "lucide-react";

interface DesktopSpaceProps {
  onNavigateSpace: (spaceIndex: number) => void;
}

export const DesktopSpace: React.FC<DesktopSpaceProps> = ({ onNavigateSpace }) => {
  return (
    <div data-space-scroll="true" className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Welcome Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="blue" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            Apple Studio Display · ChiragOS 2.6
          </Badge>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#63C58A] animate-pulse" />
            TCS Software Engineer · Gandhinagar Node
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={personalData.pubDev}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F4C95D20] text-[#F4C95D] border border-[#F4C95D40] hover:bg-[#F4C95D30] transition-colors"
          >
            <Star className="w-3 h-3 fill-[#F4C95D]" />
            <span>flutter_blueprint v3.0.0</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Center Hero & Desktop Icons Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Left Hero Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#5B8DEF] font-bold tracking-widest uppercase">
              <span>WORKSTATION READY</span>
              <span>·</span>
              <span>FLUTTER & FULL-STACK</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              {personalData.name}
            </h1>
            <p className="text-lg sm:text-2xl font-bold tracking-tight text-[#5B8DEF] font-mono">
              {personalData.title} · {personalData.company}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
            {personalData.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="lg"
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => onNavigateSpace(3)}
            >
              Explore flutter_blueprint (Pub.dev)
            </Button>

            <Button
              size="lg"
              variant="secondary"
              icon={<User className="w-4 h-4 text-[#5B8DEF]" />}
              onClick={() => onNavigateSpace(1)}
            >
              System Profile (TCS)
            </Button>

            <Button
              size="lg"
              variant="outline"
              icon={<FileText className="w-4 h-4 text-[#8B6FE8]" />}
              onClick={() => onNavigateSpace(5)}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Verified Resume
            </Button>
          </div>
        </div>

        {/* Right Desktop App Launchers */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-3.5">
          <button
            onClick={() => onNavigateSpace(3)}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF50] transition-all text-left group cursor-pointer shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#5B8DEF20] border border-[#5B8DEF40] flex items-center justify-center text-[#5B8DEF] mb-3 group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#5B8DEF] transition-colors">
              flutter_blueprint
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              CLI Package on Pub.dev (20★)
            </p>
          </button>

          <button
            onClick={() => onNavigateSpace(3)}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#63C58A50] transition-all text-left group cursor-pointer shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#63C58A20] border border-[#63C58A40] flex items-center justify-center text-[#63C58A] mb-3 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#63C58A] transition-colors">
              FinFlow Mobile
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Flutter + NestJS System
            </p>
          </button>

          <button
            onClick={() => onNavigateSpace(2)}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B6FE850] transition-all text-left group cursor-pointer shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8B6FE820] border border-[#8B6FE840] flex items-center justify-center text-[#8B6FE8] mb-3 group-hover:scale-110 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#8B6FE8] transition-colors">
              Tech Stack
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Flutter, Dart, NestJS, Next.js
            </p>
          </button>

          <button
            onClick={() => onNavigateSpace(5)}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F4C95D50] transition-all text-left group cursor-pointer shadow-lg hover:shadow-amber-500/10 hover:-translate-y-0.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F4C95D20] border border-[#F4C95D40] flex items-center justify-center text-[#F4C95D] mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-[#F4C95D] transition-colors">
              70 Repositories
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              GitHub & Verified Resume
            </p>
          </button>
        </div>
      </div>

      {/* Footer Quick Status */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399]" />
          <span>DISPLAY: APPLE STUDIO DISPLAY 5K · SPACE 1/7</span>
        </div>
        <span>Scroll or use Dock to slide between Virtual Spaces →</span>
      </div>
    </div>
  );
};
