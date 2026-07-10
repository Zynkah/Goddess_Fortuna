import { useMemo, useState } from "react";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendUsdcTip } from "../../utils/sendUsdcTip";
import { notify } from "../../utils/notifications";
import { CLUSTER_URL, SOLANA_COMMITMENT, TIP_DESTINATION_WALLET } from "../../constants";
import headsCoin from "../../assets/Stater_Epeiros_Artermis_Heads.png";
import tailsCoin from "../../assets/Stater_Epeiros_Artermis_Tails.png";
import {
  FORTUNA_PILL_BUTTON_ACTIVE_CLASS,
  FORTUNA_PILL_BUTTON_CLASS,
  FORTUNA_PILL_BUTTON_INACTIVE_CLASS,
  FORTUNA_PRIMARY_BUTTON_CLASS,
} from "./buttonStyles";

interface RevealStepProps {
  isWin: boolean | null;
  onReset: () => void;
}

const TIP_AMOUNTS = [1, 5, 10];

export const RevealStep = ({ isWin, onReset }: RevealStepProps) => {
  const isResolved = isWin !== null;
  // USDC only exists on mainnet, so the tip always uses a dedicated mainnet
  // connection regardless of the app's devnet/testnet network switcher.
  const connection = useMemo(
    () => new Connection(CLUSTER_URL, SOLANA_COMMITMENT),
    []
  );
  const wallet = useWallet();
  const [tipAmount, setTipAmount] = useState(1);
  const [isTipping, setIsTipping] = useState(false);

  const handleTip = async () => {
    if (!wallet.connected) return;
    setIsTipping(true);
    try {
      const signature = await sendUsdcTip(connection, wallet, tipAmount);
      notify({
        type: "success",
        message: "Offering sent",
        description: `Sent ${tipAmount} USDC to Fortuna.`,
        txid: signature,
      });
    } catch (error) {
      notify({
        type: "error",
        message: "Offering failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsTipping(false);
    }
  };

  return (
    <div
      className="flex min-h-[560px] flex-col items-center justify-center p-[clamp(30px,6vw,44px)] text-center"
      style={{
        background: "radial-gradient(90% 60% at 50% 42%, #1a1509 0%, transparent 70%)",
      }}
    >
      <div className="font-cinzel text-[10px] uppercase tracking-[4px] text-fortuna-gold-dim">
        The coin of Fortuna
      </div>

      <div className="relative my-8 h-[132px] w-[132px]" style={{ perspective: "800px" }}>
        <div
          className="absolute inset-0 z-0 rounded-full"
          style={{ boxShadow: "0 0 44px rgba(230,195,77,0.4)" }}
        />
        <img
          src={isResolved && !isWin ? tailsCoin : headsCoin}
          alt={isResolved ? (isWin ? "Heads" : "Tails") : "Fortuna's coin"}
          className={`relative z-10 h-full w-full scale-110 rounded-full object-cover ${
            isResolved ? "" : "fortuna-coin--flipping"
          }`}
        />
      </div>

      {!isResolved && (
        <div className="font-garamond text-2xl italic text-fortuna-gold-soft">
          Fortuna casts her coin…
        </div>
      )}

      {isWin && (
        <div>
          <div className="fortuna-reveal-up font-cinzel text-2xl leading-snug tracking-[3px] text-fortuna-gold-light">
            HEADS<br />
            FORTUNE FAVOURS YOU
          </div>
          <div className="fortuna-reveal-up mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.5)]" />
          <div className="fortuna-reveal-up mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug text-fortuna-gold-soft">
            "What you seek turns toward you."
          </div>
        </div>
      )}

      {isResolved && !isWin && (
        <div>
          <div className="fortuna-reveal-up font-cinzel text-2xl leading-snug tracking-[3px] text-[#9a8a5e]">
            TAILS<br />
            FORTUNE TURNS AWAY
          </div>
          <div className="fortuna-reveal-up mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.3)]" />
          <div className="fortuna-reveal-up mx-auto max-w-[300px] font-garamond text-2xl italic leading-snug text-fortuna-gold-dimmer">
            "The wheel turns on. Ask again whenever you like."
          </div>
        </div>
      )}

      {isResolved && !!TIP_DESTINATION_WALLET && (
        <div className="fortuna-reveal-up mt-10 w-full max-w-[300px] border-t border-[rgba(201,162,39,0.25)] pt-6">
          <div className="font-cinzel text-[10px] uppercase tracking-[3px] text-fortuna-gold-dim">
            Leave an offering (optional)
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {TIP_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setTipAmount(amount)}
                className={`${FORTUNA_PILL_BUTTON_CLASS} ${
                  tipAmount === amount ? FORTUNA_PILL_BUTTON_ACTIVE_CLASS : FORTUNA_PILL_BUTTON_INACTIVE_CLASS
                }`}
              >
                {amount} USDC
              </button>
            ))}
          </div>

          {wallet.connected ? (
            <button
              type="button"
              onClick={handleTip}
              disabled={isTipping}
              className={`mt-4 px-8 py-3.5 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
            >
              {isTipping ? "SENDING…" : `SEND ${tipAmount} USDC`}
            </button>
          ) : (
            <div className="mt-4 font-garamond text-sm text-fortuna-gold-faint">
              Connect your wallet to send an offering.
            </div>
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
