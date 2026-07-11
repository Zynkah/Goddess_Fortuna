import { SEGMENT_ANGLE } from "./constants";

export function getWheelTargetRotation(index: number, spins = 5): number {
  return 360 * spins + (360 - (index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2));
}
