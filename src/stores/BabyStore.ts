import { writable } from "svelte/store";
import type { ToyState, ToyAttribute, BabyData } from "$types";
import { calculateNBA } from "$helpers";

/**
 * 
 * @param map 
 * @param property 
 * @param value 
 * @returns 
 */
const setOrIncrementAttribute = (map: Record<string, number>, property: string, value: number) => {
  if (map[property]) {
    map[property] = Math.min(map[property] + value / 100, 1); 
  } else {
    map[property] = value / 100;
  }
  return property;
}

const initialState: BabyData = Object.freeze({
  position: { x: 400, y: 250 },
  boredom: 0,
  currentToy: null,
  aversions: {},
  preferences: {}
});

const createBabyStore = () => {
  const { subscribe, update } = writable<BabyData>({ ...initialState });

  return {
    subscribe,
    setCurrentToy: (toy: ToyState | null) => {
      update(data => {
        return ({ ...data, currentToy: toy })
      })
    },
    getCurrentToyAttributes: () => {
      let currentAttributes: string[] = [];
      update(data => {
        if (data.currentToy !== null) {
          const { attributes } = data.currentToy.data;
          currentAttributes = [...Object.keys(attributes)];
        }
        return data;
      });
      return currentAttributes;
    },
    updateStats: () => {
      update(data => {
        const updatedProperties: string[] = [];
        const NbaValues: number[] = [];

        // update aversions and boredom based on data from currentToy
        if (data.currentToy !== null) {
          const { attributes } = data.currentToy.data;

          /*
          shapes.forEach(shape => {
            setOrIncrementAttribute(data.aversions, shape, 1 / shapes.length);
            updatedProperties.push(shape);
            NbaValues.push(calculateNBA(data.aversions[shape] || 0, 1))
          })

          colors.forEach(color => {
            setOrIncrementAttribute(data.aversions, color, 1 / colors.length);
            updatedProperties.push(color);
            NbaValues.push(calculateNBA(data.aversions[color] || 0, 1))
          })

          patterns.forEach(pattern => {
            setOrIncrementAttribute(data.aversions, pattern, 1 / patterns.length);
            updatedProperties.push(pattern);
            NbaValues.push(calculateNBA(data.aversions[pattern] || 0, 1))
          })

          sounds.forEach(sound => {
            setOrIncrementAttribute(data.aversions, sound, 1 / sounds.length);
            updatedProperties.push(sound);
            NbaValues.push(calculateNBA(data.aversions[sound] || 0, 1))
          })
          */

          Object.keys(attributes).forEach(attribute => {
            const value = attributes[attribute as ToyAttribute] || 0;
            if (value === 0) return;

            setOrIncrementAttribute(data.aversions, attribute, value);
            updatedProperties.push(attribute);
            NbaValues.push(calculateNBA(data.aversions[attribute as ToyAttribute] || 0, value))
          })
        } 

        // depreciate aversion for properties that currentToy does not contain
        Object.keys(data.aversions).forEach(key => {
          const property = key as ToyAttribute;

          if (updatedProperties.findIndex(updated => updated === property) === -1) {
            data.aversions[property] = Math.max(data.aversions[property]! -= 0.01, 0);
          }
        })

        const NbaTotal = NbaValues.length > 0 ? NbaValues.reduce((prev, curr) => prev += curr) / NbaValues.length : 1;

        data.boredom = Math.min(Math.max(data.boredom + NbaTotal / 100, 0), 1);

        return data;
      })
    },
    resetBabyStore: () => {
      update(data => ({ ...data, boredom: 0, aversions: {}, preferences: {} }))
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