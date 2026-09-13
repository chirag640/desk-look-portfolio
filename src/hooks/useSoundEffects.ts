"use client";

import React, { useCallback } from "react";
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
  private tapeHissSource: AudioBufferSourceNode | null = null;
  private tapeHissGain: GainNode | null = null;
  private tapeCrackleInterval: NodeJS.Timeout | null = null;

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
    this.playMacSwoosh();
  }

  playMacSwoosh() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.06);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.14);

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }

  playMacPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
  }

  playMacMinimize() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  }

  playMacTrash() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {}
  }

  // Mechanical Keyboard Acoustic Switch Synthesis with Natural Pitch Modulation
  playThock(customSwitch?: string, keyName?: string) {
    const ctx = this.getContext();
    if (!ctx) return;
    const sw = customSwitch || (window as any)?.__KEYBOARD_SWITCH || "boba_u4t";
    const t = ctx.currentTime;

    // Organic keypress acoustic variance: ±8% subtle pitch randomness
    const variance = 0.94 + Math.random() * 0.12;
    const isSpace = keyName === " ";
    const isEnter = keyName === "Enter" || keyName === "Return";

    // Spacebar has deeper body resonance; Enter has crisper snap
    const keyPitchMultiplier = isSpace ? 0.8 : isEnter ? 1.08 : 1.0;
    const pMod = variance * keyPitchMultiplier;

    try {
      if (sw === "cherry_blue") {
        // High crisp tactile click snap
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(2400 * pMod, t);
        clickOsc.frequency.exponentialRampToValueAtTime(650 * pMod, t + 0.018);
        clickGain.gain.setValueAtTime(0.09, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(t + 0.025);

        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        bodyOsc.type = "triangle";
        bodyOsc.frequency.setValueAtTime(450 * pMod, t);
        bodyOsc.frequency.exponentialRampToValueAtTime(200 * pMod, t + 0.035);
        bodyGain.gain.setValueAtTime(isSpace ? 0.06 : 0.04, t);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        bodyOsc.connect(bodyGain);
        bodyGain.connect(ctx.destination);
        bodyOsc.start();
        bodyOsc.stop(t + 0.045);
      } else if (sw === "gateron_yellow") {
        // Creamy smooth butter thock
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(950 * pMod, t);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(420 * pMod, t);
        osc.frequency.exponentialRampToValueAtTime(140 * pMod, t + 0.04);
        gain.gain.setValueAtTime(isSpace ? 0.1 : 0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(t + 0.05);
      } else {
        // Boba U4T - Deep heavy acoustic wooden thock
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(480 * pMod, t);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(140 * pMod, t);
        osc.frequency.exponentialRampToValueAtTime(42 * pMod, t + 0.06);
        gain.gain.setValueAtTime(isSpace ? 0.15 : 0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(t + 0.075);
      }
    } catch {}
  }

  // Paper rustle sound for Post-it sticky note
  playPaperRustle() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.09);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(320, t);
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(t + 0.11);
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

  startTapeWarmth() {
    const ctx = this.getContext();
    if (!ctx) return;
    this.stopTapeWarmth();

    try {
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.11;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2200, ctx.currentTime);
      bandpass.Q.setValueAtTime(0.75, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 1.2);

      noiseSource.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
      this.tapeHissSource = noiseSource;
      this.tapeHissGain = gain;

      const playCracklePop = () => {
        const curCtx = this.getContext();
        if (!curCtx) return;
        try {
          const t = curCtx.currentTime;
          const osc = curCtx.createOscillator();
          const popGain = curCtx.createGain();
          const popFilter = curCtx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(3200 + Math.random() * 2400, t);
          popFilter.type = "highpass";
          popFilter.frequency.setValueAtTime(2500, t);

          const vol = 0.012 + Math.random() * 0.024;
          popGain.gain.setValueAtTime(vol, t);
          popGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015);

          osc.connect(popFilter);
          popFilter.connect(popGain);
          popGain.connect(curCtx.destination);

          osc.start(t);
          osc.stop(t + 0.02);
        } catch {}
      };

      this.tapeCrackleInterval = setInterval(() => {
        if (Math.random() > 0.35) {
          playCracklePop();
        }
      }, 550);
    } catch {}
  }

  stopTapeWarmth() {
    if (this.tapeCrackleInterval) {
      clearInterval(this.tapeCrackleInterval);
      this.tapeCrackleInterval = null;
    }
    if (this.tapeHissGain && this.ctx) {
      try {
        this.tapeHissGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
      } catch {}
    }
    setTimeout(() => {
      if (this.tapeHissSource) {
        try {
          this.tapeHissSource.stop();
          this.tapeHissSource.disconnect();
        } catch {}
        this.tapeHissSource = null;
      }
      this.tapeHissGain = null;
    }, 450);
  }
}

export const audioEngine = new AudioEngine();

export function useSoundEffects() {
  const { soundEnabled } = useSoundStore();

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playClick();
  }, [soundEnabled]);

  const playWindowOpen = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playWindowOpen();
  }, [soundEnabled]);

  const playMacSwoosh = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playMacSwoosh();
  }, [soundEnabled]);

  const playMacPop = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playMacPop();
  }, [soundEnabled]);

  const playMacMinimize = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playMacMinimize();
  }, [soundEnabled]);

  const playMacTrash = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playMacTrash();
  }, [soundEnabled]);

  const playThock = useCallback((customSwitch?: string, keyName?: string) => {
    if (!soundEnabled) return;
    audioEngine.playThock(customSwitch, keyName);
  }, [soundEnabled]);

  const playMug = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playMug();
  }, [soundEnabled]);

  const playPaperRustle = useCallback(() => {
    if (!soundEnabled) return;
    audioEngine.playPaperRustle();
  }, [soundEnabled]);

  const startTapeWarmth = useCallback(() => {
    audioEngine.startTapeWarmth();
  }, []);

  const stopTapeWarmth = useCallback(() => {
    audioEngine.stopTapeWarmth();
  }, []);

  return {
    playClick,
    playWindowOpen,
    playMacSwoosh,
    playMacPop,
    playMacMinimize,
    playMacTrash,
    playThock,
    playMug,
    playPaperRustle,
    startTapeWarmth,
    stopTapeWarmth,
    soundEnabled
  };
}
