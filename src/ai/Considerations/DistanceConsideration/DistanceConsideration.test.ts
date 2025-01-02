import { DistanceConsideration } from "./DistanceConsideration";
import { expect, test } from "vitest";

test("Distance Consideration", () => {
  let babyPosition = { x: 0, y: 0 };
  let toyPosition = { x: 5.5, y: 5.5 };
  let minRange = 0;
  let maxRange = 9;
  
  expect(DistanceConsideration(
    babyPosition,
    toyPosition,
    minRange,
    maxRange))
    .toBe(1);
});
