"use client";

import React from "react";
import { experienceData } from "@/data/experience";
import { Badge } from "@/ui/Badge";
import { Clock, CheckCircle2, Calendar, MapPin, Building2 } from "lucide-react";

export const HistorySpace: React.FC = () => {
  return (
    <div data-space-scroll="true" className="relative w-full h-full p-6 sm:p-10 flex flex-col justify-between select-none overflow-y-auto">
      {/* Space Title Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#63C58A20] border border-[#63C58A40] flex items-center justify-center text-[#63C58A]">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              System History & Career Milestones
            </h2>
            <p className="text-xs font-mono text-slate-400">
              TCS & PUB.DEV RELEASES · VIRTUAL SPACE 5
            </p>
          </div>
        </div>

        <Badge variant="green" size="sm">
          TCS Enterprise & Open Source
        </Badge>
      </div>

      {/* Main Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10 my-auto max-w-4xl mx-auto w-full">
        {experienceData.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node */}
            <div
              className="absolute -left-6 sm:-left-8 top-1.5 w-4 h-4 rounded-full border-2 border-black shadow-sm flex items-center justify-center transition-transform group-hover:scale-125"
              style={{ backgroundColor: item.accentColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            <div className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#5B8DEF50] transition-all shadow-md space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#5B8DEF]" />
                    <span className="text-xs font-mono font-bold text-[#5B8DEF]">
                      {item.company}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {item.role}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-white bg-white/10 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{item.year}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-1">
                {item.achievements.map((ach, achIdx) => (
                  <div key={achIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#63C58A] shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-white/5">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/10 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
        <span>SPACE 5/7 · SYSTEM HISTORY</span>
        <span>Scroll to slide to Document & 70 GitHub Repos Station →</span>
      </div>
    </div>
  );
};
