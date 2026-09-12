"use client";

import { create } from "zustand";

export type LightingMood = "night" | "golden" | "rain";
export type WallpaperTheme = "obsidian" | "sakura" | "sonoma" | "nordic";
export type CameraViewMode = "screen" | "desk" | "macbook";
export type SoundscapeType = "none" | "rain" | "lofi" | "study";
export type KeyboardSwitchType = "boba_u4t" | "gateron_yellow" | "cherry_blue";

export interface SwitchProfileInfo {
  id: KeyboardSwitchType;
  name: string;
  type: string;
  color: string;
  soundDescription: string;
}

export const SWITCH_PROFILES: Record<KeyboardSwitchType, SwitchProfileInfo> = {
  boba_u4t: {
    id: "boba_u4t",
    name: "Gazzew Boba U4T",
    type: "Tactile",
    color: "#D97706",
    soundDescription: "Deep Acoustic Thock"
  },
  gateron_yellow: {
    id: "gateron_yellow",
    name: "Gateron Milky Yellow Pro",
    type: "Linear",
    color: "#EAB308",
    soundDescription: "Creamy Smooth Pop"
  },
  cherry_blue: {
    id: "cherry_blue",
    name: "Cherry MX Blue",
    type: "Clicky",
    color: "#0284C7",
    soundDescription: "Crisp Tactile Click"
  }
};

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
  keyboardSwitch: KeyboardSwitchType;
  setKeyboardSwitch: (sw: KeyboardSwitchType) => void;
  isStickyNoteOpen: boolean;
  setStickyNoteOpen: (open: boolean) => void;
  toggleStickyNote: () => void;
  isAutoSkySync: boolean;
  toggleAutoSkySync: () => void;
  setAutoSkySync: (val: boolean) => void;
}

export const getSunSyncMood = (): { mood: LightingMood; label: string } => {
  try {
    const now = new Date();
    // Indian Standard Time for Chirag's Gandhinagar studio
    const istString = now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false, hour: "numeric" });
    const hour = parseInt(istString, 10);
    if (hour >= 5 && hour < 9) {
      return { mood: "golden", label: "🌅 Dawn (IST)" };
    } else if (hour >= 9 && hour < 17) {
      return { mood: "night", label: "☀️ Daylight (IST)" };
    } else if (hour >= 17 && hour < 20) {
      return { mood: "golden", label: "🌇 Golden Hour (IST)" };
    } else {
      return { mood: "night", label: "🌙 Night (IST)" };
    }
  } catch {
    return { mood: "night", label: "🌙 Night Studio" };
  }
};

export const useAtmosphereStore = create<AtmosphereState>((set, get) => ({
  lightingMood: getSunSyncMood().mood,
  setLightingMood: (mood) => set({ lightingMood: mood, isAutoSkySync: false }),
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
  toggleTerminal: () => set((s) => ({ isTerminalOpen: !s.isTerminalOpen })),
  keyboardSwitch: "boba_u4t",
  setKeyboardSwitch: (sw) => set({ keyboardSwitch: sw }),
  isStickyNoteOpen: false,
  setStickyNoteOpen: (open) => set({ isStickyNoteOpen: open }),
  toggleStickyNote: () => set((s) => ({ isStickyNoteOpen: !s.isStickyNoteOpen })),
  isAutoSkySync: true,
  toggleAutoSkySync: () => {
    const next = !get().isAutoSkySync;
    if (next) {
      const sync = getSunSyncMood();
      set({ isAutoSkySync: true, lightingMood: sync.mood });
    } else {
      set({ isAutoSkySync: false });
    }
  },
  setAutoSkySync: (val) => set({ isAutoSkySync: val })
}));
