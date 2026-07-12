import { getLevelInfo } from "./fortunaLeveling";

// Only the fields achievement checks need — kept separate from the store's
// own type so this module doesn't have to import from it.
export interface AchievementCheckState {
  totalCasts: number;
  totalWins: number;
  offeringsSent: number;
  streakCount: number;
  totalGoldens: number;
  totalXp: number;
  hasSyncedWallet: boolean;
}

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  check: (state: AchievementCheckState) => boolean;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { id: "first-cast", title: "First Steps", description: "Make your first cast.", check: (s) => s.totalCasts >= 1 },
  { id: "first-win", title: "Favoured Once", description: "Win a cast.", check: (s) => s.totalWins >= 1 },
  {
    id: "first-offering",
    title: "First Offering Given",
    description: "Leave an offering for Fortuna.",
    check: (s) => s.offeringsSent >= 1,
  },
  {
    id: "three-day-streak",
    title: "Faithful Return",
    description: "Cast on three days in a row.",
    check: (s) => s.streakCount >= 3,
  },
  {
    id: "seven-day-streak",
    title: "Devoted",
    description: "Cast on seven days in a row.",
    check: (s) => s.streakCount >= 7,
  },
  {
    id: "golden-fortune",
    title: "Touched by Gold",
    description: "Land a Golden Fortune.",
    check: (s) => s.totalGoldens >= 1,
  },
  {
    id: "level-five",
    title: "Rising Oracle",
    description: "Reach level 5.",
    check: (s) => getLevelInfo(s.totalXp).level >= 5,
  },
  { id: "wallet-linked", title: "Bound by Fate", description: "Link a wallet.", check: (s) => s.hasSyncedWallet },
];

export function evaluateAchievements(
  state: AchievementCheckState,
  unlocked: string[]
): AchievementDef[] {
  return ACHIEVEMENTS.filter((def) => !unlocked.includes(def.id) && def.check(state));
}
