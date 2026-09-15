"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";

export type CursorState = "default" | "project" | "link" | "drag" | "external";

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const dotPos = useRef({ x: -100, y: -100 });
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  const isTouchOrReducedMotion = useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => {
      if (typeof window === "undefined") return true;
      const hasTouch = window.matchMedia("(pointer: coarse)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return hasTouch || reducedMotion;
    },
    () => true
  );

  useEffect(() => {
    if (isTouchOrReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const attr = cursorTarget.getAttribute("data-cursor") as CursorState;
        setCursorState(attr || "link");
      } else if (target.closest("a, button, [role='button']")) {
        setCursorState("link");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const animate = () => {
      const dx = mousePos.current.x - dotPos.current.x;
      const dy = mousePos.current.y - dotPos.current.y;

      dotPos.current.x += dx * 0.18;
      dotPos.current.y += dy * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible, isTouchOrReducedMotion]);

  if (isTouchOrReducedMotion || !isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      {cursorState === "default" && (
        <div className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-150" />
      )}

      {cursorState === "link" && (
        <div className="w-8 h-8 rounded-full border border-sky-400/80 bg-sky-400/15 backdrop-blur-[2px] shadow-[0_0_16px_rgba(56,189,248,0.3)] transition-all duration-200 animate-pulse-subtle" />
      )}

      {cursorState === "project" && (
        <div className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold tracking-wider uppercase shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-black/10 transition-all duration-200">
          View Case
        </div>
      )}

      {cursorState === "drag" && (
        <div className="px-2.5 py-0.5 rounded-full bg-sky-500 text-white text-[9px] font-mono font-bold tracking-widest uppercase shadow-[0_4px_16px_rgba(2,132,199,0.5)] transition-all duration-200">
          ↔ Rotate
        </div>
      )}

      {cursorState === "external" && (
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-lg transition-all duration-200">
          ↗
        </div>
      )}
    </div>
  );
};
