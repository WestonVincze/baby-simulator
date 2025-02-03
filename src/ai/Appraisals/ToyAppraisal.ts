import { AppealConsideration, DistanceConsideration, LastMovedConsideration } from "../Considerations";
import type { BabyData, ToyState, DebugData } from "$types";
import { debugStore } from "$stores";

/**
 * Should appraisals have a shared context containing all necessary state data for all considerations
 * * singular merged context (derived)?
 * * for now, let's not worry and have the appraisal pass necessary parameters to each consideration
 */

export const ToyAppraisal = (baby: BabyData, toys: ToyState[]) => {
  let bestScore: number = -Infinity;
  let bestToy: ToyState | null = null;
  const debugInfo: DebugData[] = []

  for (const toy of toys) {
    // console.log(toy.data.name);
    const scores: number[] = [];

    // distance score (only 10% effect on total score for now)
    const distanceScore = DistanceConsideration(baby.position, toy.position, 0, 500);
    scores.push(distanceScore * 0.1);
    // console.log(`distance score: ${distanceScore}`);

    // appeal score
    const appealScore = AppealConsideration(baby.aversions, baby.preferences, toy.data.attributes);
    scores.push(appealScore);
    // console.log(`appeal score: ${appealScore}`);

    // last moved score
    const lastMoveScore = toy.lastMoveTime ? LastMovedConsideration(performance.now() - toy.lastMoveTime, 5000) : 0;
    scores.push(lastMoveScore * .2);
    // console.log(`last move score: ${lastMoveScore}`);

    // final score
    const score = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    debugInfo.push({
      name: toy.data.name,
      scores: {
        distance: distanceScore,
        appeal: appealScore,
        lastMove: lastMoveScore,
      }
    });

    if (score > bestScore) {
      bestScore = score;
      bestToy = toy;
    }
  }

  debugStore.set(debugInfo);

  // return ToyID of most desired Toy
  return bestToy;
}
