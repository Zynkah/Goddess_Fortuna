import { useMemo, useState } from "react";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendUsdcTip } from "../../utils/sendUsdcTip";
import { notify } from "../../utils/notifications";
import { CLUSTER_URL, SOLANA_COMMITMENT } from "../../constants";

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
      <div className=" text-[10px] uppercase tracking-[4px] text-[#8a7a52]">
        The coin of Fortuna
      </div>

      <div className="my-8" style={{ perspective: "800px" }}>
        <div
          className={`flex h-[132px] w-[132px] items-center justify-center rounded-full border-2 border-[#7a5a12] ${
            isResolved ? "" : "fortuna-coin--flipping"
          }`}
          style={{
            background:
              "radial-gradient(circle at 38% 32%,#fbe9a8,#e6c34d 42%,#a6791a 78%,#6a4d10)",
            boxShadow: "0 0 44px rgba(230,195,77,0.4)",
          }}
        >
          <span className=" text-[15px] font-semibold tracking-[2px] text-[#4a340a]">
            {isResolved ? (isWin ? "HEADS" : "TAILS") : ""}
          </span>
        </div>
      </div>

      {!isResolved && (
        <div className="text-[22px] italic text-[#cbb884]">
          Fortuna casts her coin…
        </div>
      )}

      {isWin && (
        <div>
          <div className="fortuna-reveal-up text-[26px] leading-snug tracking-[3px] text-[#e8d5a0]">
            HEADS —<br />
            FORTUNE FAVOURS YOU
          </div>
          <div className="fortuna-reveal-up mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.5)]" />
          <div className="fortuna-reveal-up mx-auto max-w-[300px] text-xl italic leading-snug text-[#cbb884]">
            "What you seek turns toward you."
          </div>
        </div>
      )}

      {isResolved && !isWin && (
        <div>
          <div className="fortuna-reveal-up  text-[26px] leading-snug tracking-[3px] text-[#9a8a5e]">
            TAILS —<br />
            FORTUNE TURNS AWAY
          </div>
          <div className="fortuna-reveal-up mx-auto my-6 h-px w-[60px] bg-[rgba(201,162,39,0.3)]" />
          <div className="fortuna-reveal-up mx-auto max-w-[300px] text-xl italic leading-snug text-[#8f7c48]">
            "The wheel turns on. Ask again whenever you like."
          </div>
        </div>
      )}

      {isResolved && (
        <div className="fortuna-reveal-up mt-10 w-full max-w-[300px] border-t border-[rgba(201,162,39,0.25)] pt-6">
          <div className=" text-[10px] uppercase tracking-[3px] text-[#8a7a52]">
            Leave an offering (optional)
          </div>
          <div className="mt-3 flex justify-center gap-2">
            {TIP_AMOUNTS.map((amount) => (
              <span
                key={amount}
                onClick={() => setTipAmount(amount)}
                role="button"
                className={`cursor-pointer border px-3 py-1.5 text-xs tracking-[1px] ${
                  tipAmount === amount
                    ? "border-[#c9a227] text-[#e8d5a0]"
                    : "border-[rgba(201,162,39,0.3)] text-[#8a7a52]"
                }`}
              >
                {amount} USDC
              </span>
            ))}
          </div>

          {wallet.connected ? (
            <div
              onClick={isTipping ? undefined : handleTip}
              role="button"
              className={`mt-4 inline-block border border-[#c9a227] bg-[rgba(201,162,39,0.06)] px-6 py-2.5 text-xs tracking-[3px] text-[#e8d5a0] ${
                isTipping ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              {isTipping ? "SENDING…" : `SEND ${tipAmount} USDC`}
            </div>
          ) : (
            <div className="mt-4 text-[11px] text-[#6f6034]">
              Connect your wallet to send an offering.
            </div>
          )}
        </div>
      )}

      {isResolved && (
        <div
          onClick={onReset}
          role="button"
          className="fortuna-reveal-up mt-8 inline-block cursor-pointer border border-[rgba(201,162,39,0.5)] px-8 py-3.5  text-xs tracking-[3px] text-[#e8d5a0]"
        >
          ASK AGAIN
        </div>
      )}
    </div>
  );
};
