import { WHEEL_TIERS } from "../../../utils/fortunaWheelTiers";
import { WheelSegment } from "./types";

export const WHEEL_SEGMENTS: WheelSegment[] = WHEEL_TIERS.map((tier) => ({
  label: tier.label,
  isWin: tier.isWin,
  goldenEligible: tier.id === "great-fortune",
}));
