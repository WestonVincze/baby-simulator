import type { AllAttributes, Colors } from "toyAttributes";

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

export type Color = typeof Colors[number];

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

export type InteractionType = "move" | "sound" | "drop";

export type Interaction = {
  type: InteractionType,
  timestamp: number
}

export type ToyState = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  interactions?: Interaction[],
  data: ToyData
}

export type BabyState =
  | "IDLE"
  | "MOVING"
  | "PLAYING"
  | "PICKING_UP_OBJECT"
  | "DROPPING_OBJECT";

export type BabyData = {
  state: BabyState,
  position: { x: number, y: number },
  currentToy: ToyState | null,
  desiredToy: ToyState | null,
  boredom: number,               // 0-1
  aversions: ToyAttributes,      // 0-1
  preferences: ToyAttributes,    // 0-1
}

export type DebugData = {
  // babyData: BabyData,
  appraisals: AppraisalScore[],
  selectedAppraisal: AppraisalScore | null
}

export type AppraisalScore = {
  name: string,
  score: number,
  considerations: ConsiderationScore[]
}

export type ConsiderationScore = {
  name: string,
  score: number,
  /*scores: {
    aversion: number,
    preference: number,
    distance: number,
    recentInteractions: number,
    bonusWeight: number,
    total: number,
  }*/
}

export type Position = {
  x: number,
  y: number
}

export type GridItem = {
  id: string,
  x: number,
  y: number,
}

export type Tile = {
  id: string,
  position: Position,
  coordinates: Position,
  walkable: boolean,
  items: GridItem[],
  value: number // for debugging
}

export type Grid = Tile[][];
