import { AppealConsideration } from "./AppealConsideration";
import { expect, test } from "vitest";

test("AppealConsideration", () => {
    expect(AppealConsideration({ green: 1, circle: 1 }, {}, {circle: .5, black: 1, square: 0.5 })).toBe(0);
})
