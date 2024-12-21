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
