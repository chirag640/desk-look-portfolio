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

  // Mechanical Keyboard Acoustic Switch Synthesis
  playThock(customSwitch?: string) {
    const ctx = this.getContext();
    if (!ctx) return;
    const sw = customSwitch || (window as any)?.__KEYBOARD_SWITCH || "boba_u4t";
    const t = ctx.currentTime;

    try {
      if (sw === "cherry_blue") {
        // High crisp tactile click snap
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(2400, t);
        clickOsc.frequency.exponentialRampToValueAtTime(650, t + 0.018);
        clickGain.gain.setValueAtTime(0.09, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(t + 0.025);

        const bodyOsc = ctx.createOscillator();
        const bodyGain = ctx.createGain();
        bodyOsc.type = "triangle";
        bodyOsc.frequency.setValueAtTime(450, t);
        bodyOsc.frequency.exponentialRampToValueAtTime(200, t + 0.035);
        bodyGain.gain.setValueAtTime(0.04, t);
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
        filter.frequency.setValueAtTime(950, t);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(140, t + 0.04);
        gain.gain.setValueAtTime(0.08, t);
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
        filter.frequency.setValueAtTime(480, t);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(140, t);
        osc.frequency.exponentialRampToValueAtTime(42, t + 0.06);
        gain.gain.setValueAtTime(0.12, t);
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

  const playThock = (customSwitch?: string) => {
    if (!soundEnabled) return;
    audioEngine.playThock(customSwitch);
  };

  const playMug = () => {
    if (!soundEnabled) return;
    audioEngine.playMug();
  };

  const playPaperRustle = () => {
    if (!soundEnabled) return;
    audioEngine.playPaperRustle();
  };

  return {
    playClick,
    playWindowOpen,
    playThock,
    playMug,
    playPaperRustle,
    soundEnabled
  };
}
