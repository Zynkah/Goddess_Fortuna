import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import useGoddessQuestionStore, { FortunaMode } from "../../../stores/useGoddessQuestionStore";
import coinImage from "../../../assets/Goddess-Fortuna-Coin.jpg";
import wheelImage from "../../../assets/Goddess-Fortuna-Wheel.webp";
import oracleImage from "../../../assets/Goddess-Fortuna-Oracle.jpg";
import { FORTUNA_PRIMARY_BUTTON_CLASS } from "../../../styles/buttonStyles";

interface AskStepProps {
  onProceed: () => void;
}

const HEADING_BY_MODE = {
  coin: "Ask Fortuna a question",
  wheel: "Spin to see what she reveals",
  oracle: "Seek a word of counsel",
};

const MODE_ORDER: FortunaMode[] = ["coin", "wheel", "oracle"];
const TITLE_BY_MODE: Record<FortunaMode, string> = {
  coin: "The Coin",
  wheel: "The Wheel",
  oracle: "The Oracle",
};
const IMAGE_BY_MODE: Record<FortunaMode, string> = {
  coin: coinImage,
  wheel: wheelImage,
  oracle: oracleImage,
};

// Signed distance from the active card, wrapped around the deck so cycling
// past the last mode continues onto the first rather than dead-ending.
function getOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

export const AskStep = ({ onProceed }: AskStepProps) => {
  const { question, setQuestion, mode, setMode } = useGoddessQuestionStore();
  const [error, setError] = useState(false);
  const asksQuestion = mode === "coin";

  const handleProceed = () => {
    if (asksQuestion && !question.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onProceed();
  };

  const modeIndex = MODE_ORDER.indexOf(mode);
  const cycleMode = (delta: number) => {
    const nextIndex = (modeIndex + delta + MODE_ORDER.length) % MODE_ORDER.length;
    setMode(MODE_ORDER[nextIndex]);
  };

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-dim">
        How shall Fortuna answer?
      </div>

      <div className="font-cinzel mt-9 text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
        {HEADING_BY_MODE[mode]}
      </div>
      <div className="mx-auto mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />

      <div className="mt-8 flex items-center justify-center gap-1">
        <button
          type="button"
          aria-label="Previous mode"
          onClick={() => cycleMode(-1)}
          className="z-20 shrink-0 rounded-full border border-[rgba(201,162,39,0.4)] bg-black/40 p-1.5 text-fortuna-gold-light transition-colors duration-150 hover:bg-black/60"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        <div
          className="relative h-[min(340px,90vw)] w-[min(300px,74vw)]"
          style={{ perspective: "1000px" }}
        >
          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {MODE_ORDER.map((m, i) => {
              const offset = getOffset(i, modeIndex, MODE_ORDER.length);
              const isActive = offset === 0;
              return (
                <div
                  key={m}
                  className="absolute left-1/2 top-1/2 h-full w-[min(230px,64vw)] overflow-hidden rounded-t-[110px] rounded-b-md border transition-all duration-500 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${offset * 118}px) translateZ(${
                      isActive ? 0 : -140
                    }px) rotateY(${offset * -32}deg) scale(${isActive ? 1 : 0.8})`,
                    opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.55,
                    zIndex: isActive ? 3 : 1,
                    pointerEvents: isActive ? "auto" : "none",
                    borderColor: isActive ? "rgba(201,162,39,0.4)" : "rgba(201,162,39,0.2)",
                  }}
                >
                  <img
                    src={IMAGE_BY_MODE[m]}
                    alt={`Fortuna, goddess of fortune — ${TITLE_BY_MODE[m]}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-10 font-cinzel text-xs uppercase tracking-[2px] text-fortuna-gold-light">
                    {TITLE_BY_MODE[m]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next mode"
          onClick={() => cycleMode(1)}
          className="z-20 shrink-0 rounded-full border border-[rgba(201,162,39,0.4)] bg-black/40 p-1.5 text-fortuna-gold-light transition-colors duration-150 hover:bg-black/60"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {MODE_ORDER.map((m) => (
          <button
            key={m}
            type="button"
            aria-label={`Go to ${TITLE_BY_MODE[m]}`}
            onClick={() => setMode(m)}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
              mode === m ? "bg-fortuna-gold" : "bg-[rgba(201,162,39,0.3)]"
            }`}
          />
        ))}
      </div>

      {asksQuestion && (
        <>
          <input
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Will I find what I seek?"
            required
            aria-invalid={error}
            className={`fortuna-question-input mt-8 w-full border-0 border-b bg-transparent px-1 py-3 text-center font-garamond text-2xl italic text-fortuna-gold-light ${
              error ? "border-red-500" : "border-[rgba(201,162,39,0.3)]"
            }`}
          />
          {error && (
            <div className="mt-2 font-garamond text-sm text-red-500">
              Please ask Fortuna a question before proceeding.
            </div>
          )}
        </>
      )}

      <button
        type="button"
        onClick={handleProceed}
        className={`mt-9 w-full px-8 py-4 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
      >
        PROCEED
      </button>
    </div>
  );
};
