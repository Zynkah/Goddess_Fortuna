import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { FortunaModal } from "../../components/Modal";
import { ProgressHeader } from "./ProgressHeader";
import { SessionHistoryStrip } from "./SessionHistoryStrip";
import { FORTUNA_PRIMARY_BUTTON_CLASS } from "./buttonStyles";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsModal = ({ isOpen, onClose }: StatsModalProps) => {
  const { connected } = useWallet();
  const { setVisible: setWalletModalVisible } = useWalletModal();

  return (
    <FortunaModal isOpen={isOpen} onClose={onClose} title="Your Standing" maxWidth="380px">
      <div className="flex flex-col gap-8">
        {connected ? (
          <div className="flex items-center justify-center gap-2 font-garamond text-sm italic text-fortuna-gold-dim">
            <span className="text-fortuna-gold-bright">☁</span>
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

        <ProgressHeader />
        <SessionHistoryStrip />
      </div>
    </FortunaModal>
  );
};
