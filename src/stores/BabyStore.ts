import { writable } from "svelte/store";
import type { ToyState, ToyAttribute, BabyData, ToyAttributes, AttributeCategory } from "$types";
import { calculateNBA, getRandomAttribute } from "$helpers";
import { ToyAppraisal } from "$ai/Appraisals";

const MAX_PREFERENCE_BOOST = 0.5;

const setOrIncrementAttribute = (attributeMap: ToyAttributes, property: ToyAttribute, value: number, category: AttributeCategory) => {
  if (attributeMap[property]) {
    attributeMap[property].value = Math.min(attributeMap[property].value + value / 100, 1); 
  } else {
    attributeMap[property] = { value: value / 100, category };
  }
  return property;
}

const initialState: BabyData = Object.freeze({
  position: { x: 400, y: 250 },
  boredom: 0,
  currentToy: null,
  desiredToy: null,
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
        const NbaValues: number[] = [];

        // update aversions and boredom based on data from currentToy
        if (data.currentToy !== null) {
          const { attributes } = data.currentToy.data;

          Object.keys(attributes).forEach(attribute => {
            const { value, category } = attributes[attribute as ToyAttribute]!;
            if (value === 0) return;

            let aversionIncrement = value;

            // if attribute has a preference, dampen the aversion buildup
            const preference = data.preferences[attribute as ToyAttribute];
            if (preference && preference.value > 0) {
              aversionIncrement *= (MAX_PREFERENCE_BOOST * preference.value);
            }

            setOrIncrementAttribute(data.aversions, attribute as ToyAttribute, aversionIncrement, category);
            updatedProperties.push(attribute);
            NbaValues.push(calculateNBA(data.aversions![attribute as ToyAttribute]!.value || 0, aversionIncrement))
          })
        } 

        // depreciate aversion for properties that currentToy does not contain
        Object.keys(data.aversions).forEach(key => {
          const property = key as ToyAttribute;

          if (data.aversions[property] && updatedProperties.findIndex(updated => updated === property) === -1) {
            data.aversions[property].value = Math.max(data.aversions[property].value -= 0.01, 0);
          }
        })

        // reduce NBA factor if the current toy is the desired toy
        const desiredToyBonus = data.currentToy && data.desiredToy && data.currentToy.id === data.desiredToy.id ? 0.1 : 0;

        const nbaTotal = NbaValues.length > 0 ? (NbaValues.reduce((prev, curr) => prev += curr) / NbaValues.length) - desiredToyBonus : 1;

        data.boredom = Math.min(Math.max(data.boredom + nbaTotal / 100, 0), 1);

        return data;
      })
    },
    resetBabyStore: () => {
      update(data => ({ ...data, boredom: 0, aversions: {}, preferences: {} }))
    }
  }
}

export const babyStore = createBabyStore();
