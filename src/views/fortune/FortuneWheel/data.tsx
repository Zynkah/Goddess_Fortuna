import { WheelSegment } from "./types";

export const WHEEL_SEGMENTS: WheelSegment[] = [
  { label: "Great Fortune", isWin: true, goldenEligible: true },
  { label: "Good Fortune", isWin: true, goldenEligible: false },
  { label: "Favorable Winds", isWin: true, goldenEligible: false },
  { label: "Uncertain", isWin: false, goldenEligible: false },
  { label: "Delay", isWin: false, goldenEligible: false },
  { label: "Misfortune", isWin: false, goldenEligible: false },
  { label: "Fate Changes", isWin: false, goldenEligible: false },
  { label: "Destiny Calls", isWin: true, goldenEligible: false },
];

