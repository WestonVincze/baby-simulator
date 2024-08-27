import { writable } from "svelte/store"
import type { DropZone, ToyData } from "../types";

const createToyStore = () => {
  const { subscribe, update } = writable<ToyData[]>([]);

  return {
    subscribe,
    addToy: (toy: Pick<Partial<ToyData>, "position"> & Omit<ToyData, "id" | "position">) => update(toys => [
      ...toys,
      { ...toy, id: (toys.length + 1).toString(), position: toy.position || { x: 0, y: 0 }},
    ]),
    updateToy: (id: string, loc: DropZone, x: number, y: number) => update(toys => {
      const toy = toys.find(toy => toy.id === id);
      if (!toy) return toys;
      toy.loc = loc;
      toy.position = { x, y };
      toy.lastMoveTime = performance.now();
      return toys;
    })
  }
}

export const toys = createToyStore();
