import { DistanceConsideration } from "./DistanceConsideration";
import { expect, test } from "vitest";

test("Returns 0 when distance is equal to or greater than maxRange", () => {
  let babyPosition = { x: 0, y: 0 };
  let toyPosition = { x: 5.5, y: 5.5 };
  let minRange = 0;
  let maxRange = 5;
  
  expect(DistanceConsideration(
    babyPosition,
    toyPosition,
    minRange,
    maxRange))
    .toBe(0);
});

test("Returns 1 when distance is equal to or less than maxRange", () => {
  let babyPosition = { x: 0, y: 0 };
  let toyPosition = { x: 0, y: 0 };
  let minRange = 0;
  let maxRange = 5;
  
  expect(DistanceConsideration(
    babyPosition,
    toyPosition,
    minRange,
    maxRange))
    .toBe(1);
});

test("Shorter distances return a higher value", () => {
  let babyPosition = { x: 0, y: 0 };
  let closerToyPosition = { x: 5, y: 5 };
  let furtherToyPosition = { x: 15, y: 15 };

  const closerScore = DistanceConsideration(babyPosition, closerToyPosition);
  const furtherScore = DistanceConsideration(babyPosition, furtherToyPosition);

  expect(closerScore > furtherScore).toBe(true);
});
