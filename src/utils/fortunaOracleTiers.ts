export type OracleTierId =
  | "blessed-omens"
  | "favorable-guidance"
  | "twists-of-fate"
  | "veiled-prophecies"
  | "warnings"
  | "divine-revelations";

export interface OracleTier {
  id: OracleTierId;
  label: string;
  emoji: string;
  meaning: string;
  isWin: boolean;
  phrases: string[];
}

// The Oracle answers "what wisdom should guide you?", not "yes or no" — so
// unlike the Wheel, the tier a phrase belongs to is never shown to the
// player. It only drives internal win/XP tracking and the codex grouping.
export const ORACLE_TIERS: OracleTier[] = [
  {
    id: "blessed-omens",
    label: "Blessed Omens",
    emoji: "☀️",
    meaning: "The gods smile plainly on this path.",
    isWin: true,
    phrases: [
      "The dawn welcomes your ambition.",
      "The gods have cleared your path.",
      "The stars favor your journey.",
      "Your courage shall be rewarded.",
      "What you seek already seeks you.",
      "The gates of opportunity stand open.",
      "A golden thread leads you onward.",
      "Your heart knows the correct road.",
      "The harvest will exceed the seed.",
      "Fortune watches over this endeavor.",
    ],
  },
  {
    id: "favorable-guidance",
    label: "Favorable Guidance",
    emoji: "🌿",
    meaning: "Positive, and quietly wise.",
    isWin: true,
    phrases: [
      "Patience will multiply your reward.",
      "A steady hand shapes destiny.",
      "Trust what has quietly endured.",
      "The next step is more important than the last.",
      "Victory belongs to those who continue.",
      "The answer arrives with persistence.",
      "The river reaches the sea without haste.",
      "Speak less. Observe more.",
      "Small choices become great fortunes.",
      "The strongest roots grow unseen.",
    ],
  },
  {
    id: "twists-of-fate",
    label: "Twists of Fate",
    emoji: "🌪",
    meaning: "The unexpected turns in your favor.",
    isWin: true,
    phrases: [
      "The unexpected becomes your greatest ally.",
      "One meeting changes everything.",
      "The answer comes from a stranger.",
      "What is lost returns transformed.",
      "The longest road proves the shortest.",
      "A closed door protects you.",
      "The smallest choice alters destiny.",
      "What seems like failure hides opportunity.",
      "The wheel turns where no eye can follow.",
      "Chance arrives disguised.",
    ],
  },
  {
    id: "veiled-prophecies",
    label: "Veiled Prophecies",
    emoji: "🌙",
    meaning: "The Oracle is famously unpredictable.",
    isWin: false,
    phrases: [
      "The veil has not yet lifted.",
      "The moon keeps this answer hidden.",
      "Not every truth wishes to be known.",
      "The threads remain unfinished.",
      "The hour of knowing has not arrived.",
      "Fate speaks in whispers today.",
      "The stars refuse certainty.",
      "The answer sleeps beneath tomorrow.",
      "Only time may reveal this path.",
      "The wheel has yet to settle.",
    ],
  },
  {
    id: "warnings",
    label: "Warnings",
    emoji: "🌧",
    meaning: "An elegant caution, not a harsh one.",
    isWin: false,
    phrases: [
      "The road ahead demands caution.",
      "Not every open gate should be entered.",
      "The brightest flame casts the darkest shadow.",
      "Beware of easy victories.",
      "A hidden stone may trip the unwary.",
      "The price may exceed the reward.",
      "Pride invites misfortune.",
      "What glitters may conceal ruin.",
      "A false friend walks nearby.",
      "Fortune tests those she favors.",
    ],
  },
];

// Not a regular draw — a very rare bonus reading layered on top of a
// Blessed Omens result, mirroring the Wheel's Divine Favor mechanic.
export const DIVINE_REVELATION_TIER: OracleTier = {
  id: "divine-revelations",
  label: "Divine Revelations",
  emoji: "🌟",
  meaning: "Very rare — almost as if Fortuna herself is speaking.",
  isWin: true,
  phrases: [
    "Fortuna has taken notice.",
    "The Wheel pauses for you alone.",
    "The Fates weave a golden thread.",
    "A blessing unseen surrounds you.",
    "Even the stars alter their course.",
    "The heavens have spoken.",
    "Your name is carried by favorable winds.",
    "Prosperity follows your footsteps.",
    "Today, destiny yields.",
    "Fortune herself walks beside you.",
  ],
};

export const ALL_ORACLE_TIERS: OracleTier[] = [...ORACLE_TIERS, DIVINE_REVELATION_TIER];

export const ORACLE_DIVINE_REVELATION_CHANCE = 0.02;

export function pickOracleTier(): OracleTier {
  return ORACLE_TIERS[Math.floor(Math.random() * ORACLE_TIERS.length)];
}

export function pickOraclePhrase(tier: OracleTier): string {
  return tier.phrases[Math.floor(Math.random() * tier.phrases.length)];
}

export function oraclePhraseKey(tierId: OracleTierId, phrase: string): string {
  return `${tierId}::${phrase}`;
}
