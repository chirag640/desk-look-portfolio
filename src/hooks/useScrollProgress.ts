"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export function useScrollProgress() {
  const [currentSpace, setCurrentSpace] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentSpaceRef = useRef(0);
  const isThrottledRef = useRef(false);

  const goToSpace = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(6, index));
    currentSpaceRef.current = clamped;
    setCurrentSpace(clamped);
    setProgress(clamped / 6);
  }, []);

  const nextSpace = useCallback(() => {
    goToSpace(currentSpaceRef.current + 1);
  }, [goToSpace]);

  const prevSpace = useCallback(() => {
    goToSpace(currentSpaceRef.current - 1);
  }, [goToSpace]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if cursor is inside an inner scrollable container (e.g. repos list) that can still scroll vertically
      let el = e.target as HTMLElement | null;
      let canInnerScroll = false;

      while (el && el !== document.body && el !== document.documentElement) {
        const style = window.getComputedStyle(el);
        if (style.overflowY === "auto" || style.overflowY === "scroll") {
          const atTop = el.scrollTop <= 2;
          const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            canInnerScroll = true;
            break;
          }
        }
        el = el.parentElement;
      }

      if (canInnerScroll) {
        return;
      }

      if (e.cancelable) {
        e.preventDefault();
      }

      if (isThrottledRef.current) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (Math.abs(delta) > 15) {
        isThrottledRef.current = true;

        if (delta > 0) {
          nextSpace();
        } else {
          prevSpace();
        }

        setTimeout(() => {
          isThrottledRef.current = false;
        }, 420);
      }
    };

    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;
      const dominantDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;

      if (Math.abs(dominantDelta) > 35) {
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
      goToSpace(Math.round(target * 6));
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
