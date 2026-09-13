"use client";

import { create } from "zustand";
import { useAtmosphereStore } from "./useAtmosphereStore";

export type FinderTab = "about" | "tech" | "projects" | "history" | "resume" | "contact";
export type WindowId = "finder" | "terminal" | "music" | "notes";

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowManagerStore {
  windows: Record<WindowId, WindowState>;
  activeWindow: WindowId | null;
  finderTab: FinderTab;
  isControlCenterOpen: boolean;
  isAppleMenuOpen: boolean;
  isSpotlightOpen: boolean;
  isMissionControlOpen: boolean;
  isLocked: boolean;
  highestZIndex: number;

  // Actions
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  toggleWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  setFinderTab: (tab: FinderTab) => void;
  toggleControlCenter: () => void;
  closeControlCenter: () => void;
  toggleAppleMenu: () => void;
  closeAppleMenu: () => void;
  toggleSpotlight: () => void;
  closeSpotlight: () => void;
  toggleMissionControl: () => void;
  closeMissionControl: () => void;
  lockScreen: () => void;
  unlockScreen: () => void;
  closeAllMenus: () => void;
}

export const useWindowManager = create<WindowManagerStore>((set, get) => ({
  windows: {
    finder: { isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    terminal: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 9 },
    music: { isOpen: true, isMinimized: false, isMaximized: false, zIndex: 8 },
    notes: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 7 }
  },
  activeWindow: "finder",
  finderTab: "about",
  isControlCenterOpen: false,
  isAppleMenuOpen: false,
  isSpotlightOpen: false,
  isMissionControlOpen: false,
  isLocked: false,
  highestZIndex: 10,

  openWindow: (id: WindowId) => {
    const { highestZIndex, windows } = get();
    const nextZ = highestZIndex + 1;
    if (id === "terminal") {
      useAtmosphereStore.getState().setTerminalOpen(true);
    } else if (id === "notes") {
      useAtmosphereStore.getState().setStickyNoteOpen(true);
    }
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isOpen: true, isMinimized: false, zIndex: nextZ }
      },
      activeWindow: id,
      highestZIndex: nextZ,
      isControlCenterOpen: false,
      isAppleMenuOpen: false
    });
  },

  closeWindow: (id: WindowId) => {
    const { windows, activeWindow } = get();
    if (id === "terminal") {
      useAtmosphereStore.getState().setTerminalOpen(false);
    } else if (id === "notes") {
      useAtmosphereStore.getState().setStickyNoteOpen(false);
    }
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isOpen: false, isMinimized: false }
      },
      activeWindow: activeWindow === id ? null : activeWindow
    });
  },

  minimizeWindow: (id: WindowId) => {
    const { windows, activeWindow } = get();
    if (id === "terminal") {
      useAtmosphereStore.getState().setTerminalOpen(false);
    } else if (id === "notes") {
      useAtmosphereStore.getState().setStickyNoteOpen(false);
    }
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMinimized: true }
      },
      activeWindow: activeWindow === id ? null : activeWindow
    });
  },

  maximizeWindow: (id: WindowId) => {
    const { windows } = get();
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], isMaximized: !windows[id].isMaximized }
      }
    });
  },

  toggleWindow: (id: WindowId) => {
    const { windows, openWindow, minimizeWindow } = get();
    if (!windows[id].isOpen || windows[id].isMinimized) {
      openWindow(id);
    } else {
      minimizeWindow(id);
    }
  },

  focusWindow: (id: WindowId) => {
    const { highestZIndex, windows } = get();
    const nextZ = highestZIndex + 1;
    set({
      windows: {
        ...windows,
        [id]: { ...windows[id], zIndex: nextZ, isMinimized: false }
      },
      activeWindow: id,
      highestZIndex: nextZ
    });
  },

  setFinderTab: (tab: FinderTab) => {
    const { openWindow, focusWindow } = get();
    openWindow("finder");
    focusWindow("finder");
    set({ finderTab: tab });
  },

  toggleControlCenter: () =>
    set((state) => ({
      isControlCenterOpen: !state.isControlCenterOpen,
      isAppleMenuOpen: false,
      isSpotlightOpen: false
    })),

  closeControlCenter: () => set({ isControlCenterOpen: false }),

  toggleAppleMenu: () =>
    set((state) => ({
      isAppleMenuOpen: !state.isAppleMenuOpen,
      isControlCenterOpen: false,
      isSpotlightOpen: false
    })),

  closeAppleMenu: () => set({ isAppleMenuOpen: false }),

  toggleSpotlight: () =>
    set((state) => ({
      isSpotlightOpen: !state.isSpotlightOpen,
      isControlCenterOpen: false,
      isAppleMenuOpen: false
    })),

  closeSpotlight: () => set({ isSpotlightOpen: false }),

  toggleMissionControl: () =>
    set((state) => ({
      isMissionControlOpen: !state.isMissionControlOpen,
      isControlCenterOpen: false,
      isAppleMenuOpen: false,
      isSpotlightOpen: false
    })),

  closeMissionControl: () => set({ isMissionControlOpen: false }),

  lockScreen: () =>
    set({
      isLocked: true,
      isControlCenterOpen: false,
      isAppleMenuOpen: false,
      isSpotlightOpen: false,
      isMissionControlOpen: false
    }),

  unlockScreen: () => set({ isLocked: false }),

  closeAllMenus: () =>
    set({
      isControlCenterOpen: false,
      isAppleMenuOpen: false,
      isSpotlightOpen: false
    })
}));

