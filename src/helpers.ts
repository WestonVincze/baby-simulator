/**
 * @param defaultColors default colors for SVG
 * @param dynamicColors color overrides to be applied
 */
export const mapDynamicColors = (defaultColors: string[], dynamicColors: string[]) => {
  return defaultColors.map((color, index) =>
    dynamicColors.length > index
      ? dynamicColors[index]
      : color
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
