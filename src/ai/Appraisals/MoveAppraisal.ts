/**
 * Issue: with grid based movement baby will not move directly to toys. Therefore, we need to have a system in place to walk to toys within X range.
 * * OPTION A: separate into "MoveToGrid" and "MoveToPosition" where we always compare all grid locations using MoveToGrid and any points of interest in x range using MoveToPosition
 * * OPTION B: evaluate all using "MoveTo" and dynamically add points of interest within x range to the pool of options
 * * OPTION C: compare all grid cells and all points of interest at once
 * 
 */

import { DistanceConsideration } from "$ai/Considerations";
import type { Context } from "$ai/Reasoner";
import { CELL_SIZE } from "$constants";
import { gridStore } from "$stores";
import type { Position } from "$types";

// the maximum positive value a tile can have
const MAX_VALUE = 1;

export const MoveAppraisal = (context: Context, targetPosition: Position) => {
  const { x, y } = targetPosition;
  // TODO: increase value of tiles that have items to interact with... OR have an "objectInRange" variant of moveAppraisal that has a higher base value to force baby to move toward objects
  const itemsInRange = [
    ...context.grid[y][x].items,
    ...gridStore.getAdjacentItems(x, y)
  ]

  if (itemsInRange.length === 0) return 0;

  const gridCoordinates = context.grid[y][x].coordinates;

  // calculate value of tile based on its distance
  const baseValue = DistanceConsideration(
    context.baby.position,
    gridCoordinates,
    CELL_SIZE,
    1000
  );

  const scores = [];

  // calculate scores of items near tile
  for (const item of itemsInRange) {
    // TODO: value should be based on the NBA, and can be positive or negative
    const value = context.toyValue[item.id];
    const distance = DistanceConsideration(
      gridCoordinates,
      { x: item.x, y: item.y },
      0,
      CELL_SIZE * 2 
    );

    scores.push(value * distance);
  }

  return baseValue * (scores.reduce((prev, curr) => prev += curr, 0) / MAX_VALUE); // context.toys.length;// scores.length;
}
