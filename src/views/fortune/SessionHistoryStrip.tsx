import useFortunaProgressStore from "../../stores/useFortunaProgressStore";
import headsCoin from "../../assets/Stater_Epeiros_Artermis_Heads.png";
import tailsCoin from "../../assets/Stater_Epeiros_Artermis_Tails.png";

const SLOT_COUNT = 5;

export const SessionHistoryStrip = () => {
  const history = useFortunaProgressStore((state) => state.history);

  if (history.length === 0) return null;

  const slots = Array.from({ length: SLOT_COUNT }, (_, i) => history[i] ?? null);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-faint">
        Recent Casts
      </div>
      <div className="flex gap-2.5">
        {slots.map((entry, i) =>
          entry ? (
            <img
              key={i}
              src={entry.result === "tails" ? tailsCoin : headsCoin}
              alt={entry.result}
              title={entry.result === "golden" ? "Golden Fortune" : entry.result === "heads" ? "Heads" : "Tails"}
              className={`h-[26px] w-[26px] rounded-full object-cover ${
                entry.result === "golden" ? "fortuna-coin--golden" : ""
              }`}
            />
          ) : (
            <div
              key={i}
              className="h-[26px] w-[26px] rounded-full border border-dashed border-[rgba(201,162,39,0.25)]"
            />
          )
        )}
      </div>
    </div>
  );
};
