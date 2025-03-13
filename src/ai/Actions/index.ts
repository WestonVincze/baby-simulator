/**
 * ACTIONS
 * ========
 * Pick up toy
 * * of the toys within reach
 * Move
 * Drop toy
 * Idle
 * 
 * 
 * 
 * Thoughts
 * * we need a way to dynamically add / remove considerations
 * * * pick up and drop toy are situational actions
 * * * 
 */

enum Actions {
  "IDLE",
  "MOVING",
  "PICKING_UP_OBJECT",
  "INTERACTING_WITH_OBJECT", // we could break this down into smaller actions
  "DROPPING_OBJECT",
}

// a function to set the action and a minimum amount of time 

const MoveTowardPosition = (baby: any, targetPosition: any) => {
  // return true if already within range of target position

  // move toward position (moveTo function)
  // set baby's state to "MOVING"
}


const PickUpToy = (baby: any, toy: any) => {
  // return false if baby has a toy already

  // return false if not within x distance

  // set currentToy to toy
  // set baby's state to "PICKING_UP_OBJECT"
}

const DropToy = (baby: any) => {
  // return false if baby does not have toy

  // get toy id
  // get baby position
  // determine the end position of toy
  // set position of toy
  // remove currentToy from baby
  // set baby's state to "DROPPING_OBJECT"
}

const Idle = (baby: any) => {
  // set baby's state to "IDLE"
}
