import { FC, useState } from "react";
import useGoddessQuestionStore from "../../stores/useGoddessQuestionStore";
import useFortunaProgressStore from "../../stores/useFortunaProgressStore";
import { AskStep } from "./AskStep";
import { CastStep } from "./CastStep";
import { RevealStep } from "./RevealStep";

const GOLD = "var(--fortuna-gold-light)";
const GOLD_FAINT = "var(--fortuna-gold-faint)";

export const FortuneView: FC = () => {
  const { question, setQuestion } = useGoddessQuestionStore();
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [isGolden, setIsGolden] = useState(false);

  const reset = () => {
    setQuestion("");
    setIsWin(null);
    setIsGolden(false);
    setStep(0);
  };

  const goToStep = (target: 0 | 1 | 2) => {
    if (target >= step) return;
    if (target < 2) {
      setIsWin(null);
      setIsGolden(false);
    }
    setStep(target);
  };

  const steps: { index: 0 | 1 | 2; label: string }[] = [
    { index: 0, label: "01 Ask" },
    { index: 1, label: "02 Cast" },
    { index: 2, label: "03 Reveal" },
  ];

  return (
    <div className="fortuna-stage flex min-h-[calc(100vh-73px)] flex-col">
      <main className="flex flex-1 items-start justify-center px-5 pb-20 pt-[clamp(24px,5vw,56px)]">
        <div className="w-full max-w-[480px]">
          <div className="mb-8 flex items-center justify-center gap-4 font-cinzel text-[10px] uppercase tracking-[3px]">
            {steps.map(({ index, label }, i) => {
              const isCompleted = index < step;
              return (
                <span key={index} className="flex items-center gap-4">
                  {isCompleted ? (
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      className="cursor-pointer border-b border-transparent pb-0.5 transition-colors duration-150 hover:border-fortuna-gold-light"
                      style={{ color: GOLD_FAINT }}
                    >
                      {label}
                    </button>
                  ) : (
                    <span style={{ color: index === step ? GOLD : GOLD_FAINT }}>{label}</span>
                  )}
                  {i < steps.length - 1 && <span style={{ color: GOLD_FAINT }}>—</span>}
                </span>
              );
            })}
          </div>

          <div className="fortuna-card">
            {step === 0 && <AskStep onProceed={() => setStep(1)} />}
            {step === 1 && (
              <CastStep
                onBack={() => setStep(0)}
                onCastComplete={(result, golden) => {
                  setIsWin(result);
                  setIsGolden(golden);
                  useFortunaProgressStore.getState().recordCast({ isWin: result, isGolden: golden });
                  setStep(2);
                }}
              />
            )}
            {step === 2 && <RevealStep isWin={isWin} isGolden={isGolden} onReset={reset} />}
          </div>
        </div>
      </main>
    </div>
  );
};
