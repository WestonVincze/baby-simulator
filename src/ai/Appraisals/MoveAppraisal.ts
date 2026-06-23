import { DistanceConsideration } from "$ai/Considerations";
import type { Context } from "$ai/Reasoner";
import { CELL_SIZE } from "$constants";
import { debugStore, gridStore } from "$stores";
import type { Position } from "$types";

// the maximum positive value a tile can have
const MAX_VALUE = 0.5;

export const MoveAppraisal = (context: Context, targetPosition: Position) => {
  const { x, y } = targetPosition;
  const itemsInRange = gridStore.getItemsWithinOneTile(x, y);

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

    scores.push(value * (distance * 0.2));
  }

  const score = baseValue * (scores.reduce((prev, curr) => prev += curr, 0) / MAX_VALUE); // context.toys.length;// scores.length;
  // WIP
  debugStore.addOrUpdateAppraisal({
    name: `moveTo-(${x},${y})`,
    score,
    considerations: scores.map((score, i) => ({
      name: `item-${i}`,
      score
    }))
  })

  return score;
}
