"use client";

import { useState, useCallback, useRef } from "react";

export function useScrollProgress() {
  const [currentSpace, setCurrentSpace] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentSpaceRef = useRef(0);

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
