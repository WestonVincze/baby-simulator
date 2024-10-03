import { writable } from "svelte/store";
import type { ToyAttributes, ToyData, ToyProperty } from "../types";

type BabyData = {
  currentToy: ToyData | null,
  boredom: number,               // 0-100
  aversions: ToyAttributes,      // 0-100
  favorites: ToyAttributes,      // 0-100
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
    aversions: {},
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
        // update aversions and boredom based on data from currentToy
        if (data.currentToy !== null) {
          const { shapes, colors, patterns, sounds, attributes } = data.currentToy.properties;

          shapes.forEach(shape => {
            setOrIncrementProperty(data.aversions, shape, 1);
            updatedProperties.push(shape);
          })

          colors.forEach(color => {
            setOrIncrementProperty(data.aversions, color, 1);
            updatedProperties.push(color);
          })

          patterns.forEach(pattern => {
            setOrIncrementProperty(data.aversions, pattern, 1);
            updatedProperties.push(pattern);
          })

          sounds.forEach(sound => {
            setOrIncrementProperty(data.aversions, sound, 1);
            updatedProperties.push(sound);
          })

          Object.keys(attributes).forEach(attribute => {
            const value = attributes[attribute as ToyProperty] || 0;
            if (value === 0) return;

            setOrIncrementProperty(data.aversions, attribute, value);
            updatedProperties.push(attribute);
          })

          data.boredom = Math.max(data.boredom - 1, 0);
        } else {
          data.boredom = Math.min(data.boredom + 1, 100);
        }

        // depreciate aversion for properties that currentToy does not contain
        Object.keys(data.aversions).forEach(key => {
          const property = key as ToyProperty;

          if (updatedProperties.findIndex(updated => updated === property) === -1) {
            data.aversions[property] = Math.max(data.aversions[property]! -= 0.5, 5);
          }
        })

        // console.table(data.boredomMap);
        return data;
      })
    }
  }
}

export const babyStore = createBabyStore();

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