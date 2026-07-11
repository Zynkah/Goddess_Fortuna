import { SEGMENT_ANGLE, SEGMENT_COLORS } from "./constants";
import { WHEEL_SEGMENTS } from "./data";
import { FortuneWheelProps } from "./types";

// Order matters — wedges are laid out in this sequence starting at 12
// o'clock, going clockwise. Top 4 of 8 are favorable, matching the coin's
// 50% base win rate; only "Great Fortune" can roll golden.

export const FortuneWheel = ({ rotation, spinning }: FortuneWheelProps) => {
  return (
    <div className="relative h-[160px] w-[160px]">
      <div
        className={`h-full w-full overflow-hidden rounded-full border-[3px] border-fortuna-gold ${
          spinning ? "fortuna-wheel--spinning" : "fortuna-wheel"
        }`}
        style={{
          boxShadow: "0 0 30px rgba(230,195,77,0.35)",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {WHEEL_SEGMENTS.map((segment, i) => (
          <div
            key={segment.label}
            className="absolute inset-0"
            style={{
              clipPath: "polygon(50% 50%, 50% 0%, 100% 0%)",
              transform: `rotate(${i * SEGMENT_ANGLE}deg)`,
              background: SEGMENT_COLORS[i],
            }}
          />
        ))}
      </div>
      <div
        className="absolute -top-[10px] left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: "14px solid var(--fortuna-gold-light)",
        }}
      />
    </div>
  );
};
