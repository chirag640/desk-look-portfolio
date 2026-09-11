"use client";

import { create } from "zustand";

export type LightingMood = "night" | "golden" | "rain";
export type WallpaperTheme = "obsidian" | "sakura" | "sonoma" | "nordic";
export type CameraViewMode = "screen" | "desk" | "macbook";
export type SoundscapeType = "none" | "rain" | "lofi" | "study";

interface AtmosphereState {
  lightingMood: LightingMood;
  setLightingMood: (mood: LightingMood) => void;
  wallpaperTheme: WallpaperTheme;
  setWallpaperTheme: (theme: WallpaperTheme) => void;
  cameraView: CameraViewMode;
  setCameraView: (view: CameraViewMode) => void;
  soundscape: SoundscapeType;
  setSoundscape: (soundscape: SoundscapeType) => void;
  isLofiPlaying: boolean;
  toggleLofi: () => void;
  setLofiPlaying: (val: boolean) => void;
  isTerminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
}

export const useAtmosphereStore = create<AtmosphereState>((set) => ({
  lightingMood: "night",
  setLightingMood: (mood) => set({ lightingMood: mood }),
  wallpaperTheme: "obsidian",
  setWallpaperTheme: (theme) => set({ wallpaperTheme: theme }),
  cameraView: "screen",
  setCameraView: (view) => set({ cameraView: view }),
  soundscape: "none",
  setSoundscape: (soundscape) => set({ soundscape }),
  isLofiPlaying: false,
  toggleLofi: () => set((s) => ({ isLofiPlaying: !s.isLofiPlaying })),
  setLofiPlaying: (val) => set({ isLofiPlaying: val }),
  isTerminalOpen: false,
  setTerminalOpen: (open) => set({ isTerminalOpen: open }),
  toggleTerminal: () => set((s) => ({ isTerminalOpen: !s.isTerminalOpen }))
}));
