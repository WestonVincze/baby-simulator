/**
 * Evaluates the value of a toy based on how recently it was moved
 * https://www.desmos.com/calculator/sdo7m9kpqp
 * Returns higher value within a short time with a quick falloff and slowly declines to 0
 */
export const LastMovedConsideration = (timeSinceLastMove: number, maxTime: number) => {
  const w = Math.min(timeSinceLastMove / maxTime, 1);
  const exponent = -(w * 18) + 6;
  const denominator = 1 + (Math.E * 2) ** exponent;
  return 1 - (1 / denominator);
}
