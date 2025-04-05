import type { Interaction } from "$types";

const MAX_BONUS = 8;

/**
 * Calculates the time bonus based on how recently a toy was interacted with.
 * https://www.desmos.com/calculator/sdo7m9kpqp
 * Returns higher value within a short time with a quick falloff and slowly declines to 0
 */
const getTimeBonus = (interactionTime: number, maxTime: number) => {
  const w = Math.min(interactionTime / maxTime, 1);
  const exponent = -(w * 18) + 6;
  const denominator = 1 + (Math.E * 2) ** exponent;
  return 1 - (1 / denominator);
}

/**
 * Evaluates the value of a toy based on its most recent interactions
 */
export const RecentInteractionsConsideration = (interactions: Interaction[], maxTime: number) => {
  let moveBonus = 1;
  let soundBonus = 2;

  const bonus = interactions
    .filter(interaction => {
      const time = performance.now() - interaction.timestamp;
      if (time <= maxTime) return true;
      return false
    })
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce((prev, curr) => {
      let bonus = 0;
      if (curr.type === "move") {
        bonus = moveBonus;
        moveBonus *= 0.6;
      } else if (curr.type === "sound") {
        bonus = soundBonus;
        soundBonus *= 0.6;
      }
      return prev += bonus * getTimeBonus(performance.now() - curr.timestamp, maxTime);
    }, 0);

  return Math.min(bonus / MAX_BONUS, 1);
}
