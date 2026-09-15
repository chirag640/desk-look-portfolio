"use client";

import React from "react";
import { Layers, Cpu, GitBranch } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-24 sm:py-32 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-5xl pointer-events-auto space-y-12">
        {/* ── Chapter Header ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs tracking-widest uppercase">
            <span>02 // THE ENGINEER</span>
            <span className="w-8 h-px bg-sky-400/40" />
            <span>TCS &amp; OPEN SOURCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            I don&apos;t just write code. <br />
            <span className="text-slate-400 font-light">I design systems that endure.</span>
          </h2>
        </div>

        {/* ── Two-column Editorial Body ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-slate-300 text-sm sm:text-base leading-relaxed">
          <div className="md:col-span-7 space-y-4">
            <p>
              As a Software Engineer at <strong className="text-white font-semibold">Tata Consultancy Services (TCS)</strong> in Gandhinagar, I build enterprise-grade mobile architectures and full-stack cloud ecosystems. My day-to-day focus spans reactive client applications, high-concurrency NestJS APIs, and low-friction developer tooling.
            </p>
            <p>
              Beyond enterprise development, I am passionate about developer leverage. I authored and maintain{" "}
              <strong className="text-sky-400 font-semibold">flutter_blueprint</strong> on Pub.dev (v3.0.0, 20+ GitHub stars) — a production CLI that scaffolds Clean Architecture Flutter applications with BLoC and Riverpod, pre-wired Dio interceptors, and CI/CD pipelines.
            </p>
            <p>
              My philosophy is rooted in <strong className="text-white">strict predictability</strong>: no hidden state mutations, full null safety, typed API contracts, and interfaces that feel instantaneous to the end user.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between gap-4">
            {/* Stat Cards */}
            <div className="p-5 rounded-2xl bg-[#0F1523]/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">20+ Stars</div>
              <div className="text-xs font-mono text-sky-400 uppercase">flutter_blueprint on Pub.dev</div>
              <p className="text-xs text-slate-400 pt-1">
                Scaffolding production Clean Architecture Flutter applications globally.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1523]/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">70+ Repositories</div>
              <div className="text-xs font-mono text-emerald-400 uppercase">Public Open Source on GitHub</div>
              <p className="text-xs text-slate-400 pt-1">
                Covering Flutter mobile apps, NestJS microservices, WebSockets, and Three.js.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0F1523]/80 border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-2xl sm:text-3xl font-mono font-black text-white">100% Strict</div>
              <div className="text-xs font-mono text-indigo-400 uppercase">Null Safety &amp; TypeScript</div>
              <p className="text-xs text-slate-400 pt-1">
                Zero untyped code; robust domain boundaries and defensive error handling.
              </p>
            </div>
          </div>
        </div>

        {/* ── 3 Engineering Pillars ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-6 rounded-2xl bg-[#111726]/60 border border-white/10 backdrop-blur-md hover:border-sky-400/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">01 // Clean Architecture</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decoupling domain business logic from presentation and data sources using BLoC, Riverpod, and strict repository patterns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111726]/60 border border-white/10 backdrop-blur-md hover:border-emerald-400/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">02 // Cloud &amp; Microservices</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-throughput NestJS APIs with DTO validation, relational PostgreSQL transactions, Redis caching, and Docker containerization.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111726]/60 border border-white/10 backdrop-blur-md hover:border-indigo-400/40 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-mono">03 // Developer Tooling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automating CLI generation, environment flavoring, and CI/CD pipelines to empower distributed software engineering teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
