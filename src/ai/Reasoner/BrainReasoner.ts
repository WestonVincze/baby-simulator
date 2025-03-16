/**
 * 
 */

import { MoveAppraisal } from "$ai/Appraisals/MoveAppraisal"
import { gridStore } from "$stores"
import type { BabyData, Grid, ToyState } from "$types"

export type Context = {
  baby: BabyData
  toys: ToyState[]
  toyValue: Record<string, number>
  grid: Grid
}

export const Reasoner = (baby: BabyData, toys: ToyState[], grid: Grid) => {
  /**
   * CONTEXT
   * * value of each toy
   * * * aversion, 
   */
  const toyValue: Record<string, number> = {}

  toys.forEach(toy => toyValue[toy.id] = 1);

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
  const gridScores: number[][] = []
  for (let i = 0; i < grid.length; i++) {
    const rowScores: number[] = []
    for (let j = 0; j < grid[i].length; j++) {
      const score = MoveAppraisal(context, { x: j,  y: i });
      rowScores.push(parseFloat(score.toFixed(2)))
      gridStore.setTileValue(j, i, parseFloat(score.toFixed(2)));
    }
    gridScores.push(rowScores);
  }
  // console.table(gridScores);

  /**
   * DROP
   * * add if a toy is being held
   */
}
