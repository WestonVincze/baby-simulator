import { AppealConsideration } from "./AppealConsideration";
import { expect, test } from "vitest";

test("AppealConsideration", () => {
  expect(AppealConsideration({ circle: 1 }, {}, {circle: 1 })).toBe(1);
})
