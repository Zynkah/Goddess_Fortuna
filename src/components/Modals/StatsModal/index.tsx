import { FortunaModal } from "../../Modal";
import { ProgressHeader } from "./ProgressHeader";
import { SessionHistoryStrip } from "./SessionHistoryStrip";
import { WalletStatus } from "./WalletStatus";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StatsModal = ({ isOpen, onClose }: StatsModalProps) => {
  return (
    <FortunaModal
      isOpen={isOpen}
      onClose={onClose}
      title="Your Standing"
      maxWidth="380px"
    >
      <div className="flex flex-col gap-8">
        <WalletStatus />
        <ProgressHeader />
        <SessionHistoryStrip />
      </div>
    </FortunaModal>
  );
};
