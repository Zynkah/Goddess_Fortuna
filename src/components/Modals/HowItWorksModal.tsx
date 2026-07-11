import { FortunaModal } from "../Modal";

const FLOW = [
  "Ask Fortuna a question.",
  "Choose how she shall answer — the Coin, the Wheel, or the Oracle.",
  "Cast, and see whether fortune favours you. Leave an optional USDC offering if you'd like.",
];

const MODE_MECHANICS = [
  {
    title: "The Coin",
    description:
      "A simple yes or no. Heads favours you, tails turns fortune away — a fair 50/50 toss. Rarely (about 1 in 12 wins), the coin lands as a Golden Fortune for an extra-generous blessing.",
  },
  {
    title: "The Wheel",
    description:
      "Fortune in eight faces. Spin to land on one of eight fortunes, from Great Fortune down to Fate Changes — four favourable, four not. Land on Great Fortune for a rare shot at Golden Fortune.",
  },
  {
    title: "The Oracle",
    description:
      "A cryptic word of counsel. The Oracle offers a poetic answer paired with a fortune rating of one to five stars — four stars or more means fortune favours you, and a rare five-star reading can turn Golden.",
  },
];

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal = ({ isOpen, onClose }: HowItWorksModalProps) => (
  <FortunaModal isOpen={isOpen} onClose={onClose} title="How It Works">
    <div className="text-left">
      <ol className="list-decimal space-y-2 pl-5 font-garamond text-base text-fortuna-gold-dim">
        {FLOW.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>

      <div className="mt-6 flex flex-col gap-5 border-t border-[rgba(201,162,39,0.2)] pt-6">
        {MODE_MECHANICS.map((mode) => (
          <div key={mode.title}>
            <div className="font-cinzel text-xs tracking-[2px] text-fortuna-gold-light">
              {mode.title.toUpperCase()}
            </div>
            <p className="mt-1 font-garamond text-sm leading-snug text-fortuna-gold-dim">
              {mode.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </FortunaModal>
);
