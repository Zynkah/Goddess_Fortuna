import useFortunaProgressStore from "../../stores/useFortunaProgressStore";
import { getLevelInfo } from "../../utils/fortunaLeveling";

export const ProgressHeader = () => {
  const { streakCount, totalXp } = useFortunaProgressStore();
  const { level, title, nextTitle, xpIntoLevel, xpNeededForNext } = getLevelInfo(totalXp);
  const progressPct = Math.min(100, Math.round((xpIntoLevel / xpNeededForNext) * 100));

  return (
    <div className="flex flex-col items-center gap-4">
      {streakCount > 0 && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="inline-flex items-center gap-2 rounded-full border border-fortuna-gold bg-[rgba(201,162,39,0.1)] px-4 py-1.5">
            <span className="text-fortuna-gold-bright">◆</span>
            <span className="font-cinzel text-xs tracking-[1px] text-fortuna-gold-light">
              {streakCount}-DAY STREAK
            </span>
          </div>
          <div className="font-garamond text-sm italic text-fortuna-gold-dim">
            Fortune favours the faithful — return tomorrow to keep it alive.
          </div>
        </div>
      )}

      <div className="w-full max-w-[300px]">
        <div className="text-center font-cinzel text-xs tracking-[2px] text-fortuna-gold-light">
          {title.toUpperCase()} · LVL {level}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(201,162,39,0.15)]">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: "linear-gradient(90deg, var(--fortuna-gold-dim), var(--fortuna-gold-bright))",
            }}
          />
        </div>
        <div className="mt-2 text-center font-garamond text-xs italic text-fortuna-gold-faint">
          {xpIntoLevel} / {xpNeededForNext} XP to {nextTitle}
        </div>
      </div>
    </div>
  );
};
