// Titled levels for the XP bar. Arbitrary game-balance content — tune freely.
export const LEVEL_TITLES = [
  "Seeker",
  "Believer",
  "Devotee",
  "Acolyte",
  "Mystic",
  "Augur",
  "Oracle",
  "Sage",
  "Prophet",
  "Ascendant",
];

export const XP_PER_CAST = 10;
export const XP_BONUS_WIN = 15;
export const XP_BONUS_GOLDEN = 60;

// XP required to advance FROM `level` TO `level + 1`.
export function xpForLevel(level: number): number {
  return (level + 3) * 100;
}

function titleForLevel(level: number): string {
  const index = Math.min(level, LEVEL_TITLES.length) - 1;
  return LEVEL_TITLES[index];
}

export interface LevelInfo {
  level: number;
  title: string;
  nextTitle: string;
  xpIntoLevel: number;
  xpNeededForNext: number;
}

export function getLevelInfo(totalXp: number): LevelInfo {
  let level = 1;
  let xpIntoLevel = totalXp;

  while (xpIntoLevel >= xpForLevel(level)) {
    xpIntoLevel -= xpForLevel(level);
    level += 1;
  }

  return {
    level,
    title: titleForLevel(level),
    nextTitle: titleForLevel(level + 1),
    xpIntoLevel,
    xpNeededForNext: xpForLevel(level),
  };
}
