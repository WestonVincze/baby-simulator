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
  exponentMultiplier: number,
  exponentAdditive: number,
  eulerMultiplier: number,
  direction: "increase" | "decrease",
}

export const calculateLogisticUtility = (
  value: number,
  maxValue: number,
  options: LogisticOptions = {
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

  const result = 1 / denominator

  return options.direction === "increase"
    ? parseFloat(result.toFixed(ACCURACY))
    : parseFloat((1 - result).toFixed(ACCURACY));
}
