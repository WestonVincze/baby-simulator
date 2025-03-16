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

export const MoveAppraisal = (context: Context, targetPosition: Position) => {
  const { x, y } = targetPosition;
  const itemsInRange = [
    ...context.grid[y][x].items,
    ...gridStore.getAdjacentItems(x, y)
  ]

  if (itemsInRange.length === 0) return 0;

  const scores = [];

  for (const item of itemsInRange) {
    const value = context.toyValue[item.id];
    const distance = DistanceConsideration({ x: x * CELL_SIZE, y: y * CELL_SIZE }, { x: item.x, y: item.y })

    scores.push(value * distance);
  }

  return scores.reduce((prev, curr) => prev += curr, 0) / scores.length;
}
