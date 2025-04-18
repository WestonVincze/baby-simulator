import { AversionConsideration, DistanceConsideration, RecentInteractionsConsideration, PreferenceConsideration } from "../Considerations";
import type { BabyData, ToyState, DebugData } from "$types";
import { debugStore } from "$stores";

export const ToyAppraisal = (baby: BabyData, toys: ToyState[]) => {
  let bestScore: number = -Infinity;
  let bestToy: ToyState | null = null;
  const debugInfo: DebugData = { babyData: baby, considerations: []};

  for (const toy of toys) {
    const scores: number[] = [];

    // distance score (10% weight)
    const distanceScore = DistanceConsideration(baby.position, toy.position, 0, 500);
    scores.push(distanceScore * 0.1);

    // aversion score
    const aversionScore = AversionConsideration(baby.aversions, toy.data.attributes);
    scores.push(aversionScore);

    // preference score
    const preferenceScore = PreferenceConsideration(baby.preferences, toy.data.attributes);
    scores.push(preferenceScore);

    const recentInteractionsScore = toy.interactions ? RecentInteractionsConsideration(toy.interactions, 5000) : 0;
    scores.push(recentInteractionsScore);

    // add 10% bonus if the toy is already being played with
    const bonusWeight = baby.currentToy?.id === toy.id ? 1.1 : 1;

    // final score
    const score = bonusWeight * (scores.reduce((sum, score) => sum + score, 0) / scores.length);

    debugInfo.considerations.push({
      name: toy.data.name,
      scores: {
        distance: distanceScore,
        preference: preferenceScore,
        aversion: aversionScore,
        recentInteractions: recentInteractionsScore,
        bonusWeight,
        total: score,
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
