"use client";

import React, { useState } from "react";
import { skillCategoriesData } from "@/data/skills";
import { Badge } from "@/ui/Badge";
import { Cpu, Smartphone, Globe, Server, Database, Box, CheckCircle2, Code2 } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const TechSpace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { playClick } = useSoundEffects();

  const categoryIcons: Record<string, React.ReactNode> = {
    mobile: <Smartphone className="w-3.5 h-3.5 text-[#5B8DEF]" />,
    frontend: <Globe className="w-3.5 h-3.5 text-[#8B6FE8]" />,
    backend: <Server className="w-3.5 h-3.5 text-[#63C58A]" />,
    databases: <Database className="w-3.5 h-3.5 text-[#F4C95D]" />,
    devops: <Box className="w-3.5 h-3.5 text-[#F29A5A]" />
  };

  const filteredCategories =
    activeCategory === "all"
      ? skillCategoriesData
      : skillCategoriesData.filter((c) => c.id === activeCategory);

  return (
    <div data-space-scroll="true" className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#8B6FE820] border border-[#8B6FE840] flex items-center justify-center text-[#8B6FE8]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Installed Technologies & Architecture
            </h2>
            <p className="text-xs font-mono text-slate-400">
              PACKAGE REGISTRY & RUNTIMES · VIRTUAL SPACE 3
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <span className="text-[#5B8DEF] font-bold">FLUTTER & DART</span>
          <span>·</span>
          <span className="text-[#63C58A] font-bold">NESTJS</span>
          <span>·</span>
          <span className="text-[#8B6FE8] font-bold">NEXT.JS</span>
        </div>
      </div>

      {/* Main Grid: Left Code Editor + Right Stack Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        {/* Left Live Architecture Preview */}
        <div className="lg:col-span-5 rounded-2xl bg-black/60 border border-white/10 p-4 space-y-3 font-mono text-xs shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2 text-slate-300 font-bold">
              <Code2 className="w-4 h-4 text-[#5B8DEF]" />
              <span>flutter_blueprint_engine.dart</span>
            </div>
            <span className="text-[10px] text-[#34D399]">v3.0.0</span>
          </div>

          <div className="space-y-1.5 text-[11px] leading-relaxed text-slate-300">
            <p className="text-slate-500">// Enterprise Clean Architecture Scaffolder</p>
            <p><span className="text-[#FF7B72]">import</span> <span className="text-[#A5D6FF]">&apos;package:flutter_blueprint/core.dart&apos;</span>;</p>
            <p className="text-[#79C0FF]">class <span className="text-[#FFA657]">BlueprintScaffolder</span> &#123;</p>
            <p className="pl-3 text-slate-400">final StateManagement state = StateManagement.bloc;</p>
            <p className="pl-3 text-[#7EE787]">Future&lt;void&gt; <span className="text-[#D2A8FF]">generateCleanArch</span>() async &#123;</p>
            <p className="pl-6 text-[#A5D6FF]">await scaffoldDomainEntities();</p>
            <p className="pl-6 text-[#A5D6FF]">await bindDioClientWithSecurity();</p>
            <p className="pl-6 text-[#7EE787]">stdout.writeln(&apos;✓ Architecture verified&apos;);</p>
            <p className="pl-3 text-[#7EE787]">&#125;</p>
            <p className="text-[#79C0FF]">&#125;</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-[10px] text-[#34D399] flex items-center justify-between">
            <span>$ pub.dev/packages/flutter_blueprint</span>
            <span>20★</span>
          </div>
        </div>

        {/* Right Categorized Runtimes Grid */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                playClick();
                setActiveCategory("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white text-black shadow-sm"
                  : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              All Packages
            </button>

            {skillCategoriesData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-white text-black shadow-sm"
                    : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {categoryIcons[cat.id]}
                <span>{cat.title.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Runtimes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filteredCategories.flatMap((cat) => cat.skills).map((skill) => (
              <div
                key={skill.name}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF50] transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">
                    {skill.name}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: skill.color }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 pt-1">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
            <span>Strict null safety in Dart & TypeScript · Zero unhandled runtime exceptions.</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>SPACE 3/7 · INSTALLED TECHNOLOGIES</span>
        <span>Scroll to slide to Applications Explorer (flutter_blueprint) →</span>
      </div>
    </div>
  );
};
