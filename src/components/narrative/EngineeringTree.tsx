"use client";

import React, { useState } from "react";
import { Smartphone, Globe, Server, Database, Container, ArrowRight } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface TechBranch {
  id: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  accent: string;
  headline: string;
  technologies: { name: string; level: string; note: string }[];
}

const TECH_BRANCHES: TechBranch[] = [
  {
    id: "mobile",
    category: "Mobile Architecture",
    icon: Smartphone,
    color: "text-sky-400",
    accent: "#38BDF8",
    headline: "Enterprise Flutter & Dart Engineering",
    technologies: [
      { name: "Flutter 3.x", level: "Expert", note: "Clean Architecture, Custom Painters, Platform Channels" },
      { name: "Dart (Sound Null Safety)", level: "Expert", note: "OOP, Concurrency, Isolate workers, Generators" },
      { name: "BLoC & Riverpod", level: "Production", note: "State isolation, deterministic event piping, dependency injection" },
      { name: "Offline-First Sync", level: "Production", note: "SQLite, Hive local delta caching with conflict resolution" }
    ]
  },
  {
    id: "backend",
    category: "Backend & Microservices",
    icon: Server,
    color: "text-emerald-400",
    accent: "#34D399",
    headline: "Scalable NestJS & Node Cloud Systems",
    technologies: [
      { name: "NestJS", level: "Advanced", note: "Modular architecture, DTOs with class-validator, Guards, Interceptors" },
      { name: "TypeScript", level: "Advanced", note: "Strict types, generic constraints, zero-any policy" },
      { name: "WebSockets & REST", level: "Production", note: "Low-latency streaming, event gateways, Redis pub/sub" },
      { name: "Auth & Security", level: "Production", note: "JWT sane expiry, bcrypt hashing, rate limiting, CORS" }
    ]
  },
  {
    id: "database",
    category: "Databases & Storage",
    icon: Database,
    color: "text-amber-400",
    accent: "#FBBF24",
    headline: "Relational & Document Data Stores",
    technologies: [
      { name: "PostgreSQL", level: "Advanced", note: "ACID transactions, parameterized queries, connection pooling" },
      { name: "MongoDB", level: "Proficient", note: "Document models, aggregation pipelines, schema validation" },
      { name: "Redis", level: "Production", note: "In-memory caching, pub/sub backplane, session state" },
      { name: "Prisma & TypeORM", level: "Production", note: "Type-safe query building and automated database migrations" }
    ]
  },
  {
    id: "web",
    category: "Web & Frontend",
    icon: Globe,
    color: "text-indigo-400",
    accent: "#818CF8",
    headline: "High-Performance Next.js & React",
    technologies: [
      { name: "Next.js 16 (App Router)", level: "Advanced", note: "Turbopack, Server Components, Static Exports, SEO" },
      { name: "React 19", level: "Advanced", note: "Functional hooks, custom state stores (Zustand), purity" },
      { name: "Tailwind CSS v4", level: "Advanced", note: "Design tokens, responsive layouts, zero-runtime CSS" },
      { name: "Three.js / R3F", level: "Proficient", note: "3D scene choreography, GLTF loading, Draco compression" }
    ]
  },
  {
    id: "devops",
    category: "DevOps & CI/CD",
    icon: Container,
    color: "text-rose-400",
    accent: "#FB7185",
    headline: "Containerization & Release Automation",
    technologies: [
      { name: "Docker", level: "Production", note: "Multi-stage builds, container isolation, docker-compose" },
      { name: "GitHub Actions", level: "Production", note: "Automated test harnesses, linting, Pages & Cloud deployments" },
      { name: "Linux & Bash", level: "Proficient", note: "Server provisioning, CLI tooling, performance profiling" },
      { name: "Pub.dev Release", level: "Published", note: "Automated package semantic versioning and distribution" }
    ]
  }
];

const PIPELINE_STEPS = [
  { step: "01", label: "ARCHITECT", desc: "Domain boundaries & DTO contracts" },
  { step: "02", label: "CODE", desc: "Strict TypeScript & Dart null-safety" },
  { step: "03", label: "TEST", desc: "Automated unit & integration pipelines" },
  { step: "04", label: "CONTAINERIZE", desc: "Dockerized NestJS & static SSG" },
  { step: "05", label: "DEPLOY", desc: "Vercel, GitHub Pages & App Stores" }
];

export const EngineeringTree: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState("mobile");
  const { playClick } = useSoundEffects();

  const currentBranch = TECH_BRANCHES.find((b) => b.id === selectedBranch) || TECH_BRANCHES[0];

  return (
    <section
      id="architecture"
      className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-24 sm:py-32 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-6xl pointer-events-auto space-y-12">
        {/* ── Section Eyebrow ── */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs tracking-widest uppercase">
            <span>04 // TECHNICAL ARCHITECTURE</span>
            <span className="w-8 h-px bg-sky-400/40" />
            <span>ARSENAL &amp; PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
            How The Systems Connect.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            A cohesive full-stack matrix designed for production reliability: from reactive Flutter mobile clients to transactional NestJS backends.
          </p>
        </div>

        {/* ── 1. Code to Product Transformation Pipeline ── */}
        <div className="p-6 rounded-2xl bg-[#0B0F19]/90 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/10">
            <span className="text-sky-400 font-bold uppercase">THE PRODUCTION PIPELINE</span>
            <span className="hidden sm:inline">From Concept to Scaled Deployment</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {PIPELINE_STEPS.map((pipe, idx) => (
              <div
                key={pipe.step}
                className="p-3.5 rounded-xl bg-[#111726]/60 border border-white/5 space-y-1 font-mono relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400">{pipe.step}</span>
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden sm:block" />
                  )}
                </div>
                <div className="text-xs font-bold text-white tracking-wider">{pipe.label}</div>
                <div className="text-[11px] text-slate-400 leading-tight">{pipe.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 2. Interactive System Matrix ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Branch Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2 font-mono">
            {TECH_BRANCHES.map((branch) => {
              const Icon = branch.icon;
              const isSelected = selectedBranch === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    playClick();
                    setSelectedBranch(branch.id);
                  }}
                  data-cursor="link"
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#141B2D] border-sky-400/40 shadow-lg"
                      : "bg-[#0A0E17]/60 hover:bg-[#111726] border-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? "bg-white/10 text-sky-400" : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {branch.category}
                      </div>
                      <div className="text-[10px] text-slate-500">{branch.technologies.length} Stack Components</div>
                    </div>
                  </div>
                  <span className={`text-xs ${isSelected ? "text-sky-400" : "text-slate-600"}`}>→</span>
                </button>
              );
            })}
          </div>

          {/* Right Branch Details */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0D121F]/90 border border-white/10 backdrop-blur-md space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 block">
                  {currentBranch.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  {currentBranch.headline}
                </h3>
              </div>
            </div>

            {/* Technologies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentBranch.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-xl bg-[#080C14] border border-white/5 space-y-1.5"
                >
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-xs font-bold text-white">{tech.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-sky-400 font-semibold">
                      {tech.level}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {tech.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
