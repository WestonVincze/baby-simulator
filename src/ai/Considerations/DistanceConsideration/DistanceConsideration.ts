import { calculateDistance, clamp, rescale } from "$helpers"

/**
 * Calculates utility value for distance
 * * position of baby
 * * position of toy
 * * baby's willingness to "travel"
 * * * min range / max range?
 */
export const DistanceConsideration = (
  babyPosition: { x: number, y: number },
  toyPosition: {x: number, y: number},
  minRange: number = 0,
  maxRange: number = 50,
) => {
  const distance = calculateDistance(babyPosition, toyPosition);
  // console.log(distance);

  // console.log(rescale(distance, minRange, maxRange));
  return clamp(1 - rescale(distance, minRange, maxRange));
}
