import { get, writable } from "svelte/store"
import type { DropZone, InteractionType, ToyState } from "$types";

const MAX_INTERACTIONS = 10;

const createToyStore = () => {
  const { subscribe, update } = writable<ToyState[]>([]);

  const addInteraction = (toy: ToyState, type: InteractionType) => {
    const timestamp = performance.now();
    if (!toy.interactions) toy.interactions = [];
    toy.interactions.push({ type, timestamp });

    if (toy.interactions.length > MAX_INTERACTIONS) {
      toy.interactions.shift(); // only keep the last x interactions
    }
  };

  return {
    subscribe,
    resetToys: () => {
      update(() => []);
    },
    addToy: (toy: Pick<Partial<ToyState>, "position"> & Omit<ToyState, "id" | "position">) => update(toys => [
      ...toys,
      { ...toy, id: (toys.length + 1).toString(), position: toy.position || { x: 0, y: 0 }},
    ]),
    moveToy: (id: string, loc: DropZone, x: number, y: number) => {
      update(toys => {
        const toy = toys.find(toy => toy.id === id);
        if (!toy) return toys;
        toy.loc = loc;
        toy.position = { x, y };
        addInteraction(toy, "move");
        return toys;
      });
    },
    interactWithToy: (id: string) => {
      update(toys => {
        const toy = toys.find(toy => toy.id === id);
        if (!toy) return toys;

        addInteraction(toy, "sound");

        return toys;
      })

    },
    getToyById: (id: string) => {
      const toys = get(toyStore);
      return toys.find(toy => toy.id === id);
    }
  }
}

export const toyStore = createToyStore();
