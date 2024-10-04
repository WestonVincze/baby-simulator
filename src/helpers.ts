/**
 * @param defaultColors default colors for SVG
 * @param dynamicColors color overrides to be applied
 */
export const mapDynamicColors = (defaultColors: string[], dynamicColors: string[]) => {
  console.log(defaultColors);
  console.log(dynamicColors);

  return defaultColors.map((color, index) =>
    dynamicColors.length > index
      ? dynamicColors[index]
      : color
  );
}
