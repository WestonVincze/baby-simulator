import { writable } from "svelte/store";
import { CELL_SIZE } from "$constants";

export interface PlayMatDimensions {
  cols: number;
  rows: number;
  logicalWidth: number;
  logicalHeight: number;
  cellSize: number;
}

const DEFAULT_COLS = 16;
const DEFAULT_ROWS = 10;

function createPlayMatStore() {
  const { subscribe, update, set } = writable<PlayMatDimensions>({
    cols: DEFAULT_COLS,
    rows: DEFAULT_ROWS,
    logicalWidth: DEFAULT_COLS * CELL_SIZE,
    logicalHeight: DEFAULT_ROWS * CELL_SIZE,
    cellSize: CELL_SIZE,
  });

  function setDimensions(width: number, height: number) {
    const cols = Math.max(1, Math.floor(width / CELL_SIZE));
    const rows = Math.max(1, Math.floor(height / CELL_SIZE));
    set({
      cols,
      rows,
      logicalWidth: cols * CELL_SIZE,
      logicalHeight: rows * CELL_SIZE,
      cellSize: CELL_SIZE,
    });
  }

  return {
    subscribe,
    update,
    set,
    setDimensions,
  };
}

export const playMatStore = createPlayMatStore();
