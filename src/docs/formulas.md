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

** Let's adjust NBA Formula to allow for preferences as well **

First, we need to figure out what problem we're trying to solve
- why do we need to separate aversions and preferences? what is the benefit?
  - separation allows for control over how the values change
- should they cancel each other out? should they have fixed weights?


##### Implementation Options
Option A: change "aversion" argument to allow a value of -1 to 1
- adjust formula values to return the same results
- requires data conversion before calling calculateNBA function

Option B: create a separate formula for Prefernces
- allows greater varation; aversion and preference formula's can be different
- create two functions for calulating preferenceNBA and aversionNBA, then a final function to calculate to totalNBA

Option C: change parameters to optionally take aversion and preference
- adjust formula accordingly, using defaults when values are missing
- easy to follow and adjust
- can add additional optional parameters (like multipliers)

// old formula
NBA = -1 * (V * (1 - A) - V*A)

P = preference
A = Aversion
V = Attribute Value

| P   |  A  | V   | NBA  |
|-----|-----|-----|------|
| 1   | 1   | 1   |  0   |
| 1   | 0   | 1   | -1   |
| 1   | 1   | 0.5 |      |
|     |     |     |      |
|     |     |     |      |
|     |     |     |      |
|     |     |     |      |
|     |     |     |      |
|     |     |     |      |



## New concept for NBA to simplify math

NBA should be 1 when the aversion is 1 and -1 when the aversion is 0

technically, the NBA should be the result after all attributes are calculated

each attribute will have a value of -1 to 1 and the NBA total is the average of the NBA of all attributes

How should aversion affect boredom?
- aversion has minimal impact at first but greatly increases?
- gradual change?

I'm thinking a logorithmic function where the extreme high and low have a greater impact 