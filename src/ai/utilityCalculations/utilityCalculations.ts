// decimal point accuracy
const ACCURACY = 3;

/**
 * example: https://www.desmos.com/calculator/yquxu4kfb1
 * 
 * function with default values
 *                    1
 * U(w) = 1 - _________________
 *            1 + (e * 2) ^(w * 12) + 6
 * 
 */

export type LogisticOptions = {
  offset: number,
  numerator: number,
  exponentMultiplier: number,
  exponentAdditive: number,
  eulerMultiplier: number,
  direction: "increase" | "decrease",
}

export const calculateLogisticUtility = (
  value: number,
  maxValue: number,
  options: LogisticOptions = {
    offset: 0,
    numerator: 1,
    exponentMultiplier: 12,
    exponentAdditive: 6,
    eulerMultiplier: 2,
    direction: "decrease",
  }
) => {
  console.log('calculating ' + value)
  const w = Math.max(0, Math.min(value / maxValue, 1))
  const exponent = -(w * options.exponentMultiplier) + options.exponentAdditive;
  const denominator = 1 + (Math.E * options.eulerMultiplier) ** exponent;

  const result = options.numerator / denominator

  return options.direction === "increase"
    ? parseFloat((options.offset + result).toFixed(ACCURACY))
    : parseFloat((options.offset - result).toFixed(ACCURACY));
}
