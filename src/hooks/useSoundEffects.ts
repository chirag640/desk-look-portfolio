"use client";

import { create } from "zustand";

interface SoundStore {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSound: (val: boolean) => void;
}

export const useSoundStore = create<SoundStore>((set) => ({
  soundEnabled: false,
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  setSound: (val) => set({ soundEnabled: val })
}));

// Global Web Audio Singleton
class AudioEngine {
  private ctx: AudioContext | null = null;
  private rainNode: AudioNode | null = null;
  private lofiInterval: NodeJS.Timeout | null = null;
  private activeLofiNodes: OscillatorNode[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  playWindowOpen() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  }

  // Mechanical Keyboard "Thock" Click
  playThock() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      // Low body thock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(65, t + 0.045);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(t + 0.055);

      // High tactile click snap
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = "sine";
      snapOsc.frequency.setValueAtTime(1200, t);
      snapOsc.frequency.exponentialRampToValueAtTime(450, t + 0.015);
      snapGain.gain.setValueAtTime(0.03, t);
      snapGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);
      snapOsc.start();
      snapOsc.stop(t + 0.025);
    } catch {}
  }

  // Ceramic Mug Tap / Sip Sound
  playMug() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {}
  }

  // Ambient Rain Generator using White/Pink Noise Buffer
  startRain() {
    const ctx = this.getContext();
    if (!ctx || this.rainNode) return;
    try {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise approximation
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 750;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.025, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.rainNode = noise;
    } catch {}
  }

  stopRain() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioScheduledSourceNode).stop();
      } catch {}
      this.rainNode = null;
    }
  }

  // Generative Lofi Chill Chord Progression (Dmaj7 -> Bm7 -> Gmaj7 -> A7sus4)
  startLofi() {
    const ctx = this.getContext();
    if (!ctx || this.lofiInterval) return;

    const chords = [
      [146.83, 220.0, 277.18, 329.63], // Dmaj7
      [123.47, 185.0, 220.0, 293.66],  // Bm7
      [98.0, 146.83, 196.0, 246.94],   // Gmaj7
      [110.0, 164.81, 220.0, 293.66]   // A7sus4
    ];

    let chordIdx = 0;

    const playChord = () => {
      const currentCtx = this.getContext();
      if (!currentCtx) return;

      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq) => {
        try {
          const osc = currentCtx.createOscillator();
          const gain = currentCtx.createGain();
          const filter = currentCtx.createBiquadFilter();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(650, currentCtx.currentTime);

          // Soft attack, warm sustain, gentle release
          const t = currentCtx.currentTime;
          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.018, t + 0.4);
          gain.gain.exponentialRampToValueAtTime(0.0005, t + 2.8);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(currentCtx.destination);

          osc.start(t);
          osc.stop(t + 2.9);
          this.activeLofiNodes.push(osc);
        } catch {}
      });
    };

    playChord();
    this.lofiInterval = setInterval(playChord, 3000);
  }

  stopLofi() {
    if (this.lofiInterval) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }
    this.activeLofiNodes.forEach((node) => {
      try {
        node.stop();
      } catch {}
    });
    this.activeLofiNodes = [];
  }
}

export const audioEngine = new AudioEngine();

export function useSoundEffects() {
  const { soundEnabled } = useSoundStore();

  const playClick = () => {
    if (!soundEnabled) return;
    audioEngine.playClick();
  };

  const playWindowOpen = () => {
    if (!soundEnabled) return;
    audioEngine.playWindowOpen();
  };

  const playThock = () => {
    if (!soundEnabled) return;
    audioEngine.playThock();
  };

  const playMug = () => {
    if (!soundEnabled) return;
    audioEngine.playMug();
  };

  return {
    playClick,
    playWindowOpen,
    playThock,
    playMug,
    soundEnabled
  };
}
