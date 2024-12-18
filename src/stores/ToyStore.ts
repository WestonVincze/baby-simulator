import { writable } from "svelte/store"
import type { DropZone, ToyState } from "../types";

const createToyStore = () => {
  const { subscribe, update } = writable<ToyState[]>([]);

  return {
    subscribe,
    resetToys: () => {
      update(state => []);
    },
    addToy: (toy: Pick<Partial<ToyState>, "position"> & Omit<ToyState, "id" | "position">) => update(toys => [
      ...toys,
      { ...toy, id: (toys.length + 1).toString(), position: toy.position || { x: 0, y: 0 }},
    ]),
    updateToy: (id: string, loc: DropZone, x: number, y: number) => {
      update(toys => {
        const toy = toys.find(toy => toy.id === id);
        if (!toy) return toys;
        toy.loc = loc;
        toy.position = { x, y };
        toy.lastMoveTime = performance.now();
        return toys;
      });
    }
  }
}

export const toyStore = createToyStore();
