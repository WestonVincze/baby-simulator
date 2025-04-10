import { derived } from "svelte/store";
import { babyStore, gridStore, toyStore, type BabyStore, type GridStore, type ToyStore } from "$stores";
import { AversionConsideration, PreferenceConsideration, RecentInteractionsConsideration } from "$ai/Considerations";
import type { IContext } from "$ai/Reasoner/Reasoner";
import type { BabyData, Grid, ToyState } from "$types";

export interface Context extends IContext {
  baby: BabyData
  toys: ToyState[]
  grid: Grid
  toyValue: Record<string, number>
}

export const contextStore = derived<[BabyStore, ToyStore, GridStore], Context>(
  [babyStore, toyStore, gridStore],
  ([$babyStore, $toyStore, $gridStore]) => {
    const toyValue: Record<string, number> = {};
    const currentTime = performance.now();

    $toyStore.forEach((toy) => {
      if (toy.loc === "ToyBox") return;

      // Mark the value of a toy as -1 if it was dropped within the last 5 seconds
      if (
        toy.interactions &&
        toy.interactions?.some((interaction) => {
          if (interaction.type !== "drop") return false;

          return currentTime - interaction.timestamp <= 3000;
        })
      ) {
        toyValue[toy.id] = -1;
        return;
      }

      const scores: number[] = [];

      // aversion score
      const aversionScore = AversionConsideration($babyStore.aversions, toy.data.attributes);
      scores.push(aversionScore);

      // preference score
      const preferenceScore = PreferenceConsideration($babyStore.preferences, toy.data.attributes);
      scores.push(preferenceScore);

      // recent interactions score
      const recentInteractionsScore = toy.interactions ? RecentInteractionsConsideration(toy.interactions, 5000) : 0;
      scores.push(recentInteractionsScore);

      toyValue[toy.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    return {
      baby: $babyStore,
      toys: $toyStore,
      grid: $gridStore,
      toyValue,
    }
  }
);
