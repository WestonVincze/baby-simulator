/**
 * Appeal Consideration must be the inverse of the NBA
 * * NBA is positive when a Toy **increases** boredom
 * * total Appeal should be higher when a Toy reduces boredom
 */

import { calculateNBA } from "$helpers";
import type { ToyAttribute, ToyAttributes } from "$types";

/**
 * Calculates the overall appeal of a Toy
 * @param aversions Baby's current ToyAttribute aversions
 * @param preferences Baby's current ToyAttribute preferences
 * @param attributes ToyAttributes for the Toy being considered
 * @returns 
 */
export const AppealConsideration = (
  aversions: ToyAttributes,
  preferences: ToyAttributes,
  attributes: ToyAttributes
) => {
  const attributeNbaScores = Object.keys(attributes).map(key => {
    const attributeName = key as ToyAttribute;
    const attributeValue = attributes[attributeName];

    // no value for ToyAttribute
    if (attributeValue === undefined) return 0;

    // defaults
    let aversionNba = 0;
    let preferenceNba = 0;

    // attribute match in aversions
    if (attributeName in aversions && aversions[attributeName]) {
      console.log("aversion key match: ", aversions[attributeName]);
      console.log(calculateNBA(aversions[attributeName], attributeValue));

      aversionNba = calculateNBA(aversions[attributeName], attributeValue);
    }

    // attribute match in preferences
    if (attributeName in preferences && preferences[attributeName]) {
      console.log("prefernce key match: ", aversions[attributeName]);
      console.log(calculateNBA(preferences[attributeName], attributeValue));
      preferenceNba = 0;
    }

    // attribute's final NBA score
    return aversionNba + preferenceNba;
  })

  // average of attribute NBA scores
  return attributeNbaScores.length > 0
    ? attributeNbaScores.reduce((prev, curr) => prev += curr) / attributeNbaScores.length
    : 1;
}
