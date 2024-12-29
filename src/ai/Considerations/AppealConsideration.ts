/**
 * Calculates the overall appeal of a Toy
 */

import { calculateNBA } from "../../helpers";
import type { ToyAttribute, ToyAttributes } from "../../types";

/** CONTEXT
 * baby data
 * * attribute aversions
 * * attribute preferences
 * toy data
 * * condensed attribute data
 */

export const AppealConsideration = (aversions: ToyAttributes, preferences: ToyAttributes, attributes: ToyAttributes) => {
  /**
   * iterate through toy properties
   * check for aversion match
   * if match, modify value
   * check for preference match
   * if match, modifty value
   * if no matches, value should be 0
   * iterate through map of properties to calculate total desire
   */
  Object.keys(attributes).map(attribute => {
    console.log(attributes[attribute as ToyAttribute]);
  })



  /** calculate Aversion */
  // create empty array 
  // iterate through aversions
  // calculate the NBA for matching attributes

  /** calculate Preferences */
  // create empty array 
  // iterate through preferences
  // calculate the NBA for matching attributes

  /** calculate total */
  // combine aversions and preferences, merging any duplicate attributes
  // return the average of each value in the array
  // final value should be 0-1 where 0 is no appeal and 1 is maximum appeal
  return 0;
}
