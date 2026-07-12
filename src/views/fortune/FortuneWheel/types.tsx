export interface WheelSegment {
  label: string;
  isWin: boolean;
  goldenEligible: boolean;
}

export interface FortuneWheelProps {
  rotation: number;
  spinning: boolean;
}