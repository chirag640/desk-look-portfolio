"use client";

import React from "react";
import { personalData } from "@/data/social";
import { Badge } from "@/ui/Badge";
import { User, Building2, MapPin, GraduationCap, Cpu, Layers, ShieldCheck, Box, CheckCircle2 } from "lucide-react";

export const ProfileSpace: React.FC = () => {
  return (
    <div className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#5B8DEF20] border border-[#5B8DEF40] flex items-center justify-center text-[#5B8DEF]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              System Profile & Engineering Overview
            </h2>
            <p className="text-xs font-mono text-slate-400">
              CHIRAG.SYS · VIRTUAL SPACE 2
            </p>
          </div>
        </div>

        <Badge variant="blue" size="sm">
          TCS Enterprise Node
        </Badge>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Narrative */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#5B8DEF] uppercase">
              ENGINEERING IDENTITY
            </span>
            <h3 className="text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {personalData.name}
            </h3>
            <p className="text-sm font-semibold text-[#5B8DEF] font-mono">
              {personalData.title} · {personalData.company}
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>
              I am a software engineer at <strong>Tata Consultancy Services (TCS)</strong>, specializing in scalable cross-platform mobile development (Flutter/Dart) and full-stack web engineering with Next.js, TypeScript, and NestJS.
            </p>
            <p>
              I created and maintain <strong>flutter_blueprint</strong> (published on Pub.dev with 20 GitHub stars), an enterprise CLI generator that helps engineering teams scaffold production clean architecture apps with BLoC, Riverpod, Provider, or GetX.
            </p>
            <p>
              With a strong foundation from my B.Tech in Computer Science & Engineering and over 70 public software repositories, I specialize in clean separation of concerns, deterministic reactive state, offline synchronization, and developer tooling.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <Badge variant="blue" icon={<Cpu className="w-3.5 h-3.5" />}>
              Flutter & Dart Ecosystem
            </Badge>
            <Badge variant="purple" icon={<Layers className="w-3.5 h-3.5" />}>
              React & Next.js
            </Badge>
            <Badge variant="green" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
              NestJS & Node.js
            </Badge>
            <Badge variant="orange" icon={<Box className="w-3.5 h-3.5" />}>
              Pub.dev Package Author
            </Badge>
          </div>
        </div>

        {/* Right Verified Credentials Card */}
        <div className="lg:col-span-5 rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Building2 className="w-4 h-4 text-[#5B8DEF]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Verified Credentials
            </span>
          </div>

          <dl className="space-y-3 text-xs">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400 font-mono">Current Company</dt>
              <dd className="font-semibold text-white text-right">Tata Consultancy Services (TCS)</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400 font-mono flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#5B8DEF]" />
                Location
              </dt>
              <dd className="font-semibold text-white text-right">Gandhinagar, Gujarat, India</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400 font-mono flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-[#8B6FE8]" />
                Education
              </dt>
              <dd className="font-semibold text-white text-right">B.Tech in Computer Science</dd>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <dt className="text-slate-400 font-mono">Flagship Package</dt>
              <dd className="font-semibold text-[#34D399] text-right">flutter_blueprint (20★ Pub.dev)</dd>
            </div>
            <div className="flex justify-between pt-0.5">
              <dt className="text-slate-400 font-mono">GitHub Repos</dt>
              <dd className="font-semibold text-[#5B8DEF] text-right">70 Public Repositories</dd>
            </div>
          </dl>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] font-mono text-slate-400 leading-relaxed flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
            <span>TCS Corporate Verified · Open to high-impact software engineering.</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>SPACE 2/7 · SYSTEM PROFILE</span>
        <span>Scroll to slide to Installed Technologies & Architecture →</span>
      </div>
    </div>
  );
};
