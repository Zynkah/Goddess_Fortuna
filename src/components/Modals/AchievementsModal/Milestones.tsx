import useFortunaProgressStore from "../../../stores/useFortunaProgressStore";
import { ACHIEVEMENTS } from "../../../utils/fortunaAchievements";

export const Milestones = () => {
  const unlockedAchievements = useFortunaProgressStore((s) => s.unlockedAchievements);

  return (
    <div>
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-dim">
        Milestones — {unlockedAchievements.length}/{ACHIEVEMENTS.length}
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {ACHIEVEMENTS.map((achievement) => {
          const unlocked = unlockedAchievements.includes(achievement.id);
          return (
            <div
              key={achievement.id}
              className={`flex items-center justify-between gap-3 border px-3 py-2.5 text-left ${
                unlocked
                  ? "border-fortuna-gold bg-[rgba(201,162,39,0.08)]"
                  : "border-[rgba(201,162,39,0.15)] opacity-50"
              }`}
            >
              <div>
                <div className="font-cinzel text-xs tracking-[1px] text-fortuna-gold-light">
                  {achievement.title.toUpperCase()}
                </div>
                <div className="text-[11px] text-fortuna-gold-dim">{achievement.description}</div>
              </div>
              <span className="shrink-0 text-lg">{unlocked ? "✓" : "🔒"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
