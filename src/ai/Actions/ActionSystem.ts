import { randomizePosition } from "$helpers";
import { babyStore, gridStore, toyStore, type GridStore } from "$stores";
import type { BabyData, Grid, Position, ToyState } from "$types";
import { get } from "svelte/store";

export type Action = { type: string; params?: Record<string, any> };

const validateMove = (target: Position, grid: Grid) => {
  return grid[target.y][target.x].walkable;
}

const validatePickup = (
  toy: ToyState,
  baby: BabyData,
  gridStore: GridStore
) => {
  const babyCoordinates = gridStore.getGridCoordinates(baby.position.x, baby.position.y)
  const items = gridStore.getItemsWithinOneTile(babyCoordinates.x, babyCoordinates.y);

  return items.filter(item => toy.id === item.id);
}

export const ActionSystem = {
  executeAction: (
    action: Action,
  ) => {
    const baby = get(babyStore);
    const grid = get(gridStore);
    switch (action.type) {
      case 'move':
        console.log('Baby is moving...');
        if (!action.params || action.params.x === undefined || action.params.y === undefined) break;

        const isValidMove = validateMove({ x: action.params.x, y: action.params.y }, grid);
        if (isValidMove) {
          const targetPosition = grid[action.params.y][action.params.x].coordinates;
          babyStore.updatePosition(targetPosition);
        }
        break;
      case 'pickupToy':
        console.log('Baby is picking up toy...');
        if (!action.params || !action.params.toyId) break;

        const toy = toyStore.getToyById(action.params.toyId);
        if (!toy) break;
        const isValidPickup = validatePickup(toy, baby, gridStore);

        if (isValidPickup) {
          babyStore.pickupToy(toy);
          toyStore.moveToy(
            action.params.toyId,
            "Baby",
            baby.position.x,
            baby.position.y
          );
        }
        break;
      case 'dropToy':
        console.log('Baby is dropping toy...');
        if (!baby.currentToy) {
          console.error("Trying to drop toy when no toy is held...")
          break;
        };

        const { x, y } = randomizePosition(baby.position);
        toyStore.dropToy(baby.currentToy.id, x, y);
        babyStore.dropToy();
        break;
      case 'idle':
        console.log('Baby is idling...');
        break;
      case 'play':
        console.log('Baby is playing...');
        break;
      default:
        console.error('Unknown action.');
    }
  },
};