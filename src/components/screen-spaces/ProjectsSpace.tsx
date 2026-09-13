"use client";

import React, { useState } from "react";
import { projectsData, projectCategories, Project } from "@/data/projects";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { FolderGit2, ExternalLink, Box, Star, CheckCircle2, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/ui/BrandIcons";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export const ProjectsSpace: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { playClick, playWindowOpen } = useSoundEffects();

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const featuredProject = projectsData.find((p) => p.featured) || projectsData[0];

  return (
    <div data-space-scroll="true" className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#5B8DEF20] border border-[#5B8DEF40] flex items-center justify-center text-[#5B8DEF]">
            <FolderGit2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Applications & Open Source Registry
            </h2>
            <p className="text-xs font-mono text-slate-400">
              PUB.DEV PACKAGES & FULL-STACK SYSTEMS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Featured Flagship on Left + Repository List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        {/* Featured Flagship: flutter_blueprint */}
        <div className="lg:col-span-6 rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <Badge variant="green" size="sm">
              PUBLISHED ON PUB.DEV · v3.0.0
            </Badge>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F4C95D20] text-[#F4C95D] border border-[#F4C95D40]">
              <Star className="w-3 h-3 fill-[#F4C95D]" />
              20 Stars on GitHub
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              {featuredProject.title}
            </h3>
            <p className="text-xs font-mono text-[#5B8DEF] mt-0.5">
              Role: {featuredProject.role}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {featuredProject.fullDescription}
          </p>

          {/* Features */}
          <div className="space-y-1.5">
            {featuredProject.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8DEF] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {featuredProject.liveUrl && (
              <a
                href={featuredProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button size="sm" variant="primary" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                  View on Pub.dev
                </Button>
              </a>
            )}
            {featuredProject.githubUrl && (
              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Button size="sm" variant="secondary" icon={<GithubIcon className="w-3.5 h-3.5" />}>
                  GitHub (20★)
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Secondary Applications List */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                playWindowOpen();
                setActiveModalProject(project);
              }}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF50] transition-all cursor-pointer shadow-md hover:-translate-y-0.5 flex flex-col justify-between group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {project.category}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-300">
                    {project.year}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#5B8DEF] transition-colors line-clamp-1">
                  {project.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>

              <div className="pt-3 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#5B8DEF] font-semibold pt-1 border-t border-white/5">
                  <span>Inspect Architecture</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Inspector */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl bg-[#131823] border border-white/20 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono text-[#5B8DEF] font-bold">
                  ROLE: {activeModalProject.role || "Lead Architect"}
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {activeModalProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-2.5 py-1 text-xs font-mono bg-white/10 hover:bg-white/20 rounded-lg text-white cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeModalProject.fullDescription}
            </p>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider block">
                Architectural Highlights
              </span>
              <ul className="space-y-1">
                {activeModalProject.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#63C58A] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {activeModalProject.technologies.map((t) => (
                  <Badge key={t} variant="default" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="primary">
                      Launch
                    </Button>
                  </a>
                )}
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="secondary">
                      GitHub
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>Featured Applications & Open Source Repositories</span>
        <span>Maintained by Chirag Chaudhary · Verified Architecture</span>
      </div>
    </div>
  );
};
