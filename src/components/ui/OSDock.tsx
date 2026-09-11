"use client";

import React from "react";
import { DOCK_ITEMS } from "@/lib/constants";
import { Monitor, User, Cpu, FolderGit2, Clock, FileText, Mail } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface OSDockProps {
  currentProgress: number;
  onNavigate: (progress: number) => void;
}

const iconMap = {
  Monitor,
  User,
  Cpu,
  FolderGit2,
  Clock,
  FileText,
  Mail
};

export const OSDock: React.FC<OSDockProps> = ({ currentProgress, onNavigate }) => {
  const { playClick } = useSoundEffects();

  return (
    <nav
      aria-label="Application Dock"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-xl border border-[rgba(21,21,21,0.10)] os-dock-shadow transition-all"
    >
      {DOCK_ITEMS.map((item) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Monitor;
        const isActive = Math.abs(currentProgress - item.scrollTarget) < 0.08;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              playClick();
              onNavigate(item.scrollTarget);
            }}
            aria-label={`Jump to ${item.label}`}
            className={`group relative flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#151515] text-white shadow-md -translate-y-1"
                : "bg-transparent text-[#6B6F73] hover:text-[#151515] hover:bg-[#F0F1EE] hover:-translate-y-0.5"
            }`}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />

            {/* Tooltip on Hover */}
            <span className="pointer-events-none absolute -top-8 px-2 py-0.5 text-[11px] font-medium text-white bg-[#151515] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
              {item.label}
            </span>

            {/* Active Dot */}
            {isActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#5B8DEF]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
