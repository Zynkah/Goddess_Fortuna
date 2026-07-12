import { useState } from "react";
import useGoddessQuestionStore from "../../../stores/useGoddessQuestionStore";
import { FORTUNA_GHOST_BUTTON_CLASS, FORTUNA_PRIMARY_BUTTON_CLASS } from "../../../styles/buttonStyles";
import { playCastSound, playWheelTickSound, playOracleChimeSound } from "../../../utils/fortunaSfx";
import { FortuneWheel } from "../FortuneWheel";
import { pickOracleOutcome, OraclePhrase } from "../../../utils/fortunaOracle";
import { pickWheelSegmentIndex } from "../FortuneWheel/PickWheelSegmentIndex";
import { getWheelTargetRotation } from "../FortuneWheel/GetWheelTargetRotation";
import {
  WHEEL_TIERS,
  DIVINE_FAVOR_TIER,
  WHEEL_DIVINE_FAVOR_CHANCE,
  pickWheelPhrase,
  WheelTierId,
} from "../../../utils/fortunaWheelTiers";

const GOLDEN_FORTUNE_CHANCE = 0.08;
const WHEEL_SPIN_MS = 2200;
const ORACLE_CONSULT_MS = 1400;

export type CastDetail =
  | { mode: "coin" }
  | { mode: "wheel"; segment: string; tierId: WheelTierId; phrase: string }
  | { mode: "oracle"; phrase: string; rating: OraclePhrase["rating"] };

interface CastStepProps {
  onBack: () => void;
  onCastComplete: (isWin: boolean, isGolden: boolean, detail: CastDetail) => void;
}

export const CastStep = ({ onBack, onCastComplete }: CastStepProps) => {
  const { question, mode } = useGoddessQuestionStore();
  const [isCasting, setIsCasting] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelSpinning, setWheelSpinning] = useState(false);

  const handleCastCoin = () => {
    playCastSound();
    const isWin = Math.random() < 0.5;
    const isGolden = isWin && Math.random() < GOLDEN_FORTUNE_CHANCE;
    setTimeout(() => onCastComplete(isWin, isGolden, { mode: "coin" }), 1200);
  };

  const handleSpinWheel = () => {
    const index = pickWheelSegmentIndex();
    const tier = WHEEL_TIERS[index];
    playWheelTickSound();
    setWheelSpinning(true);
    setWheelRotation(getWheelTargetRotation(index));
    setTimeout(() => {
      const isGolden = tier.id === "great-fortune" && Math.random() < WHEEL_DIVINE_FAVOR_CHANCE;
      const resolvedTier = isGolden ? DIVINE_FAVOR_TIER : tier;
      onCastComplete(tier.isWin, isGolden, {
        mode: "wheel",
        segment: tier.label,
        tierId: resolvedTier.id,
        phrase: pickWheelPhrase(resolvedTier),
      });
    }, WHEEL_SPIN_MS);
  };

  const handleConsultOracle = () => {
    const outcome = pickOracleOutcome();
    setTimeout(() => {
      playOracleChimeSound();
      const isWin = outcome.rating >= 4;
      const isGolden = outcome.rating === 5 && Math.random() < GOLDEN_FORTUNE_CHANCE;
      onCastComplete(isWin, isGolden, { mode: "oracle", phrase: outcome.text, rating: outcome.rating });
    }, ORACLE_CONSULT_MS);
  };

  const handleCast = () => {
    setIsCasting(true);
    if (mode === "wheel") handleSpinWheel();
    else if (mode === "oracle") handleConsultOracle();
    else handleCastCoin();
  };

  const subtitle =
    mode === "wheel"
      ? "Fortuna is ready to spin her wheel — free, no wallet required."
      : mode === "oracle"
      ? "Fortuna is ready to whisper her counsel — free, no wallet required."
      : "Fortuna is ready to cast her coin — free, no wallet required.";

  const idleLabel =
    mode === "wheel" ? "SPIN THE WHEEL" : mode === "oracle" ? "CONSULT THE ORACLE" : "CAST THE COIN";
  const castingLabel = mode === "wheel" ? "SPINNING…" : mode === "oracle" ? "CONSULTING…" : "CASTING…";

  return (
    <div className="p-[clamp(30px,6vw,44px)] text-center">
      {mode === "coin" && (
        <>
          <div className="font-cinzel text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
            Your Question
          </div>
          <div className="mx-auto mb-2 mt-4 h-px w-10 bg-[rgba(201,162,39,0.5)]" />
          <div className="font-garamond text-xl italic text-fortuna-gold-dimmer">
            "{question.trim() ? question : "Will I find what I seek?"}"
          </div>
        </>
      )}

      {mode === "wheel" && (
        <div className="my-8 flex justify-center">
          <FortuneWheel rotation={wheelRotation} spinning={wheelSpinning} />
        </div>
      )}

      <div className="my-10 font-garamond text-base italic text-fortuna-gold-dim">{subtitle}</div>

      <button
        type="button"
        onClick={handleCast}
        disabled={isCasting}
        className={`mt-8 w-full px-8 py-4 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
      >
        {isCasting ? castingLabel : idleLabel}
      </button>
      <button
        type="button"
        onClick={onBack}
        className={`mt-4 block w-full text-center ${FORTUNA_GHOST_BUTTON_CLASS}`}
      >
        {mode === "coin" ? "Change question" : "Choose again"}
      </button>
    </div>
  );
};
