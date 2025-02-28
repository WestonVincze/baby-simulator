import { expect, test } from "vitest";
import { calculateLogisticUtility, type LogisticOptions } from "./utilityCalculations";
import { describe } from "node:test";

describe("Logistic Function", () => {
  test("decreasing (default options)", () => {
    expect(calculateLogisticUtility(0, 1)).toBe(1);
    expect(calculateLogisticUtility(0.4, 1)).toBe(0.8841);
    expect(calculateLogisticUtility(0.5, 1)).toBe(0.5);
    expect(calculateLogisticUtility(0.8, 1)).toBe(0.0022);
    expect(calculateLogisticUtility(1, 1)).toBe(0);
  })

  test("increasing", () => {
    const options: LogisticOptions = {
      exponentMultiplier: 12,
      exponentAdditive: 6,
      eulerMultiplier: 2,
      direction: "increase"
    }
    expect(calculateLogisticUtility(0, 1, options)).toBe(0);
    expect(calculateLogisticUtility(0.4, 1, options)).toBe(0.1159);
    expect(calculateLogisticUtility(0.5, 1, options)).toBe(0.5);
    expect(calculateLogisticUtility(0.8, 1, options)).toBe(0.9978);
    expect(calculateLogisticUtility(1, 1, options)).toBe(1);
  })
})