import { AllAttributes, Colors, OtherAttributes, Patterns, Shapes, Sounds } from "./toyAttributes";
import { HexColors } from "./data/HexColors";
import type { AttributeCategory, ToyAttribute } from "$types";
import { calculateLogisticUtility } from "$ai/utilityCalculations";
import { PLAY_MAT_HEIGHT, PLAY_MAT_WIDTH } from "$constants";

/**
 * @param defaultColors default colors for SVG
 * @param dynamicColors color overrides to be applied
 */
export const mapDynamicColors = (defaultColors: string[], dynamicColors: string[]) => {
  return defaultColors.map((color, index) => {

    return dynamicColors.length > index
      ? HexColors[dynamicColors[index] as keyof typeof HexColors]
      : color
    }
  );
}

/**
 * Calculates the time passed from the given timestamp to now
 * @param timestamp value (in ms)
 * @returns time (in ms) passed or 0 if the timestamp is in the future
 */
export const getTimeSinceTimestamp = (timestamp: number) => {
  return Math.max(0, performance.now() - timestamp);
}

/**
 * Checks if a numeric value is between 0 and 1
 * @param value 
 * @returns `true` if `value` is between 0 and 1, `false` otherwise
 */
const isZeroToOne = (value: number): boolean => {
  return value >= 0 && value <= 1;
}

/**
 * Calculates the Net Boredom Adjustment (NBA) using an attribute's value (V) and its current aversion (A).
 * NBA = -1 * (V * (1 - A) - V * A)
 * @param attributeAversion attribute's aversion (must be between 0 and 1)
 * @param attributeValue attribute's value (must be between 0 and 1)
 * @returns Net Boredom Adjustment (NBA) as a range of -1 to 1
 */
export const calculateNBA = (attributeAversion: number, attributeValue: number) => {
  if (!isZeroToOne(attributeAversion) || !isZeroToOne(attributeValue)) {
    throw new Error(`Out of range. 'attributeAversion' and 'attributeValue' must be between 0 and 1. Provided values attributeAversion: ${attributeAversion} and attributeValue: ${attributeValue}`);
  }

  const baseNba = calculateLogisticUtility(attributeAversion, 1, {
    offset: -1,
    offsetOperator: "+",
    numerator: 2,
    exponentMultiplier: 10,
    exponentAdditive: 5,
    eulerMultiplier: 2,
  })

  // TODO: consider only returning baseNba
  return baseNba; // > 0 ? baseNba * attributeValue : baseNba;
}

/**
 * Converts a value from the range [-1, 1] to the range [1, 0]
 * @param value value in the range [-1, 1]
 * @returns value in the range [1, 0]
 */
export const convertNBAtoUtility = (value: number): number => {
  if (value < -1 || value > 1) {
    throw new Error(`Out of range. 'value' must be between -1 and 1. Provided value: ${value}`);
  }

  return 1 - (value + 1) / 2;
}

/**
 * Calculates the distance between two points
 * @returns distance between pos1 and pos2
 */
export const calculateDistance = (pos1: { x: number, y: number }, pos2: { x: number, y: number }): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;

  return Math.sqrt(dx**2 + dy**2);
}

/**
 * forces a value to be within a 0 to 1 range
 */
export const clamp = (value: number) => {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Rescales data too a range of 0-1
 * * result is not restricted, use `clamp` to force result to a range of 0-1 (or any other specification) *
 * @param value original value
 * @param min minimum value
 * @param max maxiumum value
 * @returns a rescaled value where the min is represented as "0" and the the max is respresented as "1"
 */
export const rescale = (
  value: number,
  min: number,
  max: number,
) => {
  return (value - min) / (max - min);
}

/**
 * Helper to get a random toy attribute
 * @returns a random toy attribute
 */
export const getRandomAttribute = (): ToyAttribute => {
  const randomIndex = Math.floor(Math.random() * AllAttributes.length);
  return AllAttributes[randomIndex];
}

/**
 * Randomizes a position within -150 and +150 units on the x and y axes given a starting position
 * @param position The starting position { x, y }
 * @returns The new randomized position { x, y }
 */
export const randomizePosition = (position: { x: number, y: number }): { x: number, y: number } => {
  const randomOffset = () => Math.floor(Math.random() * 301) - 150; // Generates a random number between -150 and +150
  return {
    x: position.x + randomOffset(),
    y: position.y + randomOffset()
  };
}

/**
 * Constrains an objects position to the PlayMat
 * @param position The desired position (x, y)
 * @param dimensions The width and height of the object
 */
export const constrainPositionToPlayMat = (
  position: { x: number, y: number },
  dimensions: { width: number, height: number},
) => {
  const xMin = dimensions.width / 2;
  const yMin = dimensions.height / 2;
  const xMax = PLAY_MAT_WIDTH - dimensions.width / 2;
  const yMax = PLAY_MAT_HEIGHT - dimensions.height / 2;
  return ({
    x: Math.min(Math.max(xMin, position.x), xMax),
    y: Math.min(Math.max(yMin, position.y), yMax),
  })
}

export const lerp = (start: number, end: number, t: number) => start + t * (end - start);


export const getCategoryByToyAttribute = (attribute: ToyAttribute): AttributeCategory => {
  if (Shapes.find(shape => attribute === shape)) return "Shape";
  if (Colors.find(color => attribute === color)) return "Color";
  if (Patterns.find(pattern => attribute === pattern)) return "Pattern";
  if (Sounds.find(sound => attribute === sound)) return "Sound";
  if (OtherAttributes.find(other => attribute === other)) return "Other";

  console.warn(`${attribute} ToyAttribute not found in any AttributeCategory. Returning Other.`)
  return "Other";
}
