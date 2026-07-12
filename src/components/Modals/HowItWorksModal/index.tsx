import { FortunaModal } from "../../Modal";
import { FLOW, MODE_MECHANICS } from "./data";
import { HowItWorksModalProps } from "./types";


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
