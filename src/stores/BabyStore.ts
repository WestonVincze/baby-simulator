import { writable } from "svelte/store";
import { type ToyState, type ToyAttribute, type BabyData, type ToyAttributes, type AttributeCategory } from "$types";
import { calculateDistance, calculateNBA, constrainPositionToPlayMat, getRandomAttribute, lerp } from "$helpers";
import { ToyAppraisal } from "$ai/Appraisals";
import { BABY_HEIGHT, BABY_WIDTH } from "$constants";
import { moveTo } from "$utils";

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

const setInitialState = (): BabyData => ({
  state: "IDLE",
  position: { x: 400, y: 250 },
  boredom: 0,
  currentToy: null,
  desiredToy: null,
  aversions: {},
  preferences: {}
})

const createBabyStore = () => {
  const { subscribe, update, set } = writable<BabyData>(setInitialState());

  let animationFrameId: number;

  const updatePositionSmoothly = (targetPosition: { x: number, y: number }) => {
    const step = () => {
      update(currentState => {
        const { position } = currentState;
        const t = 0.1; // interpolation factor (0 < t <= 1)
        const newPosition = {
          x: lerp(position.x, targetPosition.x, t),
          y: lerp(position.y, targetPosition.y, t)
        };

        if (Math.abs(newPosition.x - targetPosition.x) < 0.5 && Math.abs(newPosition.y - targetPosition.y) < 0.5) {
          cancelAnimationFrame(animationFrameId);
          return { ...currentState, position: targetPosition };
        }

        return { ...currentState, position: newPosition };
      });

      animationFrameId = requestAnimationFrame(step);
    };

    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(step);
  };

  return {
    subscribe,
    updatePosition: (
      target: { x: number, y: number },
      isRelativePosition: boolean = false
    ) => {
      update(state => {
        const { x, y } = isRelativePosition
          ? target
          : moveTo(state.position, target);

        const targetPosition = constrainPositionToPlayMat(
          {
            x: state.position.x + (x || 0),
            y: state.position.y + (y || 0)
          },
          {
            width: BABY_WIDTH,
            height: BABY_HEIGHT
          }
        );

        updatePositionSmoothly(targetPosition);

        return state;
      });
    },
    // TODO: use this function
    pickupToy: (toy: ToyState) => {
      update(data => {
        if (data.currentToy !== null) return data;

        const distance = calculateDistance(data.position, toy.position);

        if (distance > 100) return data;
        return ({ ...data, currentToy: toy })
      })
    },
    dropToy: () => {
      update(data => {
        if (data.currentToy === null) return data;
        return ({ ...data, currentToy: null })
      })
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

            setOrIncrementAttribute(data.aversions, attribute as ToyAttribute, aversionIncrement, category);
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

        /*
        if (data.currentToy && nbaTotal >= 0.5) {
          const { x, y } = randomizePosition(data.position);
          toyStore.moveToy(data.currentToy.id, "PlayMat", x, y);
          data.currentToy = null;
        }
        */

        return data;
      })
    },
    resetBabyStore: () => {
      cancelAnimationFrame(animationFrameId);
      set(setInitialState());
    }
  }
}

export const babyStore = createBabyStore();
export type BabyStore = typeof babyStore;
