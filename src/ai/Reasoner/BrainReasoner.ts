import type { Action } from "$ai/Actions/ActionSystem"
import { MoveAppraisal } from "$ai/Appraisals/MoveAppraisal"
import { AversionConsideration, PreferenceConsideration, RecentInteractionsConsideration } from "$ai/Considerations"
import { type BabyStore, type GridStore, type ToyStore } from "$stores"
import type { BabyData, Grid, Position, ToyState } from "$types"
import { get } from "svelte/store"
import { Reasoner, type IAppraisal, type IConsideration } from "./Reasoner"
import { CELL_SIZE, PLAY_MAT_HEIGHT, PLAY_MAT_WIDTH } from "$constants"

export type Context = {
  baby: BabyData
  toys: ToyState[]
  toyValue: Record<string, number>
  grid: Grid
}

export const brainReasoner = new Reasoner<Context>();

brainReasoner.addAppraisal({
  id: "idle",
  action: { type: "idle" },
  considerations: [],
  weight: 1,
  scoringFunction: (_scores) => 0.0001,
})

const toyValueConsideration: IConsideration<Context, { toyId: string }> = {
  evaluate: (context, params) => {
    if (!params) return 0;

    return context.toyValue[params.toyId] || 0;
  },
}

export const createPickupToyAppraisals = (toyIds: string[]): IAppraisal<Context>[] => {
  return toyIds.map(toyId => ({
    id: `pickupToy-${toyId}`,
    action: { type: "pickupToy", params: { toyId } },
    considerations: [
      {
        consideration: toyValueConsideration,
        params: { toyId },
      },
    ],
    weight: 1,
    scoringFunction: (scores) => scores.reduce((prev, curr) => prev + curr, 0),
  }));
}

const dropToyConsideration: IConsideration<Context> = {
  evaluate: (context) => {
    const currentToy = context.baby.currentToy;

    if (!currentToy) return -1;
    
    return Math.max(0, 0.5 - context.toyValue[currentToy.id]);
  }
}

brainReasoner.addAppraisal({
  id: "dropToy",
  action: { type: "dropToy"},
  considerations: [{
    consideration: dropToyConsideration,
  }],
  weight: 1,
  scoringFunction: (scores) => scores.reduce((prev, curr) => prev + curr, 0),
})

const rows = Math.floor(PLAY_MAT_HEIGHT / CELL_SIZE);
const cols = Math.floor(PLAY_MAT_WIDTH / CELL_SIZE);

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    brainReasoner.addAppraisal({
      id: `moveTo-(${j},${i})`,
      considerations: [{
        consideration: {
          evaluate: (context) => {
            return MoveAppraisal(context, { x: j, y: i })
          },
        }
      }],
      action: {
        type: "move",
        params: { x: j, y: i }
      }
    })

  }
}

/*
export const BrainReasoner = (
  babyStore: BabyStore,
  toyStore: ToyStore,
  gridStore: GridStore
): Action => {
  const actionScores: { score: number, action: Action }[] = [];

  const toyValue: Record<string, number> = {}
  const baby = get(babyStore);
  const grid = get(gridStore);
  const toys = get(toyStore);

  toys.forEach(toy => {
    if (toy.loc === "ToyBox") return;

    // mark the value of a toy as -1 if it was dropped within the last 5 seconds
    if (
      toy.interactions &&
      toy.interactions
        .filter(interaction => {
          if (interaction.type !== "drop") return false;

          const time = performance.now() - interaction.timestamp;
          if (time <= 5000) return true;
          return false
        })
        .length > 0
    ) {
      toyValue[toy.id] = -1;
      return;
    }

    const scores: number[] = [];
    // aversion score
    const aversionScore = AversionConsideration(baby.aversions, toy.data.attributes);
    scores.push(aversionScore);

    // preference score
    const preferenceScore = PreferenceConsideration(baby.preferences, toy.data.attributes);
    scores.push(preferenceScore);

    // recent interactions score
    const recentInteractionsScore = toy.interactions ? RecentInteractionsConsideration(toy.interactions, 5000) : 0;
    scores.push(recentInteractionsScore);

    toyValue[toy.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  });

  const context: Context = {
    baby,
    toys,
    toyValue,
    grid
  }

  const currentToy = context.baby.currentToy;
  actionScores.push({
    score: currentToy ? context.toyValue[currentToy.id] * 1.2 : 0,
    action: { type: "idle" }
  });

  if (currentToy) {
    actionScores.push({
      score: Math.max(0, 0.5 - toyValue[currentToy.id]),
      action: { type: "dropToy" }
    })
  }

  if (!currentToy) {
    const babyCoordinates = gridStore.getGridCoordinates(baby.position.x, baby.position.y)
    const toysInRange = gridStore.getItemsWithinOneTile(babyCoordinates.x, babyCoordinates.y);
    gridStore.getItemsWithinOneTile

    for (const toy of toysInRange) {
      const toyState = toyStore.getToyById(toy.id);
      if (!toyState) continue;
      const score = toyValue[toy.id];
      actionScores.push({ score, action: { type: "pickupToy", toy: toyState }});
    }
  }

  const gridScores: number[][] = [];

  let bestPosition = null;
  let bestScore = 0;

  for (let i = 0; i < grid.length; i++) {
    const rowScores: number[] = []
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].items.length > 0) continue;

      const score = MoveAppraisal(context, { x: j,  y: i });
      if (score > bestScore) {
        bestScore = score;
        bestPosition = grid[i][j].coordinates;
      }
      rowScores.push(parseFloat(score.toFixed(2)));
      gridStore.setTileValue(j, i, parseFloat(score.toFixed(2)));
    }
    gridScores.push(rowScores);
  }
  // console.table(gridScores);

  if (bestPosition) {
    actionScores.push({ score: bestScore, action: { type: "move", target: bestPosition }});
  }

  // console.log(actionScores);
  const bestActionScore = actionScores.reduce(
    (prev, curr) => (curr.score > prev.score ? curr : prev)
  );
  return bestActionScore.action;
}
*/