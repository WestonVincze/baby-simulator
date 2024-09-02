import { writable } from "svelte/store";
import type { ToyData, ToyProperties } from "../types";

type BabyData = {
  boredom: number,
  currentToy: ToyData | null,
  boredomMap: Record<string, number>,
  favorites: Partial<ToyProperties>
}

const setOrIncrementProperty = (map: Record<string, number>, property: string, value: number) => {
  if (map[property]) {
    map[property] = Math.min(map[property] + value, 100); 
  } else {
    map[property] = value;
  }
  return property;
}

const createBabyStore = () => {
  const { subscribe, update } = writable<BabyData>({
    boredom: 0,
    currentToy: null,
    boredomMap: {},
    favorites: {}
  });

  return {
    subscribe,
    setCurrentToy: (toy: ToyData | null) => {
      update(data => {
        return ({ ...data, currentToy: toy })
      })
    },
    updateStats: () => {
      update(data => {
        const updatedProperties: string[] = [];
        if (data.currentToy !== null) {
          setOrIncrementProperty(data.boredomMap, data.currentToy.properties.shape, 1);
          updatedProperties.push(data.currentToy.properties.shape);
          data.currentToy.properties.colors.forEach(color => {
            setOrIncrementProperty(data.boredomMap, color, 1);
            updatedProperties.push(color);
          })
          data.currentToy.properties.patterns.forEach(pattern => {
            setOrIncrementProperty(data.boredomMap, pattern, 1);
            updatedProperties.push(pattern);
          })
          data.currentToy.properties.sounds.forEach(sound => {
            setOrIncrementProperty(data.boredomMap, sound, 1);
            updatedProperties.push(sound);
          })
          Object.keys(data.currentToy.properties.attributes).forEach(attribute => {
            const value = data.currentToy?.properties.attributes[attribute] || 0;
            if (value === 0) return;

            setOrIncrementProperty(data.boredomMap, attribute, value);
            updatedProperties.push(attribute);
          })
          data.boredom = Math.max(data.boredom - 1, 0);
        } else {
          data.boredom = Math.min(data.boredom + 1, 100);
        }
        Object.keys(data.boredomMap).forEach(property => {
          if (updatedProperties.findIndex(updated => updated === property) === -1) {
            data.boredomMap[property] = Math.max(data.boredomMap[property] -= 0.5, 0);
          }
        })
        // console.table(data.boredomMap);
        return data;
      })
    }
  }
}

export const babyStore = createBabyStore();

const updateBabyInterests = () => {
  // decrease interest for each property of the held toy
  // increase interest for every other property
}

/*
const Baby: BabyData = {
  boredom: 0,
  currentToy: null,
  boredomMap: {
    colors: ["red"],
    shape: ["triangle"],
  },
  favorites: {
    shape: "circle",
    colors: ["red"],
    complexity: 10,
  }
}
*/

/**
 * BABY DATA
 * * boredom
 * * current toy (and data)
 * * property interest map => how interested in each property the baby is
 * * recent toys (last 3?)
 * * favorite property bias => preference of toys with favorite properties
 * * * color
 * * * shape
 * * * sound
 * * personality => factors that alter perceived value in a toy
 * * * curiosity => enjoys complex toys and values new toys more
 * * * mobility => prefers toys that move or force baby to move
 * * * attachment => maintains interest in the same types of toys for longer
 * 
 * TOY DATA
 * * toy properties
 * * * color
 * * * * primary
 * * * * secondary 
 * * * * number of colors 
 * * * shape (is shape too generic?)
 * * * * number of sides
 * * * * symmetry
 * * * * consistency (ex: a square is )
 * * * * variance (thick vs thin, )
 * * * luster
 * * * smoothness
 * * * complexity
 * * * sound
 * * * interactivity
 * * * patterns
 * * distance to baby
 * * time since last move
 * 
 */