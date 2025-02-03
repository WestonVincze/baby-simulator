import { AversionConsideration } from "./AversionConsideration";
import { expect, test } from "vitest";

test("AversionConsideration", () => {
  expect(AversionConsideration({ circle: 1 }, { circle: 1 })).toBe(1);
})
