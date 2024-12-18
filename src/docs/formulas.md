### Net Boredom Adjustment (NBA)

Used for determining how boredom should be adjusted based on a toys attribute value and the current aversion value

Let Aversion = A
Let Attribute Value = V

NBA = -1 * (V * (1 - A) - V*A)

Resulting value is between -1 and 1

-1 represents the greatest possible decrease in boredom
0 represents an unchanged boredom
1 represents the greatest possible increase in boredom

#### Examples

| A   | V   | NBA  |
|-----|-----|------|
| 1   | 1   | 1    |
| 1   | 0.5 | 0.5  |
| 1   | 0   | 0    |
| 0.5 | 1   | 0    |
| 0.5 | 0.5 | 0    |
| 0.5 | 0   | 0    |
| 0   | 1   | -1   |
| 0   | 0.5 | -0.5 |
| 0   | 0   | 0    |
