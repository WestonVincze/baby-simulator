/**
 * 
 */

import { calculateDistance } from "$helpers"
import type { BabyData, Grid, ToyState } from "$types"

type Context = {
  baby: BabyData
  toys: ToyState[]
  toyValue: Record<string, number>
}

export const Reasoner = (baby: BabyData, toys: ToyState[], grid: Grid) => {
  /**
   * CONTEXT
   * * value of each toy
   * * * aversion, 
   */
  const toyValue: Record<string, number> = {}

  toys.forEach(toy => toyValue[toy.id] = 0);

  const context: Context = {
    baby,
    toys,
    toyValue
  }

  /**
   * PICKUP TOY
   * * add for each toy within range of being picked up
   */
  const toysInRange = toys.filter(toy =>
    calculateDistance(toy.position, baby.position) < 150
  );

  console.log("TOYS IN RANGE");
  for (const toy of toysInRange) {
    console.log(toy.id);
  }

  /**
   * MOVE
   * * add for each tile
   */
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      for (let k = 0; k < grid[i][j].items.length; k++) {
        console.log(grid[i][j].items[k].id);
      }
    }
  }

  /**
   * DROP
   * * add if a toy is being held
   */
}
