import { FortunaModal } from "../../Modal";
import { Milestones } from "./Milestones";
import { WheelCodex } from "./WheelCodex";
import { OracleCodex } from "./OracleCodex";

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal = ({ isOpen, onClose }: AchievementsModalProps) => (
  <FortunaModal isOpen={isOpen} onClose={onClose} title="Achievements" maxWidth="420px">
    <div className="flex flex-col gap-8">
      <Milestones />
      <div className="border-t border-[rgba(201,162,39,0.2)] pt-6">
        <WheelCodex />
      </div>
      <div className="border-t border-[rgba(201,162,39,0.2)] pt-6">
        <OracleCodex />
      </div>
    </div>
  </FortunaModal>
);
