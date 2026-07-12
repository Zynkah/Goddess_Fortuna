import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { FORTUNA_PRIMARY_BUTTON_CLASS } from "../../../styles/buttonStyles";

export const WalletStatus = () => {
  const { connected } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();
  return (
    <>
      {connected ? (
        <div className="flex items-center justify-center gap-2 font-garamond text-sm italic text-fortuna-gold-dim">
          Synced to your wallet
        </div>
      ) : (
        <div className="border-b border-[rgba(201,162,39,0.25)] pb-6 text-center">
          <div className="font-garamond text-sm italic text-fortuna-gold-dim">
            Connect your wallet to save your stats across devices.
          </div>
          <button
            type="button"
            onClick={() => setWalletModalVisible(true)}
            className={`mt-4 w-full whitespace-nowrap px-4 py-3 ${FORTUNA_PRIMARY_BUTTON_CLASS}`}
          >
            CONNECT WALLET
          </button>
        </div>
      )}
    </>
  );
};
