import { calculateNBA, convertNBAtoUtility } from "$helpers";
import { AversionConsideration } from "./AversionConsideration";
import { describe, expect, test } from "vitest";

describe("NBA Calculation tests", () => {
  test("with max aversion and max value", () => {
    expect(calculateNBA(1, 1)).toBe(1);
  })

  test("with min aversion and max value", () => {
    expect(calculateNBA(0, 1)).toBe(-1);
  })

  test("with min aversion and half value", () => {
    expect(calculateNBA(0, 0.5)).toBe(-1);
  })

  test("with half aversion and half value", () => {
    expect(calculateNBA(0.5, 0.5)).toBe(0);
  })
  
  test("with max aversion and half value", () => {
    expect(calculateNBA(1, 0.5)).toBe(0.5);
  })

  test("with max aversion and more than half value", () => {
    expect(calculateNBA(1, 0.55)).toBeGreaterThan(0.5);
  })

  test("with less than half aversion and max value", () => {
    expect(calculateNBA(0.45, 1)).toBeLessThan(0);
  })
  
  test("with half aversion and max value", () => {
    expect(calculateNBA(0.5, 1)).toBe(0);
  })

  test("with more than half aversion and max value", () => {
    expect(calculateNBA(0.55, 1)).toBeGreaterThan(0);
  })
})

test("AversionConsideration", () => {
  expect(AversionConsideration(
    { circle: { value: 1, category: "Shape" } },
    { circle: { value: 1, category: "Shape" } }
  )).toBe(0);

  // max aversion to circle for a toy this is 0.5 circle
  expect(AversionConsideration(
    { circle: { value: 1, category: "Shape" } },
    { circle: { value: 0.5, category: "Shape" } }
  )).toBe(0.25);

  expect(AversionConsideration(
    { circle: { value: 0, category: "Shape" } },
    { circle: { value: 1, category: "Shape" } }
  )).toBe(1);

  expect(AversionConsideration(
    { circle: { value: 0, category: "Shape" } },
    { circle: { value: 0.5, category: "Shape" } }
  )).toBe(1);
})
