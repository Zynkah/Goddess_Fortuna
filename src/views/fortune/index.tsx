import { FC, useState } from "react";
import useGoddessQuestionStore from "../../stores/useGoddessQuestionStore";
import { AskStep } from "./AskStep";
import { CastStep } from "./CastStep";
import { RevealStep } from "./RevealStep";

const GOLD = "#e8d5a0";
const GOLD_FAINT = "#6f6034";

const HOW_IT_WORKS = [
  "Ask Fortuna a question.",
  "Cast her coin — it's free, no wallet or payment needed.",
  "See whether fortune favours you, and leave an optional USDC offering if you'd like.",
];

export const FortuneView: FC = () => {
  const { question, setQuestion } = useGoddessQuestionStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const reset = () => {
    setQuestion("");
    setIsWin(null);
    setStep(0);
  };

  return (
    <div className="fortuna-stage flex min-h-[calc(100vh-73px)] flex-col">
      <main className="flex flex-1 items-start justify-center px-5 pb-20 pt-[clamp(24px,5vw,56px)]">
        <div className="w-full max-w-[480px]">
          <div className="mb-8 flex items-center justify-center gap-4  text-[10px] uppercase tracking-[3px]">
            <span style={{ color: step === 0 ? GOLD : GOLD_FAINT }}>01 Ask</span>
            <span style={{ color: GOLD_FAINT }}>—</span>
            <span style={{ color: step === 1 ? GOLD : GOLD_FAINT }}>02 Cast</span>
            <span style={{ color: GOLD_FAINT }}>—</span>
            <span style={{ color: step === 2 ? GOLD : GOLD_FAINT }}>03 Reveal</span>
          </div>

          <div className="fortuna-card">
            {step === 0 && <AskStep onProceed={() => setStep(1)} />}
            {step === 1 && (
              <CastStep
                onBack={() => setStep(0)}
                onCastComplete={(result) => {
                  setIsWin(result);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && <RevealStep isWin={isWin} onReset={reset} />}
          </div>

          <div className="mt-6 text-center">
            <span
              onClick={() => setShowHowItWorks((current) => !current)}
              role="button"
              className="cursor-pointer  text-[10px] uppercase tracking-[3px] text-[#6f6034] hover:text-[#8a7a52]"
            >
              How it works {showHowItWorks ? "▲" : "▼"}
            </span>
            {showHowItWorks && (
              <ol className="mx-auto mt-4 max-w-[420px] list-decimal space-y-2 pl-5 text-left  text-xs text-[#8a7a52]">
                {HOW_IT_WORKS.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
