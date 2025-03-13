## BRAINSTORM

- what if the reasoner relayed an action and params to a handler which was responsible for setting the action / state?


--------------------------------------------
        ActionHandler
          - Current Action
          - Action to function map
          - timeRemaining?
          - Reasoner decision
--------------------------------------------
- needs access to possible actions
- needs to have a map of actions and their corresponding functions
- might want a timer to enforce a minimum amount of time continuing with an action
- needs to access the decision from a reasoner, containing the action and params


--------------------------------------------
        Reasoner
          - Context
          - Considerations
          - Evaluation Method
          - getDecision(action, params?)
--------------------------------------------

- needs to build a single context that all considerations and appraisals use
- needs a helper to add/remove considerations
- needs an evaluation method to score appraisals and select an action
- needs access to action changing function (if needed)


--------------------------------------------
        Context
          - collection of states
          - helper functions?
--------------------------------------------
- should be passable to any consideration
- might need helper functions to access specific state (getThingById)


--------------------------------------------
--------------------------------------------

