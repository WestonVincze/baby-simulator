import { MoveAppraisal } from "$ai/Appraisals/MoveAppraisal"
import { gridStore } from "$stores"
import type { BabyData, Grid, ToyState } from "$types"
import { CELL_SIZE, PLAY_MAT_HEIGHT, PLAY_MAT_WIDTH } from "$constants"
import { Reasoner, type IConsideration, type IAppraisal, type IContext} from "utilitai"

export interface Context extends IContext {
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

const currentToyValueConsideration: IConsideration<Context> = {
  evaluate: (context) => {
    if (!context.baby.currentToy) return 0;

    return context.toyValue[context.baby.currentToy.id] || 0;
  },
}

brainReasoner.addAppraisal({
  id: "play",
  action: { type: "play" },
  considerations: [
    { consideration: currentToyValueConsideration }
  ],
  weight: 1.2,
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

// TODO: migrate to "points of interest" and dynamically add/remove move to tile appraisals
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    brainReasoner.addAppraisal({
      id: `moveTo-(${i},${j})`,
      considerations: [{
        consideration: {
          evaluate: (context) => {
            const score = MoveAppraisal(context, { x: j, y: i })
            gridStore.setTileValue(j, i, parseFloat(score.toFixed(2)));
            return score;
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
