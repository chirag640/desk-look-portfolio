"use client";

import { useState, useEffect, useCallback } from "react";

const CHAPTER_IDS = ["hero", "about", "projects", "architecture", "contact"];

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const rawProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
          const clamped = Math.max(0, Math.min(1, rawProgress));
          setProgress(clamped);

          // Determine active chapter (0 to 4)
          const chap = Math.min(4, Math.floor(clamped * 4.99));
          setActiveChapter(chap);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = useCallback((index: number) => {
    const targetId = CHAPTER_IDS[index] || "hero";
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollTo = useCallback((target: number) => {
    if (typeof window === "undefined") return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: target * totalHeight,
      behavior: "smooth"
    });
  }, []);

  return {
    progress,
    activeChapter,
    scrollToChapter,
    scrollTo
  };
}
