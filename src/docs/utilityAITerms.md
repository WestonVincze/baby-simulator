## Utility AI Planning

### Structure

REASONER
- SCORING METHOD
- APPRAISALS
  - SCORING METHOD
  - ACTION
  - CONSIDERATIONS

### Appraisals

Appraisals drive final decision
- *Base Score*: utility value of decision
- *Veto*: boolean that allows each consideration to prevent selecting associated choice

#### Example Appraisals

- Does BABY want OBJECT (this might be all we need for phase 1)

### Considerations

Encapsulates ONE aspect of a larger decision

#### Example Considerations

- object's appeal (net value of the object based on current preferences)
- object's aversion (net value of the object based on current aversions)
- object's distance (how far away it is from baby)
- awareness of object (how aware baby is of the object, higher if in view or moved/interacted with recently)
- object's difference from currently held object (could be negative or positive, depending on baby's stats)

### Actions

Represent the final decision of an appraisal

#### Possible Actions

For phase 1, we only need to return an identifier for the desired object

For future iterations, we'll want to expand this to actual actions the baby can DO (see notes)
- interact with toy
- drop toy
- pick up toy
- ...

### Context

Relevant data required to make a decision. Each consideration will have different context requirements.

What can we do to include context data for appraisals and decisions?

Accessible Global Context
- contains all relevant game state
- may need to be collected from multiple sources (baby, toy, etc) and combined into a single context

Function Parameters for each Appraisal
- each appraisal is passed only the necessary parameters
- this would be less flexible, but may be a good starting point

### Notes

We may want to have 2 systems for AI; one to determine what the baby WANTS and one to determine what the baby DOES.

The player will be the driving force behind providing the baby what it WANTS, and what the baby DOES will be reactive to their needs.

WANT actions
- to have specific Toy
- entertainment (song)
- to be held
- eat
- sleep

DOES actions
- move
- roll
- coo
- poop
- cry
- throw / interact with something

**For phase 1, focus on WANT actions first.**

