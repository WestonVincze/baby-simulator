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

export type Shape = 
  | "triangle"
  | "circle"
  | "square"
  | "oval"
  | "rectangle"
  | "wire";

export type Color =
  | "white"
  | "red"
  | "orange"
  | "yellow"
  | "brown"
  | "green"
  | "blue"
  | "indigo"
  | "peach"
  | "violet"
  | "black";

export type Pattern =
  | "dots"
  | "letters"
  | "stars"
  | "stripes";

export type Sound = 
  | "squeak"
  | "rattle"
  | "clank"
  | "clink"
  | "ding"
  | "beep"
  | "pop";

export type ToyAttribute =
  | Shape
  | Color
  | Pattern
  | Sound
//| Texture ?
//| "softness"
  | "complexity"
  | "interactivity"
  | "symmetry"
  | "smoothness"
  | "luster";

export type ToyAttributes = {
  [key in ToyAttribute]?: number
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
  boredom: number,               // 0-1
  aversions: ToyAttributes,      // 0-1
  preferences: ToyAttributes,    // 0-1
}
