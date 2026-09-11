"use client";

import React from "react";
import { getActiveScene } from "@/lib/scenes";
import { ChevronDown } from "lucide-react";

interface ScrollProgressProps {
  progress: number;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ progress }) => {
  const activeScene = getActiveScene(progress);
  const percentage = Math.round(progress * 100);

  return (
    <aside
      aria-label="Scene progress indicator"
      className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-40 flex flex-col items-end gap-2 pointer-events-none select-none"
    >
      <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[rgba(21,21,21,0.08)] shadow-sm">
        <span className="font-mono text-[11px] font-bold text-[#151515]">
          {activeScene.index} / 07
        </span>
        <span className="w-1 h-3 bg-[rgba(21,21,21,0.12)] rounded-full" />
        <span className="text-xs font-semibold text-[#6B6F73] tracking-wide uppercase">
          {activeScene.name}
        </span>
        <span className="font-mono text-[11px] text-[#5B8DEF] font-medium">
          {percentage}%
        </span>
      </div>

      {progress < 0.08 && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6B6F73] animate-bounce pr-1">
          <span>Scroll to explore</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      )}
    </aside>
  );
};
