import { useEffect, useMemo, useState } from "react";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { sendUsdcTip } from "../../../utils/sendUsdcTip";
import { notify } from "../../../utils/notifications";
import { CLUSTER_URL, SOLANA_COMMITMENT, TIP_DESTINATION_WALLET } from "../../../constants";
import headsCoin from "../../../assets/Stater_Epeiros_Artermis_Heads.png";
import tailsCoin from "../../../assets/Stater_Epeiros_Artermis_Tails.png";
import {
  FORTUNA_PILL_BUTTON_ACTIVE_CLASS,
  FORTUNA_PILL_BUTTON_CLASS,
  FORTUNA_PILL_BUTTON_INACTIVE_CLASS,
  FORTUNA_PRIMARY_BUTTON_CLASS,
} from "../../../styles/buttonStyles";
import { CoinParticleBurst } from "../CoinParticleBurst";
import { FortuneWheel } from "../FortuneWheel";
import { playGoldenSound, playWinSound } from "../../../utils/fortunaSfx";
import useFortunaProgressStore from "../../../stores/useFortunaProgressStore";
import { CastDetail } from "./CastStep";
import { WHEEL_SEGMENTS } from "../FortuneWheel/data";
import { getWheelTargetRotation } from "../FortuneWheel/GetWheelTargetRotation";
import { ALL_WHEEL_TIERS } from "../../../utils/fortunaWheelTiers";

interface RevealStepProps {
  isWin: boolean | null;
  isGolden: boolean;
  detail: CastDetail;
  onReset: () => void;
}

const TIP_AMOUNTS = [1, 5, 10];

const HEADER_BY_MODE: Record<CastDetail["mode"], string> = {
  coin: "The coin of Fortuna",
  wheel: "The wheel of Fortuna",
  oracle: "The oracle speaks",
};

const IDLE_TEXT_BY_MODE: Record<CastDetail["mode"], string> = {
  coin: "Fortuna casts her coin…",
  wheel: "Fortuna spins her wheel…",
  oracle: "Fortuna consults the mists…",
};

export const RevealStep = ({ isWin, isGolden, detail, onReset }: RevealStepProps) => {
  const isResolved = isWin !== null;

  useEffect(() => {
    if (isWin === null) return;
    if (isGolden) playGoldenSound();
    else if (isWin) playWinSound();
  }, [isWin, isGolden]);
  // USDC only exists on mainnet, so the tip always uses a dedicated mainnet
  // connection regardless of the app's devnet/testnet network switcher.
  const connection = useMemo(
    () => new Connection(CLUSTER_URL, SOLANA_COMMITMENT),
    []
  );
  const wallet = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  const [tipAmount, setTipAmount] = useState<number>(1);
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [customTipInput, setCustomTipInput] = useState("");
  const [tipPhase, setTipPhase] = useState<"idle" | "sending" | "confirmed" | "sent">("idle");

  const effectiveTipAmount = isCustomTip ? Number(customTipInput) : tipAmount;
  const isTipAmountValid = effectiveTipAmount > 0;

  const handleTip = async () => {
    if (!wallet.connected || !isTipAmountValid || tipPhase !== "idle") return;
    setTipPhase("sending");
    try {
      const signature = await sendUsdcTip(connection, wallet, effectiveTipAmount);
      notify({
        type: "success",
        message: "Offering sent",
        description: `Sent ${effectiveTipAmount} USDC to Fortuna.`,
        txid: signature,
      });
      useFortunaProgressStore.getState().recordOffering();
      setTipPhase("confirmed");
      setTimeout(() => setTipPhase("sent"), 800);
      setTimeout(() => setTipPhase("idle"), 2600);
    } catch (error) {
      notify({
        type: "error",
        message: "Offering failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
      setTipPhase("idle");
    }
  };

  const wheelSegmentIndex =
    detail.mode === "wheel" ? WHEEL_SEGMENTS.findIndex((s) => s.label === detail.segment) : -1;

  return (
    <div
      className="flex min-h-[560px] flex-col items-center justify-center p-[clamp(30px,6vw,44px)] text-center"
      style={{
        background: "radial-gradient(90% 60% at 50% 42%, #1a1509 0%, transparent 70%)",
      }}
    >
      <div className="font-cinzel text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
        {HEADER_BY_MODE[detail.mode]}
      </div>

      {detail.mode === "coin" && (
        <div className="relative my-8 h-[132px] w-[132px]" style={{ perspective: "800px" }}>
          <div
            className="absolute inset-0 z-0 rounded-full"
            style={{ boxShadow: "0 0 44px rgba(230,195,77,0.4)" }}
          />
          {isGolden && isWin && <div className="fortuna-coin--golden absolute -inset-1 z-20" />}
          <img
            src={isResolved && !isWin ? tailsCoin : headsCoin}
            alt={isResolved ? (isWin ? "Heads" : "Tails") : "Fortuna's coin"}
            className={`relative z-10 h-full w-full scale-110 rounded-full object-cover ${
              isResolved ? "" : "fortuna-coin--flipping"
            }`}
          />
          {isWin && <CoinParticleBurst golden={isGolden} />}
        </div>
      )}

      {detail.mode === "wheel" && (
        <div className="relative my-8 flex h-[160px] w-[160px] items-center justify-center">
          <FortuneWheel
            rotation={wheelSegmentIndex >= 0 ? getWheelTargetRotation(wheelSegmentIndex, 0) : 0}
            spinning={false}
          />
          {isWin && <CoinParticleBurst golden={isGolden} />}
        </div>
      )}

      {detail.mode === "oracle" && (
        <div className="relative my-8 h-[132px] w-[132px]">
          <div
            className={`absolute inset-0 rounded-full ${isGolden && isWin ? "fortuna-coin--golden" : ""}`}
            style={{
              background: "radial-gradient(circle at 35% 30%, #4a3c24, #241d10 70%)",
              boxShadow: "0 0 44px rgba(230,195,77,0.35)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-cinzel text-xs uppercase tracking-[2px] text-fortuna-gold-bright">
            Oracle
          </div>
          {isWin && <CoinParticleBurst golden={isGolden} />}
        </div>
      )}

      {!isResolved && (
        <div className="font-garamond text-2xl italic text-fortuna-gold-soft">
          {IDLE_TEXT_BY_MODE[detail.mode]}
        </div>
      )}

      {isWin && isGolden && detail.mode !== "oracle" && (
        <div className="fortuna-reveal-up-1 mb-2">
          <div className="font-cinzel text-sm tracking-[3px] text-fortuna-gold-bright">
            GOLDEN FORTUNE
          </div>
          <div className="mt-1 font-garamond text-sm italic text-fortuna-gold-soft">
            Rare — fortune smiles rarely this wide.
          </div>
        </div>
      )}

      {isResolved && detail.mode === "coin" && isWin && (
        <div>
          <div className="fortuna-reveal-up-1 font-cinzel text-2xl leading-snug tracking-[3px] text-fortuna-gold-light">
            HEADS<br />
            FORTUNE FAVOURS YOU
          </div>
          <div className="fortuna-reveal-up-2 mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.5)]" />
          <div className="fortuna-reveal-up-3 mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug text-fortuna-gold-soft">
            "What you seek turns toward you."
          </div>
        </div>
      )}

      {isResolved && detail.mode === "coin" && !isWin && (
        <div>
          <div className="fortuna-reveal-up-1 font-cinzel text-2xl leading-snug tracking-[3px] text-[#9a8a5e]">
            TAILS<br />
            FORTUNE TURNS AWAY
          </div>
          <div className="fortuna-reveal-up-2 mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.3)]" />
          <div className="fortuna-reveal-up-3 mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug text-fortuna-gold-dimmer">
            "The wheel turns on. Ask again whenever you like."
          </div>
        </div>
      )}

      {isResolved && detail.mode === "wheel" && (
        <div>
          <div
            className={`fortuna-reveal-up-1 font-cinzel text-2xl leading-snug tracking-[3px] ${
              isWin ? "text-fortuna-gold-light" : "text-[#9a8a5e]"
            }`}
          >
            {(() => {
              const landedTier = ALL_WHEEL_TIERS.find((t) => t.id === detail.tierId);
              return `${landedTier?.emoji ?? ""} ${(landedTier?.label ?? detail.segment).toUpperCase()}`;
            })()}
          </div>
          <div
            className={`fortuna-reveal-up-2 mx-auto my-6 h-px w-[60px] ${
              isWin ? "bg-[rgba(201,162,39,0.5)]" : "bg-[rgba(201,162,39,0.3)]"
            }`}
          />
          <div
            className={`fortuna-reveal-up-3 mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug ${
              isWin ? "text-fortuna-gold-soft" : "text-fortuna-gold-dimmer"
            }`}
          >
            "{detail.phrase}"
          </div>
        </div>
      )}

      {isResolved && detail.mode === "oracle" && (
        <div>
          <div className="fortuna-reveal-up-1 mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug text-fortuna-gold-light">
            "{detail.phrase}"
          </div>
          <div className="fortuna-reveal-up-2 mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.4)]" />
          <div className="fortuna-reveal-up-3 font-cinzel text-[10px] uppercase tracking-[2px] text-fortuna-gold-faint">
            Interpret this as you will
          </div>
        </div>
      )}

      {isResolved && !!TIP_DESTINATION_WALLET && (
        <div className="fortuna-reveal-up mt-10 w-full max-w-[300px] border-t border-[rgba(201,162,39,0.25)] pt-6">
          <div className="font-cinzel text-[10px] uppercase tracking-[3px] text-fortuna-gold-dim">
            Leave an offering (optional)
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {TIP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => {
                  setIsCustomTip(false);
                  setTipAmount(amount);
                }}
                className={`${FORTUNA_PILL_BUTTON_CLASS} ${
                  !isCustomTip && tipAmount === amount
                    ? FORTUNA_PILL_BUTTON_ACTIVE_CLASS
                    : FORTUNA_PILL_BUTTON_INACTIVE_CLASS
                }`}
              >
                {amount} USDC
              </button>
            ))}
            <button
              type="button"
              onClick={() => setIsCustomTip(true)}
              className={`${FORTUNA_PILL_BUTTON_CLASS} border-dashed ${
                isCustomTip ? FORTUNA_PILL_BUTTON_ACTIVE_CLASS : FORTUNA_PILL_BUTTON_INACTIVE_CLASS
              }`}
            >
              CUSTOM
            </button>
          </div>

          {isCustomTip && (
            <input
              type="number"
              min="0"
              step="any"
              autoFocus
              value={customTipInput}
              onChange={(e) => setCustomTipInput(e.target.value)}
              placeholder="Amount in USDC"
              className="fortuna-number-input mt-3 w-full border-0 border-b border-[rgba(201,162,39,0.3)] bg-transparent px-1 py-2 text-center font-garamond text-lg italic text-fortuna-gold-light"
            />
          )}

          {wallet.connected ? (
            <button
              type="button"
              onClick={handleTip}
              disabled={tipPhase !== "idle" || !isTipAmountValid}
              className={
                tipPhase === "sent"
                  ? "mt-4 inline-flex items-center justify-center border border-emerald-400/70 bg-emerald-500/10 px-8 py-3.5 font-cinzel text-xs tracking-[3px] text-emerald-200 transition-all duration-300"
                  : `mt-4 px-8 py-3.5 transition-transform duration-300 ${
                      tipPhase === "confirmed" ? "scale-105" : "scale-100"
                    } ${FORTUNA_PRIMARY_BUTTON_CLASS}`
              }
            >
              {tipPhase === "sending"
                ? "SENDING…"
                : tipPhase === "confirmed"
                ? "CONFIRMED"
                : tipPhase === "sent"
                ? "OFFERING SENT"
                : isTipAmountValid
                ? `SEND ${effectiveTipAmount} USDC`
                : "ENTER AN AMOUNT"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setWalletModalVisible(true)}
              className={`mt-4 w-full whitespace-nowrap px-4 py-3.5 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
            >
              CONNECT WALLET TO OFFER
            </button>
          )}
        </div>
      )}

      {isResolved && (
        <button
          type="button"
          onClick={onReset}
          className={`fortuna-reveal-up mt-8 px-8 py-3.5 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
        >
          ASK AGAIN
        </button>
      )}
    </div>
  );
};
