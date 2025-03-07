import { writable } from "svelte/store";
import type { ToyState, ToyAttribute, BabyData, ToyAttributes, AttributeCategory } from "$types";
import { calculateNBA, getRandomAttribute } from "$helpers";
import { ToyAppraisal } from "$ai/Appraisals";
import { PLAY_MAT_HEIGHT } from "$constants";
import { PLAY_MAT_WIDTH } from "$constants";

const MAX_AVERSION_NEGATION = 0.2;
const MAX_BOREDOM_BOOST = 2;

const setOrIncrementAttribute = (attributeMap: ToyAttributes, property: ToyAttribute, value: number, category: AttributeCategory) => {
  if (attributeMap[property]) {
    attributeMap[property].value = Math.min(attributeMap[property].value + value / 100, 1); 
  } else {
    attributeMap[property] = { value: value / 100, category };
  }
  return property;
}

const setInitialState = () => ({
  position: { x: 400, y: 250 },
  boredom: 0,
  currentToy: null,
  desiredToy: null,
  aversions: {},
  preferences: {}
})

const constrainPosition = (position: { x: number, y: number }, xMin: number, yMin: number, xMax: number, yMax: number) => {
  return ({
    x: Math.min(Math.max(xMin, position.x), xMax),
    y: Math.min(Math.max(yMin, position.y), yMax),
  })
}

const createBabyStore = () => {
  const { subscribe, update } = writable<BabyData>(setInitialState());

  return {
    subscribe,
    updatePosition: (position: { x?: number, y?: number }) => {
      const { x, y } = position;
      if (x === 0 && y === 0) return;

      update(state => {
        const constrainedPosition = constrainPosition(
          {
            x: state.position.x + (x || 0),
            y: state.position.y + (y || 0)
          },
          75,
          100,
          PLAY_MAT_WIDTH - 75,
          PLAY_MAT_HEIGHT - 100 
        );
        return ({
          ...state,
          position: constrainedPosition
        });
      });
    },
    setCurrentToy: (toy: ToyState | null) => {
      update(data => {
        return ({ ...data, currentToy: toy })
      })
    },
    setDesiredToy: (toys: ToyState[]) => {
      update(data => {
        const desiredToy = ToyAppraisal(data, toys);
        if (data.desiredToy?.id === desiredToy?.id) {
          return data;
        }
        return { ...data, desiredToy }
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
    initializePreferences: (amount: number = 3) => {
      update(data => {
        const attributes = new Set<ToyAttribute>();

        while (attributes.size < amount) {
          attributes.add(getRandomAttribute());
        }

        let value = 1;

        attributes.forEach(attribute => {
          data.preferences[attribute] = {
            value: parseFloat(value.toFixed(1)),
            category: "Other", // TODO: add a helper to get the category for a given attribute
          }

          value = Math.max(value - 0.2, 0.1);
        })

        return data;
      })
    },
    updateStats: () => {
      update(data => {
        const updatedProperties: string[] = [];
        const nbaValues: number[] = [];

        // update aversions and boredom based on data from currentToy
        if (data.currentToy !== null) {
          const { attributes } = data.currentToy.data;

          Object.keys(attributes).forEach(attribute => {
            const { value, category } = attributes[attribute as ToyAttribute]!;
            if (value === 0) return;

            let aversionIncrement = value;
            let nbaMultiplier = 1;

            // if attribute has a preference, dampen the aversion buildup
            const preference = data.preferences[attribute as ToyAttribute];
            if (preference && preference.value > 0) {
              aversionIncrement *= (MAX_AVERSION_NEGATION * preference.value);
              nbaMultiplier = MAX_BOREDOM_BOOST * preference.value;
            }

            setOrIncrementAttribute(data.aversions, attribute as ToyAttribute, aversionIncrement * 2, category);
            updatedProperties.push(attribute);
            let nba = calculateNBA(data.aversions![attribute as ToyAttribute]!.value || 0, aversionIncrement) 

            if (nba < 0) nba *= nbaMultiplier;
            nbaValues.push(nba)
          })
        } 

        // depreciate aversion for properties that currentToy does not contain
        Object.keys(data.aversions).forEach(key => {
          const property = key as ToyAttribute;

          if (data.aversions[property] && updatedProperties.findIndex(updated => updated === property) === -1) {
            data.aversions[property].value = Math.max(data.aversions[property].value -= 0.005, 0);
          }
        })

        // reduce NBA factor if the current toy is the desired toy
        const desiredToyBonus = data.currentToy && data.desiredToy && data.currentToy.id === data.desiredToy.id ? 0.1 : 0;

        const nbaTotal = nbaValues.length > 0 ? (nbaValues.reduce((prev, curr) => prev += curr) / nbaValues.length) - desiredToyBonus : 1;

        data.boredom = Math.min(Math.max(data.boredom + nbaTotal / 100, 0), 1);

        return data;
      })
    },
    resetBabyStore: () => {
      update(_data => (setInitialState()))
    }
  }
}

export const babyStore = createBabyStore();
