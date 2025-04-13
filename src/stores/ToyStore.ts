import { get, writable } from "svelte/store"
import type { DropZone, InteractionType, ToyState } from "$types";
import { gridStore } from "./GridStore";
import { constrainPositionToPlayMat, lerp } from "$helpers";
import { TOY_SIZE } from "$constants";

const MAX_INTERACTIONS = 10;

const createToyStore = () => {
  const { subscribe, update } = writable<ToyState[]>([]);

  // TODO: check if this reactivity breaking mutation is significant
  const addInteraction = (toy: ToyState, type: InteractionType) => {
    const timestamp = performance.now();
    if (!toy.interactions) toy.interactions = [];
    toy.interactions.push({ type, timestamp });

    if (toy.interactions.length > MAX_INTERACTIONS) {
      toy.interactions.shift(); // only keep the last x interactions
    }
  };

  let animationFrameId: number;

  const updatePositionSmoothly = (id: string, targetPosition: { x: number, y: number }) => {
    const step = () => {
      update(currentState => {
        const toyIndex = currentState.findIndex(toy => toy.id === id);
        if (toyIndex === -1) return currentState;

        const toy = currentState[toyIndex];

        const { position } = toy;
        const t = 0.2; // interpolation factor (0 < t <= 1)
        const newPosition = {
          x: lerp(position.x, targetPosition.x, t),
          y: lerp(position.y, targetPosition.y, t)
        };

        if (Math.abs(newPosition.x - targetPosition.x) < 0.5 && Math.abs(newPosition.y - targetPosition.y) < 0.5) {
          cancelAnimationFrame(animationFrameId);
          toy.position = targetPosition;
          return currentState;
        }

        currentState[toyIndex].position = newPosition;
        return currentState;
      });

      animationFrameId = requestAnimationFrame(step);
    };

    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(step);
  };

  return {
    subscribe,
    resetToys: () => {
      update(() => []);
    },
    addToy: (toy: Pick<Partial<ToyState>, "position"> & Omit<ToyState, "id" | "position">) => {
      update(toys => [
        ...toys,
        { ...toy, id: (toys.length + 1).toString(), position: toy.position || { x: 0, y: 0 }},
      ]);
    },
    moveToy: (id: string, loc: DropZone, x: number, y: number) => {
      update(toys => {
        const toy = toys.find(toy => toy.id === id);
        if (!toy) return toys;

        toy.position = constrainPositionToPlayMat(
          { x, y },
          { width: TOY_SIZE, height: TOY_SIZE }
        );


        if (toy.loc === "PlayMat") {
          gridStore.removeItem(id);
        }

        if (loc === "PlayMat") {
          gridStore.addItem({ id: toy.id, x, y });
          addInteraction(toy, "move");
        }

        toy.loc = loc;

        return toys;
      });
    },
    dropToy: (id: string, x: number, y: number) => {
      update(toys => {
        const toy = toys.find(toy => toy.id === id);
        if (!toy) return toys;
        const targetPosition = constrainPositionToPlayMat(
          { x, y },
          { width: TOY_SIZE, height: TOY_SIZE }
        );

        addInteraction(toy, "drop");

        gridStore.addItem({ id: toy.id, x, y });

        toy.loc = "PlayMat";
        toy.position = targetPosition;
        /** TODO: fix how position state is managed... not worth the time right now */
        // updatePositionSmoothly(id, targetPosition);

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
export type ToyStore = typeof toyStore;
