import type { AllAttributes } from "toyAttributes";

export type DropZone = "PlayMat" | "ToyBox" | "Baby";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type ToyName = 
  | "abcBlocks"
  | "abacus"
  | "ball"
  | "castle"
  | "ducky"
  | "pyramidStack"
  | "rattle"
  | "teddy"
  | "train";

export type AttributeCategory =
  | "Shape"
  | "Color"
  | "Pattern"
  | "Sound"
  | "Other";

export type ToyAttribute = typeof AllAttributes[number];

export type ToyAttributes = {
  [key in ToyAttribute]?: {
    value: number,
    category: AttributeCategory
  }
}

export type ToyData = {
  name: ToyName,
  attributes: ToyAttributes, // 0-1
}

export type ToyState = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  lastMoveTime?: number,
  data: ToyData
}

export type BabyData = {
  position: { x: number, y: number },
  currentToy: ToyState | null,
  desiredToy: ToyState | null,
  boredom: number,               // 0-1
  aversions: ToyAttributes,      // 0-1
  preferences: ToyAttributes,    // 0-1
}

export type DebugData = {
  babyData: BabyData,
  considerations: ConsiderationScores[]
}

export type ConsiderationScores = {
  name: string,
  scores: {
    aversion: number,
    preference: number,
    distance: number,
    lastMove: number,
    bonusWeight: number,
    total: number,
  }
}
