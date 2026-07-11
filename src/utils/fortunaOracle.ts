export interface OraclePhrase {
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

// Rating is authored per-phrase (not rolled independently) so the poetic
// tone and the star count never contradict each other.
export const ORACLE_PHRASES: OraclePhrase[] = [
  { text: "A door long shut now opens.", rating: 5 },
  { text: "What you have sown returns tenfold.", rating: 5 },
  { text: "The gods themselves incline toward you.", rating: 5 },
  { text: "Fortune walks a step ahead — follow.", rating: 4 },
  { text: "The road opens where you least expect.", rating: 4 },
  { text: "Patience brings reward.", rating: 4 },
  { text: "The path is veiled; walk slowly.", rating: 3 },
  { text: "Neither storm nor calm — the sea simply is.", rating: 3 },
  { text: "What you seek is not yet ready to be found.", rating: 3 },
  { text: "A small stone turns the cart from its road.", rating: 2 },
  { text: "The harvest is thin this season.", rating: 2 },
  { text: "Turn back before the tide.", rating: 1 },
];

export const RATING_WORDS: Record<OraclePhrase["rating"], string> = {
  5: "Exceptional",
  4: "Favorable",
  3: "Uncertain",
  2: "Unfavorable",
  1: "Inauspicious",
};

export function pickOracleOutcome(): OraclePhrase {
  return ORACLE_PHRASES[Math.floor(Math.random() * ORACLE_PHRASES.length)];
}
