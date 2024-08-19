import { writable } from "svelte/store"

type Toy = {
  id: number,
  loc: "ToyBox" | "PlayMat",
  color: string,
  type: "triangle" | "circle" | "square",
  position?: { x: number, y: number }
}

const createToyStore = () => {
  const { subscribe, update } = writable<Toy[]>([]);

  return {
    subscribe,
    addToy: (toy: Omit<Toy, "id">) => update(toys => [
      ...toys,
      { ...toy, id: toys.length + 1}
    ]),
    updateToy: (id: number, loc: "PlayMat" | "ToyBox", x: number, y: number) => update(toys => {
      const toy = toys.find(toy => toy.id === id);
      if (!toy) return toys;
      toy.loc = loc;
      toy.position = { x, y };
      return toys;
    })
  }
}

export const toys = createToyStore();
