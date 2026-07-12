import { WHEEL_SEGMENTS } from "./data";

export const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;

// Alternating light/deep gold, echoing the metal wheel in Fortuna's portrait
// rather than the old muddy pie-chart palette.
export const SEGMENT_COLORS = WHEEL_SEGMENTS.map((_, i) => (i % 2 === 0 ? "#e8c766" : "#a9822f"));
