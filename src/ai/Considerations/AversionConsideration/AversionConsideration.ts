import { calculateNBA, convertNBAtoUtility } from "$helpers";
import type { ToyAttribute, ToyAttributes } from "$types";

/**
 * Calculates the value of a toy based on baby's aversions - based on the NBA calculation
 * @param aversions Baby's current ToyAttribute aversions
 * @param attributes ToyAttributes for the Toy being considered
 * @returns range of 0 to 1 where 0 = GREATEST aversion and 1 = LEAST aversion
 */
export const AversionConsideration = (
  aversions: ToyAttributes,
  attributes: ToyAttributes
) => {
  const attributeNbaScores = Object.keys(attributes).map(key => {
    const attributeName = key as ToyAttribute;
    const attributeValue = attributes[attributeName];

    // no value for ToyAttribute
    if (attributeValue === undefined) return 0;

    // defaults
    let aversion = 1;

    // attribute match in aversions
    if (attributeName in aversions && aversions[attributeName]) {
      const aversionNba = calculateNBA(aversions[attributeName], attributeValue);
      aversion = convertNBAtoUtility(aversionNba);
    }

    // attribute's final NBA score
    return aversion;
  })

  // average of attribute NBA scores
  return attributeNbaScores.length > 0
    ? attributeNbaScores.reduce((prev, curr) => prev += curr) / attributeNbaScores.length
    : 1;
}
