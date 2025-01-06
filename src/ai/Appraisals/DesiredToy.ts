import { AppealConsideration, DistanceConsideration } from "../Considerations";
import type { BabyData, ToyState } from "$types";

/**
 * Should appraisals have a shared context containing all necessary state data for all considerations
 * * singular merged context (derived)?
 * * for now, let's not worry and have the appraisal pass necessary parameters to each consideration
 */

export const ToyAppraisal = (baby: BabyData, toys: ToyState[]) => {
  let bestScore: number = -Infinity;
  let bestToy: ToyState | null = null;

  for (const toy of toys) {
    const scores: number[] = [];

    // distance score (only 1% effect on total score for now)
    scores.push(DistanceConsideration(baby.position, toy.position, 0, 500) * .01);

    // appeal score
    scores.push(AppealConsideration(baby.aversions, baby.preferences, toy.data.attributes));

    // final score
    const score = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    console.log(score)

    if (score > bestScore) {
      bestScore = score;
      bestToy = toy;
    }
  }

  // return ToyID of most desired Toy
  return bestToy;
}
