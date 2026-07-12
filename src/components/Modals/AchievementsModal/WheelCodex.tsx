import useFortunaProgressStore from "../../../stores/useFortunaProgressStore";
import { ALL_WHEEL_TIERS, wheelPhraseKey } from "../../../utils/fortunaWheelTiers";

export const WheelCodex = () => {
  const unlockedWheelPhrases = useFortunaProgressStore((s) => s.unlockedWheelPhrases);
  const totalPhrases = ALL_WHEEL_TIERS.reduce((sum, tier) => sum + tier.phrases.length, 0);

  return (
    <div>
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-dim">
        Wheel Codex — {unlockedWheelPhrases.length}/{totalPhrases}
      </div>
      <div className="mt-3 flex flex-col gap-5">
        {ALL_WHEEL_TIERS.map((tier) => {
          const unlockedCount = tier.phrases.filter((phrase) =>
            unlockedWheelPhrases.includes(wheelPhraseKey(tier.id, phrase))
          ).length;

          return (
            <div key={tier.id}>
              <div className="flex items-center justify-between">
                <div className="font-cinzel text-xs tracking-[1px] text-fortuna-gold-light">
                  {tier.emoji} {tier.label.toUpperCase()}
                </div>
                <div className="text-[11px] text-fortuna-gold-faint">
                  {unlockedCount}/{tier.phrases.length}
                </div>
              </div>
              <div className="mt-1 font-garamond text-[11px] italic text-fortuna-gold-dim">{tier.meaning}</div>
              <ul className="mt-2 flex flex-col gap-1">
                {tier.phrases.map((phrase) => {
                  const unlocked = unlockedWheelPhrases.includes(wheelPhraseKey(tier.id, phrase));
                  return (
                    <li
                      key={phrase}
                      className={`font-garamond text-sm italic ${
                        unlocked ? "text-fortuna-gold-soft" : "text-fortuna-gold-faint opacity-40"
                      }`}
                    >
                      {unlocked ? `"${phrase}"` : "· · · · · · · · · · · ·"}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};
