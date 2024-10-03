/**
 * @param defaultColors default colors for SVG
 * @param dynamicColors color overrides to be applied
 */
export const mapDynamicColors = (defaultColors: string[], dynamicColors: string[]) =>
  defaultColors.map((color, index) =>
    dynamicColors.length > index
      ? dynamicColors[index].slice(0, defaultColors.length)
      : color);
