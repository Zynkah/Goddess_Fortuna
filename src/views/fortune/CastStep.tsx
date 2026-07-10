import { useState } from "react";
import useGoddessQuestionStore from "../../stores/useGoddessQuestionStore";

interface CastStepProps {
  onBack: () => void;
  onCastComplete: (isWin: boolean) => void;
}

export const CastStep = ({ onBack, onCastComplete }: CastStepProps) => {
  const { question } = useGoddessQuestionStore();
  const [isCasting, setIsCasting] = useState(false);

  const handleCast = () => {
    if (isCasting) return;
    setIsCasting(true);
    const isWin = Math.random() < 0.5;
    setTimeout(() => onCastComplete(isWin), 1200);
  };

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      <div className=" text-[10px] uppercase tracking-[4px] text-[#8a7a52]">
        Your Question
      </div>
      <div className="mx-auto mb-2 mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />
      <div className="text-lg italic text-[#8f7c48]">
        "{question.trim() ? question : "Will I find what I seek?"}"
      </div>

      <div className="my-10 text-sm italic text-[#8a7a52]">
        Fortuna is ready to cast her coin — free, no wallet required.
      </div>

      <div
        onClick={handleCast}
        role="button"
        className={`mt-8 text-center border border-[#c9a227] bg-[rgba(201,162,39,0.06)] p-4  text-sm tracking-[4px] text-[#e8d5a0] ${
          isCasting ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
      >
        {isCasting ? "CASTING…" : "CAST THE COIN"}
      </div>
      <div
        onClick={onBack}
        role="button"
        className="mt-4 cursor-pointer text-center  text-[10px] uppercase tracking-[3px] text-[#6f6034]"
      >
        ← Change question
      </div>
    </div>
  );
};
