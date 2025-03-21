import { randomizePosition } from "$helpers";
import type { BabyStore, GridStore, ToyStore } from "$stores";
import type { BabyData, Grid, Position, ToyState } from "$types";
import { get } from "svelte/store";

type Action = 
  | { type: "move"; target: Position }
  | { type : "pickupToy", toy: ToyState }
  | { type : "dropToy" }
  | { type : "idle" };

const validateMove = (target: Position, grid: Grid) => {
  return grid[target.x][target.y].walkable;
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
    babyStore: BabyStore,
    toyStore: ToyStore,
    gridStore: GridStore
  ) => {
    const baby = get(babyStore);
    const grid = get(gridStore);
    const toys = get(toyStore);
    switch (action.type) {
      case 'move':
        const isValidMove = validateMove(action.target, grid);
        if (isValidMove) {
          babyStore.updatePosition(action.target);
        }
        break;
      case 'pickupToy':
        const isValidPickup = validatePickup(action.toy, baby, gridStore);
        if (isValidPickup) {
          babyStore.pickupToy(action.toy);
          toyStore.moveToy(
            action.toy.id,
            "Baby",
            baby.position.x,
            baby.position.y
          );
        }
        break;
      case 'dropToy':
        if (!baby.currentToy) {
          console.error("Trying to drop toy when no toy is held...")
          break;
        };

        const { x, y } = randomizePosition(baby.position);
        toyStore.moveToy(baby.currentToy.id, "PlayMat", x, y);
        babyStore.dropToy();
        break;
      case 'idle':
        console.log('Baby is idling...');
        break;
      default:
        console.error('Unknown action.');
    }
  },
};