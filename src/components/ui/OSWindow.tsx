"use client";

import React, { useState } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Minus, Square, X } from "lucide-react";

export interface OSWindowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
  toolbarRight?: React.ReactNode;
  collapsible?: boolean;
}

export const OSWindow: React.FC<OSWindowProps> = ({
  title,
  subtitle,
  children,
  icon,
  variant = "light",
  className = "",
  toolbarRight,
  collapsible = false
}) => {
  const { playClick, playWindowOpen } = useSoundEffects();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleControlClick = (action: string) => {
    playClick();
    if (action === "minimize" && collapsible) {
      setIsMinimized(!isMinimized);
    }
  };

  const isDark = variant === "dark";

  return (
    <div
      onMouseEnter={() => playWindowOpen()}
      className={`relative rounded-2xl border transition-all duration-300 backdrop-blur-2xl ${
        isDark
          ? "bg-[#0F172A]/85 border-white/15 text-white shadow-[0_24px_50px_rgba(0,0,0,0.3)]"
          : "bg-white/80 border-white/90 text-[#151515] shadow-[0_24px_48px_-12px_rgba(15,23,42,0.12),0_4px_16px_rgba(15,23,42,0.04),0_0_0_1px_rgba(255,255,255,0.8)]"
      } ${className}`}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-3 border-b select-none rounded-t-2xl ${
          isDark
            ? "border-white/10 bg-white/[0.03]"
            : "border-black/[0.05] bg-gradient-to-r from-white/90 to-white/50"
        }`}
      >
        {/* Left Window Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Close window"
            onClick={() => handleControlClick("close")}
            className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-[#4c0000] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            aria-label="Minimize window"
            onClick={() => handleControlClick("minimize")}
            className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
          >
            <Minus className="w-2 h-2 text-[#543b00] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            type="button"
            aria-label="Expand window"
            onClick={() => handleControlClick("maximize")}
            className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-90 transition-all cursor-pointer flex items-center justify-center group"
          >
            <Square className="w-1.5 h-1.5 text-[#00380c] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Center Title */}
        <div className="flex items-center gap-2 text-center max-w-[60%] truncate">
          {icon && <span className="text-[#6B6F73] shrink-0">{icon}</span>}
          <div className="flex flex-col sm:flex-row items-center sm:gap-2 truncate">
            <span className="text-xs font-semibold tracking-tight truncate">
              {title}
            </span>
            {subtitle && (
              <span className="hidden sm:inline text-[11px] text-[#6B6F73] font-normal">
                — {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right Toolbar */}
        <div className="flex items-center gap-2">
          {toolbarRight}
        </div>
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <div className="p-4 sm:p-6 transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
};
