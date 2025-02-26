import { calculateNBA, convertNBAtoUtility } from "$helpers";
import type { ToyAttribute, ToyAttributes } from "$types";

/**
 * Calculates the value of a toy based on baby's preferences
 * @param preferences Baby's current ToyAttribute preferences 
 * @param attributes ToyAttributes for the Toy being considered
 * @returns range of 0 to 1 where 0 is least preferred and 1 is most preferred
 */
export const PreferenceConsideration = (
  preferences: ToyAttributes,
  attributes: ToyAttributes
) => {
  const preferenceScores = Object.keys(attributes).map(key => {
    const attributeName = key as ToyAttribute;
    const attributeValue = attributes[attributeName]?.value;

    // no value for ToyAttribute
    if (attributeValue === undefined) return 0;

    // attribute match in preferences
    if (attributeName in preferences && preferences[attributeName]) {
      return preferences[attributeName].value * attributeValue;
    }

    return 0;
  })

  // average of all preference scores
  return preferenceScores.length > 0
    ? preferenceScores.reduce((prev, curr) => prev += curr) / preferenceScores.length
    : 0;
}
