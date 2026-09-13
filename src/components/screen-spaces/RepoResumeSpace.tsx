"use client";

import React, { useState } from "react";
import { githubRepositories, personalData } from "@/data/social";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { FileText, Download, ExternalLink, GitBranch, Star, GitFork, Radio, Box, Search } from "lucide-react";
import { GithubIcon } from "@/ui/BrandIcons";

export const RepoResumeSpace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = githubRepositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div data-space-scroll="true" className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#F4C95D20] border border-[#F4C95D40] flex items-center justify-center text-[#F4C95D]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Document Viewer & 70 Repositories Explorer
            </h2>
            <p className="text-xs font-mono text-slate-400">
              VERIFIED RESUME & GITHUB REPOSITORIES ARCHIVE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={personalData.resumeUrl}
            download="Chirag_Chaudhary_Resume.pdf"
            className="no-underline"
          >
            <Button size="sm" variant="primary" icon={<Download className="w-3.5 h-3.5" />}>
              Download CV
            </Button>
          </a>
        </div>
      </div>

      {/* Main Grid: Left Resume Preview + Right 70 Repos Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
        {/* Left Resume Summary Card */}
        <div className="lg:col-span-5 rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                {personalData.name}
              </h3>
              <p className="text-xs font-mono text-[#5B8DEF] font-semibold">
                {personalData.title} · {personalData.company}
              </p>
            </div>
            <Badge variant="blue" size="sm">
              TCS Verified
            </Badge>
          </div>

          <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <p>
              <strong>Education:</strong> {personalData.education}
            </p>
            <p>
              <strong>Location:</strong> {personalData.location}
            </p>
            <p>
              <strong>Specialization:</strong> Enterprise Flutter/Dart mobile architectures, Clean Architecture (BLoC, Riverpod), scalable NestJS REST APIs, and Next.js full-stack web platforms.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Box className="w-3.5 h-3.5 text-[#5B8DEF]" />
              <span>Pub.dev Ecosystem Author</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Creator of <strong>flutter_blueprint</strong> (v3.0.0, 20 stars) enabling engineers worldwide to scaffold production apps.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full no-underline"
            >
              <Button size="sm" variant="secondary" icon={<ExternalLink className="w-3 h-3" />} className="w-full">
                Open Full Document Viewer
              </Button>
            </a>
          </div>
        </div>

        {/* Right 70 Repositories Explorer */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 70 public repositories (e.g. Flutter, NestJS, Dart)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#5B8DEF] transition-all"
              />
            </div>

            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline shrink-0"
            >
              <Button size="sm" variant="outline" icon={<GithubIcon className="w-3.5 h-3.5" />} className="text-white border-white/20 hover:bg-white/10">
                GitHub (70)
              </Button>
            </a>
          </div>

          {/* Repos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {filteredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF50] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-white group-hover:text-[#5B8DEF] transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 text-[10px] font-mono text-slate-400 border-t border-white/5 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-white">
                    <Star className="w-3 h-3 text-[#F4C95D] fill-[#F4C95D]" />
                    <span>{repo.stars}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>Verified Resume & GitHub Repositories Archive</span>
        <span>70 Public Repositories @chirag640</span>
      </div>
    </div>
  );
};
