"use client";

import { create } from "zustand";

export type PlaylistId = "retro_hindi" | "english_chill";

export interface PlaylistInfo {
  id: PlaylistId;
  youtubePlaylistId: string;
  seedVideoId?: string;
  name: string;
  subtitle: string;
  genre: string;
  badge: string;
  themeColor: string;
  accentGradient: string;
}

export const PLAYLISTS: Record<PlaylistId, PlaylistInfo> = {
  retro_hindi: {
    id: "retro_hindi",
    youtubePlaylistId: "PLATce24UvTGZJyV1IjeRTz1Ns1Z5vyWMJ",
    name: "Vintage Bollywood Classics",
    subtitle: "Kishore Kumar, Mohammed Rafi, Lata Mangeshkar, R.D. Burman",
    genre: "Retro Hindi Classics",
    badge: "📻 70s-90s Classics",
    themeColor: "#F59E0B",
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent"
  },
  english_chill: {
    id: "english_chill",
    youtubePlaylistId: "PL_iDgCGOAYHPgBh1nzIdTSGNdFhpmuiRL",
    seedVideoId: "zG5YzRxOcsI",
    name: "English Melodic Chill",
    subtitle: "Acoustic Pop, Soft Melodies & Cozy Chill Hits",
    genre: "English Melodic Chill",
    badge: "🎧 English Chill",
    themeColor: "#38BDF8",
    accentGradient: "from-sky-500/20 via-blue-500/10 to-transparent"
  }
};

interface MusicStoreState {
  activePlaylist: PlaylistId;
  isPlaying: boolean;
  isPlayerOpen: boolean;
  isMinimized: boolean;
  showVideoDrawer: boolean;
  volume: number;
  isMuted: boolean;
  currentTrackTitle: string;
  userHasInteracted: boolean;
  
  // Actions
  togglePlay: () => void;
  setIsPlaying: (val: boolean) => void;
  switchPlaylist: (playlist: PlaylistId) => void;
  togglePlayerOpen: () => void;
  setPlayerOpen: (open: boolean) => void;
  toggleMinimize: () => void;
  toggleVideoDrawer: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setCurrentTrackTitle: (title: string) => void;
  setUserHasInteracted: (val: boolean) => void;
  
  // Player control triggers (subscribed by the player component)
  commandTrigger: {
    type: "none" | "play" | "pause" | "next" | "prev" | "switch";
    timestamp: number;
  };
  triggerPlay: () => void;
  triggerPause: () => void;
  triggerNext: () => void;
  triggerPrev: () => void;
}

export const useMusicStore = create<MusicStoreState>((set, get) => ({
  activePlaylist: "retro_hindi",
  isPlaying: false,
  isPlayerOpen: true, // Pop appears on startup as requested
  isMinimized: false,
  showVideoDrawer: false,
  volume: 80,
  isMuted: false,
  currentTrackTitle: "Vintage Bollywood Classics (70s-90s)",
  userHasInteracted: false,

  togglePlay: () => {
    const nextState = !get().isPlaying;
    set({ isPlaying: nextState, userHasInteracted: true });
    if (nextState) {
      get().triggerPlay();
    } else {
      get().triggerPause();
    }
  },

  setIsPlaying: (val) => set({ isPlaying: val }),

  switchPlaylist: (playlist) => {
    set({
      activePlaylist: playlist,
      currentTrackTitle: PLAYLISTS[playlist].name,
      userHasInteracted: true,
      commandTrigger: { type: "switch", timestamp: Date.now() }
    });
  },

  togglePlayerOpen: () => set((s) => ({ isPlayerOpen: !s.isPlayerOpen })),
  setPlayerOpen: (open) => set({ isPlayerOpen: open }),
  toggleMinimize: () => set((s) => ({ isMinimized: !s.isMinimized })),
  toggleVideoDrawer: () => set((s) => ({ showVideoDrawer: !s.showVideoDrawer })),
  
  setVolume: (vol) => set({ volume: Math.max(0, Math.min(100, vol)), isMuted: vol === 0 }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setCurrentTrackTitle: (title) => set({ currentTrackTitle: title }),
  setUserHasInteracted: (val) => set({ userHasInteracted: val }),

  commandTrigger: { type: "none", timestamp: 0 },
  triggerPlay: () => set({ commandTrigger: { type: "play", timestamp: Date.now() } }),
  triggerPause: () => set({ commandTrigger: { type: "pause", timestamp: Date.now() } }),
  triggerNext: () => set({ commandTrigger: { type: "next", timestamp: Date.now() } }),
  triggerPrev: () => set({ commandTrigger: { type: "prev", timestamp: Date.now() } })
}));
