import { babyStore, gridStore, toyStore } from "$stores";
import type { BabyData, Grid, ToyState } from "$types";
import { get } from "svelte/store";

export type IContext = Record<string, any>;

export type ScoringFunction = (score: number[]) => number;

export type CurveFunction = (score: number) => number;

export interface IAppraisal<T> {
  evaluate: (context: T) => number;
  curveFunction?: CurveFunction;
} 

export interface IConsideration<T> {
  id: string;
  action: { type: string; params?: Record<string, any> };
  appraisals: IAppraisal<T>[];
  weight: number;
  scoringFunction: ScoringFunction;
}

export class Reasoner<T extends IContext> {
  private considerations: IConsideration<T>[] = [];
  private lastAction: { type: string; parameters?: Record<string, any> } | null = null;
  private decisionLock: { isLocked: boolean; unlockTime: number } = { isLocked: false, unlockTime: 0 };

  /**
   * Add a consideration to the reasoner
   */
  addConsideration(consideration: IConsideration<T>) {
    this.considerations.push(consideration);
  }
  
  /**
   * Remove a consideration to the reasoner
   */
  removeConsiderationById(id: string) {
    this.considerations = this.considerations.filter(consideration => consideration.id === id);
  }

  /**
   * Remove all considerations of a specific action type
   */
  removeConsiderationsByActionType(actionType: string) {
    this.considerations = this.considerations.filter(consideration => consideration.action.type !== actionType);
  }

  /**
   * Lock decisions for a specified duration (in seconds)
   */
  private lockDecision(duration: number) {
    this.decisionLock.isLocked = true;
    this.decisionLock.unlockTime = Date.now() + duration * 1000;
  }

  /**
   * Check if the decision lock is active
   */
  private isDecisionLocked(): boolean {
    if (this.decisionLock.isLocked && Date.now() < this.decisionLock.unlockTime) {
      return true;
    }

    this.decisionLock.isLocked = false;
    return false;
  }

  /**
   * Evaluate all actions and return the best one
   */
  getBestAction(context: T): { type: string; parameters?: Record<string, any> } | null {
    if (this.isDecisionLocked()) {
      return this.lastAction;
    }

    let bestAction: { type: string; parameters?: Record<string, any> } | null = null;
    let bestScore = -Infinity;

    for (const consideration of this.considerations) {
      // Calculate the total score for the consideration
      const scores = consideration.appraisals.map((appraisal) => {
        const appraisalScore = appraisal.evaluate(context);
        if (appraisal.curveFunction) {
          return appraisal.curveFunction(appraisalScore);
        }
        return appraisal.evaluate(context);
      });

      // Apply the scoring function and weight
      const weightedScore = consideration.scoringFunction(scores) * consideration.weight;

      // Avoid repeating the last action unless necessary
      /*
      if (this.lastAction && this.lastAction.type === consideration.action.type) {
        continue; // Skip this action to avoid oscillation
      }
      */

      // Update the best action if this one has a higher score
      if (weightedScore > bestScore) {
        bestScore = weightedScore;
        bestAction = consideration.action;
      }
    }

    if (bestAction && bestAction === this.lastAction) {
      console.log("New decision, locking for 2 seconds");
      this.lockDecision(2);
    }

    if (bestAction) {
      this.lastAction = bestAction;
      return bestAction;
    }

    return null;
  }
}


/** TEST RUN - REFACTORING TO NEW SYSTEM */

export interface Context extends IContext {
  baby: BabyData
  toys: ToyState[]
  toyValue: Record<string, number>
  grid: Grid
}

const reasoner = new Reasoner<Context>();

reasoner.addConsideration({
  id: "idle",
  action: { type: "idle" },
  appraisals: [],
  weight: 1,
  scoringFunction: (_scores) => 0,
})

const toyValue: Record<string, number> = {}
const baby = get(babyStore);
const grid = get(gridStore);
const toys = get(toyStore);

const context: Context = {
  baby,
  toys,
  toyValue,
  grid
}

reasoner.getBestAction(context);
