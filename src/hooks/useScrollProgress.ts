"use client";

import { useEffect, useState, useCallback } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      const rawProgress = scrollY / docHeight;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((targetProgress: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = targetProgress * docHeight;
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  }, []);

  return { progress, scrollTo };
}
