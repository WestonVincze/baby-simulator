/**
 * 
 */

import type { Action } from "$ai/Actions/ActionSystem"
import { MoveAppraisal } from "$ai/Appraisals/MoveAppraisal"
import { AversionConsideration, PreferenceConsideration, RecentInteractionsConsideration } from "$ai/Considerations"
import { type BabyStore, type GridStore, type ToyStore } from "$stores"
import type { BabyData, Grid, ToyState } from "$types"
import { get } from "svelte/store"

export type Context = {
  baby: BabyData
  toys: ToyState[]
  toyValue: Record<string, number>
  grid: Grid
}

export const Reasoner = (
  babyStore: BabyStore,
  toyStore: ToyStore,
  gridStore: GridStore
): Action => {
  /**
   * BUILD CONTEXT
   * * value of each toy
   * * * aversion, 
   */
  let action: Action = { type: "idle" };
  const toyValue: Record<string, number> = {}
  const baby = get(babyStore);
  const grid = get(gridStore);
  const toys = get(toyStore);

  toys.forEach(toy => {
    const scores: number[] = [];
    // aversion score
    const aversionScore = AversionConsideration(baby.aversions, toy.data.attributes);
    scores.push(aversionScore);

    // preference score
    const preferenceScore = PreferenceConsideration(baby.preferences, toy.data.attributes);
    scores.push(preferenceScore);

    // recent interactions score
    const recentInteractionsScore = toy.interactions ? RecentInteractionsConsideration(toy.interactions, 5000) : 0;
    scores.push(recentInteractionsScore);

    toyValue[toy.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  });

  const context: Context = {
    baby,
    toys,
    toyValue,
    grid
  }

  /**
   * PICKUP TOY
   * * add for each toy within range of being picked up
   */
  /*
  const toysInRange = toys.filter(toy =>
    calculateDistance(toy.position, baby.position) < 150
  );

  console.log("TOYS IN RANGE");
  for (const toy of toysInRange) {
    console.log(toy.id);
  }
  */

  /**
   * MOVE
   * * assess value for each tile
   */
  const gridScores: number[][] = [];

  let bestPosition = null;
  let bestScore = 0;

  for (let i = 0; i < grid.length; i++) {
    const rowScores: number[] = []
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].items.length > 0) continue;

      const score = MoveAppraisal(context, { x: j,  y: i });
      if (score > bestScore) {
        bestScore = score;
        bestPosition = grid[i][j].coordinates;
      }
      rowScores.push(parseFloat(score.toFixed(2)));
      gridStore.setTileValue(j, i, parseFloat(score.toFixed(2)));
    }
    gridScores.push(rowScores);
  }
  // console.table(gridScores);
  if (bestPosition) {
    action = { type: "move", target: bestPosition }
  }

  /**
   * DROP
   * * add if a toy is being held
   */
  return action;
}
