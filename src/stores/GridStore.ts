import { CELL_SIZE, PLAY_MAT_HEIGHT, PLAY_MAT_WIDTH } from "$constants";
import type { Grid, GridItem } from "$types";
import { writable, get } from "svelte/store";

const createGridStore = () => {
  const cols = Math.floor(PLAY_MAT_WIDTH / CELL_SIZE);
  const rows = Math.floor(PLAY_MAT_HEIGHT / CELL_SIZE);

  const initialGrid: Grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => [])
  )

  const { subscribe, update } = writable<Grid>(initialGrid);

  const addItem = (item: GridItem) => {
    update(grid => {
      const { x, y } = getGridCoordinates(item.x, item.y);
      grid[y][x].push(item);
      return grid;
    })
  }

  const removeItem = (itemId: string) => {
    update(grid => {
      for (let row of grid) {
        for (let cell of row) {
          const index = cell.findIndex(item => item.id === itemId);
          if (index !== -1) {
            cell.splice(index, 1);
            return grid;
          }
        }
      }
      return grid;
    })
  }

  const getGridCoordinates = (x: number, y: number) => {
    return {
      x: Math.floor(x / CELL_SIZE),
      y: Math.floor(y / CELL_SIZE)
    }
  }

  const getAdjacentItems = (x: number, y: number) => {
    const { x: gridX, y: gridY } = getGridCoordinates(x, y);
    const adjacentItems: GridItem[] = [];
    const grid = get(gridStore);

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = gridX + i;
        const newY = gridY + j;
        if (newX >= 0 && newX < cols && newY >= 0 && newY < rows) {
          adjacentItems.push(...grid[newY][newX]);
        }
      }
    }

    return adjacentItems;
  }

  return {
    subscribe,
    addItem,
    removeItem,
    getGridCoordinates,
    getAdjacentItems
  }
}

export const gridStore = createGridStore();
