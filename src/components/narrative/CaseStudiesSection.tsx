"use client";

import React, { useState } from "react";
import { projectsData } from "@/data/projects";
import { MagneticWrapper } from "@/components/ui/MagneticWrapper";
import { ExternalLink, Check, Terminal, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/ui/BrandIcons";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface CaseStudiesSectionProps {
  onSelectProject?: (projectId: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onSelectProject
}) => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const { playClick } = useSoundEffects();

  const activeProject = projectsData[activeProjectIndex] || projectsData[0];

  const handleSelect = (idx: number) => {
    playClick();
    setActiveProjectIndex(idx);
    if (onSelectProject) {
      onSelectProject(projectsData[idx].id);
    }
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full px-6 sm:px-12 md:px-20 py-24 sm:py-32 flex flex-col justify-center pointer-events-none"
    >
      <div className="max-w-6xl pointer-events-auto space-y-10">
        {/* ── Chapter Eyebrow & Headline ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs tracking-widest uppercase">
              <span>03 // SELECTED SYSTEMS</span>
              <span className="w-8 h-px bg-sky-400/40" />
              <span>PRODUCTION CODE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
              Case Studies &amp; Architecture.
            </h2>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {projectsData.slice(0, 4).map((proj, idx) => (
              <MagneticWrapper key={proj.id} strength={6}>
                <button
                  onClick={() => handleSelect(idx)}
                  data-cursor="project"
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                    activeProjectIndex === idx
                      ? "bg-white text-black font-bold shadow-lg"
                      : "bg-[#141B2D] hover:bg-[#1C263F] text-slate-400 hover:text-white border border-white/5"
                  }`}
                >
                  <span className="opacity-60 mr-1.5 text-[10px]">0{idx + 1}</span>
                  <span>{proj.title.split(" ")[0]}</span>
                </button>
              </MagneticWrapper>
            ))}
          </div>
        </div>

        {/* ── Active Case Study Display ── */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0C111C]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Problem, Solution & Metrics */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Status and Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/30 text-sky-400 text-[11px] font-mono font-bold uppercase tracking-wider">
                  {activeProject.metrics || activeProject.category}
                </span>
                <span className="text-slate-500 text-xs font-mono">•</span>
                <span className="text-slate-400 text-xs font-mono">{activeProject.year}</span>
                <span className="text-slate-500 text-xs font-mono">•</span>
                <span className="text-emerald-400 text-xs font-mono font-bold">● {activeProject.status}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {activeProject.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeProject.fullDescription}
              </p>

              {/* Architecture Features */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Architecture &amp; Engineering Highlights:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
                  {activeProject.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              {activeProject.liveUrl && (
                <MagneticWrapper strength={10}>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_16px_rgba(2,132,199,0.3)] transition-all cursor-pointer"
                  >
                    <span>{activeProject.packageUrl ? "Pub.dev Package" : "Live Demo"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </MagneticWrapper>
              )}

              {activeProject.githubUrl && (
                <MagneticWrapper strength={10}>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="external"
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub Source</span>
                  </a>
                </MagneticWrapper>
              )}
            </div>
          </div>

          {/* Right Column: Technology Stack & Architectural Blueprint Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#080B12] border border-white/10 space-y-6 font-mono">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <span className="text-slate-400">STACK &amp; RUNTIME</span>
                <span className="text-sky-400 font-bold">{activeProject.category.toUpperCase()}</span>
              </div>

              {/* Technologies Pills */}
              <div className="flex flex-wrap gap-1.5">
                {activeProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Blueprint Mock Terminal Snippet */}
              <div className="p-3.5 rounded-xl bg-[#04060A] border border-white/5 text-[11px] leading-relaxed text-slate-400 space-y-1">
                <div className="text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  <span>system_manifest.yaml</span>
                </div>
                <div className="text-slate-500 font-mono text-[10px]">
                  # Production architectural contract
                </div>
                <div>target: &quot;{activeProject.id}&quot;</div>
                <div>strict_typing: true</div>
                <div>null_safety: sound</div>
                <div>state_management: &quot;clean_architecture&quot;</div>
                <div className="text-sky-400 pt-1">status: &quot;PRODUCTION_READY&quot;</div>
              </div>
            </div>

            {/* Quick Next Case Study Button */}
            <button
              onClick={() => handleSelect((activeProjectIndex + 1) % projectsData.length)}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>Next Project: {projectsData[(activeProjectIndex + 1) % projectsData.length].title.split(" ")[0]}</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
