import { useState } from "react";
import useGoddessQuestionStore from "../../stores/useGoddessQuestionStore";
import { FORTUNA_GHOST_BUTTON_CLASS, FORTUNA_PRIMARY_BUTTON_CLASS } from "./buttonStyles";
import { playCastSound } from "../../utils/fortunaSfx";

const GOLDEN_FORTUNE_CHANCE = 0.08;

interface CastStepProps {
  onBack: () => void;
  onCastComplete: (isWin: boolean, isGolden: boolean) => void;
}

export const CastStep = ({ onBack, onCastComplete }: CastStepProps) => {
  const { question } = useGoddessQuestionStore();
  const [isCasting, setIsCasting] = useState(false);

  const handleCast = () => {
    setIsCasting(true);
    playCastSound();
    const isWin = Math.random() < 0.5;
    const isGolden = isWin && Math.random() < GOLDEN_FORTUNE_CHANCE;
    setTimeout(() => onCastComplete(isWin, isGolden), 1200);
  };

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      <div className="font-cinzel text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
        Your Question
      </div>
      <div className="mx-auto mb-2 mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />
      <div className="font-garamond text-xl italic text-fortuna-gold-dimmer">
        "{question.trim() ? question : "Will I find what I seek?"}"
      </div>

      <div className="my-10 font-garamond text-base italic text-fortuna-gold-dim">
        Fortuna is ready to cast her coin — free, no wallet required.
      </div>

      <button
        type="button"
        onClick={handleCast}
        disabled={isCasting}
        className={`mt-8 w-full px-8 py-4 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
      >
        {isCasting ? "CASTING…" : "CAST THE COIN"}
      </button>
      <button
        type="button"
        onClick={onBack}
        className={`mt-4 block w-full text-center ${FORTUNA_GHOST_BUTTON_CLASS}`}
      >
        ← Change question
      </button>
    </div>
  );
};
