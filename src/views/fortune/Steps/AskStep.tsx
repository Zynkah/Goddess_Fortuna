import { useState } from "react";
import useGoddessQuestionStore from "../../../stores/useGoddessQuestionStore";
import fortunaStatue from "../../../assets/fortuna.png";
import { FORTUNA_PRIMARY_BUTTON_CLASS } from "../../../styles/buttonStyles";
import { ModeSelectDropdown } from "../../../components/Dropdowns/ModeSelectDropdown";

interface AskStepProps {
  onProceed: () => void;
}

export const AskStep = ({ onProceed }: AskStepProps) => {
  const { question, setQuestion } = useGoddessQuestionStore();
  const [error, setError] = useState(false);

  const handleProceed = () => {
    if (!question.trim()) {
      setError(true);
      return;
    }
    setError(false);
    onProceed();
  };

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      <div className="font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-dim">
        How shall Fortuna answer?
      </div>
      <ModeSelectDropdown />

      <div className="font-cinzel mt-9 text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
        Ask Fortuna a question
      </div>
      <div className="mx-auto mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />

      <div
        className="relative mx-auto mt-8 h-[min(340px,90vw)] w-[min(240px,66vw)] overflow-hidden rounded-t-[110px] rounded-b-md border border-[rgba(201,162,39,0.4)]"
        style={{
          background: "radial-gradient(circle at 50% 32%, #4a3c24 0%, #241d10 55%, var(--fortuna-bg-raised) 100%)",
        }}
      >
        <img
          src={fortunaStatue}
          alt="Fortuna, goddess of fortune"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ mixBlendMode: "multiply", filter: "brightness(1.4) contrast(1.05)" }}
        />
      </div>
      <div className="mt-3 font-cinzel text-[9px] uppercase tracking-[2px] text-fortuna-gold-faint">
        Goddess Fortuna
      </div>

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
