"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export function useScrollProgress() {
  const [currentSpace, setCurrentSpace] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentSpaceRef = useRef(0);
  const isThrottledRef = useRef(false);

  const resetSpaceScroll = (spaceIndex: number, position: "top" | "bottom") => {
    setTimeout(() => {
      const spaceEl = document.querySelector(
        `[data-space-index="${spaceIndex}"] [data-space-scroll="true"]`
      ) as HTMLElement | null;
      if (spaceEl) {
        if (position === "top") {
          spaceEl.scrollTop = 0;
        } else {
          spaceEl.scrollTop = spaceEl.scrollHeight;
        }
      }
    }, 60);
  };

  const goToSpace = useCallback((index: number, scrollPos?: "top" | "bottom") => {
    const clamped = Math.max(0, Math.min(6, index));
    currentSpaceRef.current = clamped;
    setCurrentSpace(clamped);
    setProgress(clamped / 6);
    if (scrollPos) {
      resetSpaceScroll(clamped, scrollPos);
    }
  }, []);

  const nextSpace = useCallback(() => {
    goToSpace(currentSpaceRef.current + 1, "top");
  }, [goToSpace]);

  const prevSpace = useCallback(() => {
    goToSpace(currentSpaceRef.current - 1, "bottom");
  }, [goToSpace]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;

      // 1. ISOLATION: Terminal window focused scroll
      // If mouse is inside terminal window, ONLY scroll terminal content, never change space
      if (target && target.closest("[data-terminal-window]")) {
        return;
      }

      // 2. ISOLATION: Music player popup
      if (target && target.closest("[data-music-popup]")) {
        return;
      }

      // 3. PAGE SCROLL FIRST: Check if cursor or active space has vertical content to scroll
      let scrollableEl: HTMLElement | null = null;
      let curr = target;

      while (curr && curr !== document.body && curr !== document.documentElement) {
        const style = window.getComputedStyle(curr);
        const hasScrollOverflow =
          style.overflowY === "auto" || style.overflowY === "scroll";
        if (hasScrollOverflow && curr.scrollHeight > curr.clientHeight + 4) {
          scrollableEl = curr;
          break;
        }
        curr = curr.parentElement;
      }

      // If no hovered child has scroll, check the active space container
      if (!scrollableEl) {
        const activeSpaceEl = document.querySelector(
          `[data-space-index="${currentSpaceRef.current}"] [data-space-scroll="true"]`
        ) as HTMLElement | null;
        if (
          activeSpaceEl &&
          activeSpaceEl.scrollHeight > activeSpaceEl.clientHeight + 4
        ) {
          scrollableEl = activeSpaceEl;
        }
      }

      // If scrollable content exists, scroll the page first before switching
      if (scrollableEl) {
        const atTop = scrollableEl.scrollTop <= 4;
        const atBottom =
          scrollableEl.scrollTop >=
          scrollableEl.scrollHeight - scrollableEl.clientHeight - 4;

        // If scrolling down and NOT at bottom yet, let inner page scroll down
        if (e.deltaY > 0 && !atBottom) {
          return;
        }

        // If scrolling up and NOT at top yet, let inner page scroll up
        if (e.deltaY < 0 && !atTop) {
          return;
        }
      }

      // 4. AT BOUNDARY: Switch to next/previous virtual desktop space
      if (e.cancelable) {
        e.preventDefault();
      }

      if (isThrottledRef.current) return;

      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (Math.abs(delta) > 18) {
        isThrottledRef.current = true;

        if (delta > 0) {
          nextSpace();
        } else {
          prevSpace();
        }

        setTimeout(() => {
          isThrottledRef.current = false;
        }, 460);
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("[data-terminal-window]") ||
        target?.closest("[data-music-popup]")
      ) {
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;
      const dominantDelta =
        Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      if (Math.abs(dominantDelta) > 40) {
        if (dominantDelta > 0) {
          nextSpace();
        } else {
          prevSpace();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSpace, prevSpace]);

  const scrollTo = useCallback(
    (target: number) => {
      goToSpace(Math.round(target * 6), "top");
    },
    [goToSpace]
  );

  return {
    progress,
    currentSpace,
    goToSpace,
    nextSpace,
    prevSpace,
    scrollTo
  };
}
