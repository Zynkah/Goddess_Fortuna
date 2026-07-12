import { WHEEL_SEGMENTS } from "./data";

export function pickWheelSegmentIndex(): number {
  return Math.floor(Math.random() * WHEEL_SEGMENTS.length);
}
