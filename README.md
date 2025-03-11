## Baby Simulator

Baby Simulator is a drag and drop web game in which the objective is to keep the baby entertained as long as possible. 

### Core Gameplay

While the baby plays with a toy, boredom will decrease and aversion will increase for each property the toy has. Properties that baby is averse to satisfy less boredom. 

For example, if the baby is playing with a toy that is `red` and its shape is `circle`, baby will become averse to `red` and `circle` shaped toys.

### How to play

Drag toys from the toy box onto the play mat, or directly into baby's hands. Baby's preferred toy will be shown in a thought bubble. The desired toy satisfies the highest amount of boredom of all available toys.

Prevent boredom from reaching 0 by dragging new toys as baby gets bored of toys that have already been played with.

#### Simulation Mode

This is the core version, featuring a minimal UI and a more intuitive approach. Eventually, visual queues will be expressed through the baby.

#### Detailed Mode

This version is primarily used for development and testing to see details about the decisions being made, including the babies aversions, preferences, and preferred toy.

### Options

Using the query parameter "endless=true" will prevent the game over screen and allow the simulation to continue even when boredom is maxed out.
