import useGoddessQuestionStore from "../../stores/useGoddessQuestionStore";
import fortunaStatue from "../../assets/fortuna.png";

interface AskStepProps {
  onProceed: () => void;
}

export const AskStep = ({ onProceed }: AskStepProps) => {
  const { question, setQuestion } = useGoddessQuestionStore();

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      <div className=" text-[10px] uppercase tracking-[4px] text-[#8a7a52]">
        Ask Fortuna a question
      </div>
      <div className="mx-auto mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />

      <div
        className="relative mx-auto mt-8 h-[min(340px,90vw)] w-[min(240px,66vw)] overflow-hidden rounded-t-[110px] rounded-b-md border border-[rgba(201,162,39,0.4)]"
        style={{
          background: "radial-gradient(circle at 50% 32%, #4a3c24 0%, #241d10 55%, #0d0a06 100%)",
        }}
      >
        <img
          src={fortunaStatue}
          alt="Fortuna, goddess of fortune"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ mixBlendMode: "multiply", filter: "brightness(1.4) contrast(1.05)" }}
        />
      </div>
      <div className="mt-3  text-[9px] uppercase tracking-[2px] text-[#6f6034]">
        Fortuna · statue
      </div>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Will I find what I seek?"
        className="fortuna-question-input mt-8 w-full border-0 border-b border-[rgba(201,162,39,0.3)] bg-transparent px-1 py-3 text-center text-[22px] italic text-[#e8d5a0]"
      />

      <div
        onClick={onProceed}
        role="button"
        className="mt-9 cursor-pointer border border-[#c9a227] p-4  text-sm tracking-[4px] text-[#e8d5a0]"
      >
        PROCEED
      </div>
    </div>
  );
};
