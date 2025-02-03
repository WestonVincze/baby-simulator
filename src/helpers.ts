import { HexColors } from "./data/HexColors";

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

  return -1 * (attributeValue * (1 - attributeAversion) - attributeValue * attributeAversion);
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
