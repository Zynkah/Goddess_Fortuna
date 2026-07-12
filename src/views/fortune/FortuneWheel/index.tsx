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
        className={`relative h-full w-full rounded-full border-[3px] border-fortuna-gold ${
          spinning ? "fortuna-wheel--spinning" : "fortuna-wheel"
        }`}
        style={{
          boxShadow:
            "0 0 30px rgba(230,195,77,0.35), inset 0 0 0 2px rgba(255,238,180,0.5), inset 0 0 16px rgba(40,28,8,0.65)",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-full">
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
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.45), transparent 55%)",
              mixBlendMode: "soft-light",
            }}
          />
        </div>

        {WHEEL_SEGMENTS.map((segment, i) => (
          <div
            key={`spoke-${segment.label}`}
            className="absolute left-1/2 top-1/2 origin-top rounded-full"
            style={{
              width: "3px",
              height: "50%",
              marginLeft: "-1.5px",
              background: "linear-gradient(to bottom, #fff3c4, #8a6a20)",
              transform: `rotate(${i * SEGMENT_ANGLE}deg)`,
              boxShadow: "0 0 2px rgba(0,0,0,0.5)",
            }}
          />
        ))}

        {WHEEL_SEGMENTS.map((segment, i) => (
          <div
            key={`knob-${segment.label}`}
            className="absolute left-1/2 top-1/2 h-[9px] w-[9px] rounded-full border border-fortuna-gold-light"
            style={{
              background: "radial-gradient(circle at 35% 30%, #fff3c4, #a9822f 70%)",
              boxShadow: "0 0 4px rgba(0,0,0,0.5)",
              transform: `translate(-50%, -50%) rotate(${i * SEGMENT_ANGLE}deg) translateY(-83px)`,
            }}
          />
        ))}

        <div
          className="absolute left-1/2 top-1/2 h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fortuna-gold-light"
          style={{
            background: "radial-gradient(circle at 35% 30%, #fff3c4 0%, #d9b34e 45%, #7a5f1e 100%)",
            boxShadow: "inset 0 0 6px rgba(40,28,8,0.7), 0 0 6px rgba(0,0,0,0.4)",
          }}
        />
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
