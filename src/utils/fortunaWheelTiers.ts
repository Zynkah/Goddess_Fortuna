export type WheelTierId =
  | "great-fortune"
  | "favorable"
  | "twist-of-fate"
  | "uncertain"
  | "delay"
  | "misfortune"
  | "divine-favor";

export interface WheelTier {
  id: WheelTierId;
  label: string;
  emoji: string;
  meaning: string;
  isWin: boolean;
  phrases: string[];
}

// The wheel's six physical segments. Order matters — segments are laid out
// in this sequence starting at 12 o'clock, going clockwise.
export const WHEEL_TIERS: WheelTier[] = [
  {
    id: "great-fortune",
    label: "Great Fortune",
    emoji: "🌞",
    meaning: "A rare, strongly favourable outcome.",
    isWin: true,
    phrases: [
      "Fortune walks beside you.",
      "The wheel rises in your favor.",
      "The gods smile upon this path.",
      "The stars align for your desire.",
      "Your fate shines brightly.",
      "Abundance follows your steps.",
      "The winds carry you toward victory.",
      "This path is blessed.",
      "Destiny opens its gates.",
      "Today, Fortune chooses you.",
    ],
  },
  {
    id: "favorable",
    label: "Favorable",
    emoji: "🌤",
    meaning: "Positive, without guaranteeing success.",
    isWin: true,
    phrases: [
      "The omens are favorable.",
      "The path appears clear.",
      "Opportunity draws near.",
      "Proceed with confidence.",
      "Fortune whispers yes.",
      "The signs point forward.",
      "The tide turns toward your favor.",
      "Your chances grow stronger.",
      "The wheel ascends.",
      "Trust the course before you.",
    ],
  },
  {
    id: "twist-of-fate",
    label: "Twist of Fate",
    emoji: "🌪",
    meaning: "Unexpected — the wheel turns in your favor after all.",
    isWin: true,
    phrases: [
      "What seems certain will change.",
      "Expect the unexpected.",
      "One chance will alter everything.",
      "A hidden hand moves the wheel.",
      "The smallest choice changes destiny.",
      "Fortune delights in surprises.",
      "A stranger may shape your path.",
      "The unexpected becomes your advantage.",
      "Chance arrives unannounced.",
      "Not all victories wear a crown.",
    ],
  },
  {
    id: "uncertain",
    label: "Uncertain",
    emoji: "⚖️",
    meaning: "Fortuna is famously unpredictable.",
    isWin: false,
    phrases: [
      "The wheel has not settled.",
      "The threads remain unwoven.",
      "Fate keeps her counsel.",
      "The answer lies beyond today's horizon.",
      "Even Fortune cannot yet decide.",
      "The signs are veiled.",
      "Time has yet to reveal its hand.",
      "The future remains clouded.",
      "Chance is still in motion.",
      "Not all paths have been revealed.",
    ],
  },
  {
    id: "delay",
    label: "Delay",
    emoji: "🌧",
    meaning: "Not a no — just not now.",
    isWin: false,
    phrases: [
      "Patience invites better fortune.",
      "The hour has not yet come.",
      "Wait until the wheel turns again.",
      "Fortune rewards those who endure.",
      "The moment is still approaching.",
      "Allow destiny more time.",
      "Do not rush the currents of fate.",
      "Another dawn may bring another answer.",
      "The season is not yet ripe.",
      "Your time approaches.",
    ],
  },
  {
    id: "misfortune",
    label: "Misfortune",
    emoji: "🌑",
    meaning: "An elegant warning, not a harsh one.",
    isWin: false,
    phrases: [
      "The omens warn against this path.",
      "Fortune turns away.",
      "The wheel descends.",
      "This road leads to hardship.",
      "The stars offer no blessing.",
      "Fate withholds her favor.",
      "Dark clouds gather ahead.",
      "Choose another course.",
      "The scales are unbalanced.",
      "This venture is ill-fated.",
    ],
  },
];

// Not a physical segment — an ultra-rare bonus roll layered on top of
// landing on Great Fortune, mirroring the old golden-fortune mechanic.
export const DIVINE_FAVOR_TIER: WheelTier = {
  id: "divine-favor",
  label: "Divine Favor",
  emoji: "👑",
  meaning: "Ultra rare — Fortuna herself smiles upon you.",
  isWin: true,
  phrases: [
    "Fortuna herself smiles upon you.",
    "The Wheel pauses in your favor.",
    "You have earned Fortune's blessing.",
    "The Fates weave a golden thread.",
    "The heavens grant uncommon favor.",
    "Prosperity follows your name.",
    "The gods have taken notice.",
    "Fortune's hand guides your journey.",
    "The stars bow before your destiny.",
    "A rare blessing has found you.",
  ],
};

export const ALL_WHEEL_TIERS: WheelTier[] = [...WHEEL_TIERS, DIVINE_FAVOR_TIER];

export const WHEEL_DIVINE_FAVOR_CHANCE = 0.02;

export function pickWheelPhrase(tier: WheelTier): string {
  return tier.phrases[Math.floor(Math.random() * tier.phrases.length)];
}

export function wheelPhraseKey(tierId: WheelTierId, phrase: string): string {
  return `${tierId}::${phrase}`;
}
