import useFortunaProgressStore from "../stores/useFortunaProgressStore";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) {
    audioContext = new AudioContextClass();
  }
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function playTone(
  ctx: AudioContext,
  {
    frequency,
    endFrequency,
    startTime,
    duration,
    peakGain,
    type = "sine",
  }: {
    frequency: number;
    endFrequency?: number;
    startTime: number;
    duration: number;
    peakGain: number;
    type?: OscillatorType;
  }
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  if (endFrequency !== undefined) {
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);
  }

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + duration * 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.02);
}

function withSound(play: (ctx: AudioContext) => void) {
  if (!useFortunaProgressStore.getState().soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    play(ctx);
  } catch {
    // Synthesized SFX are a nice-to-have; never let audio failures break the flow.
  }
}

export function playCastSound() {
  withSound((ctx) => {
    playTone(ctx, {
      frequency: 880,
      endFrequency: 660,
      startTime: ctx.currentTime,
      duration: 0.15,
      peakGain: 0.15,
      type: "triangle",
    });
  });
}

export function playWinSound() {
  withSound((ctx) => {
    const now = ctx.currentTime;
    playTone(ctx, { frequency: 660, startTime: now, duration: 0.15, peakGain: 0.18 });
    playTone(ctx, { frequency: 990, startTime: now + 0.12, duration: 0.25, peakGain: 0.18 });
  });
}

export function playGoldenSound() {
  withSound((ctx) => {
    const now = ctx.currentTime;
    const notes = [660, 880, 1320];
    notes.forEach((frequency, i) => {
      const startTime = now + i * 0.2;
      playTone(ctx, { frequency, startTime, duration: 0.6, peakGain: 0.22 });
      playTone(ctx, { frequency: frequency * 1.0035, startTime, duration: 0.6, peakGain: 0.1 });
    });
  });
}

export function playWheelTickSound() {
  withSound((ctx) => {
    const now = ctx.currentTime;
    // A decelerating run of clicks, like a wheel of fortune ticker slowing to a stop.
    const gaps = [0, 0.09, 0.19, 0.31, 0.46, 0.64, 0.86, 1.12];
    gaps.forEach((offset) => {
      playTone(ctx, {
        frequency: 1200,
        endFrequency: 900,
        startTime: now + offset,
        duration: 0.04,
        peakGain: 0.12,
        type: "square",
      });
    });
  });
}

export function playOracleChimeSound() {
  withSound((ctx) => {
    const now = ctx.currentTime;
    const notes = [523, 784];
    notes.forEach((frequency, i) => {
      const startTime = now + i * 0.35;
      playTone(ctx, { frequency, startTime, duration: 0.9, peakGain: 0.16 });
      playTone(ctx, { frequency: frequency * 1.5, startTime: startTime + 0.05, duration: 0.8, peakGain: 0.08 });
    });
  });
}
