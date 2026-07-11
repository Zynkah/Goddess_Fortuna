import { FortunaModal } from "../../components/Modal";

const HOW_IT_WORKS = [
  "Ask Fortuna a question.",
  "Cast her coin — it's free, no wallet or payment needed.",
  "See whether fortune favours you, and leave an optional USDC offering if you'd like.",
];

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => (
  <FortunaModal isOpen={isOpen} onClose={onClose} title="How It Works">
    <ol className="list-decimal space-y-3 pl-5 text-left font-garamond text-base text-fortuna-gold-dim">
      {HOW_IT_WORKS.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ol>
  </FortunaModal>
);
