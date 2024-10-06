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
  | "train"

export type Shape = 
  | "triangle"
  | "circle"
  | "square";

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
  | "ding"
  | "beep"
  | "pop";

export type ToyProperty =
  | Shape
  | Color
  | Pattern
  | Sound
//| Texture ?
//| "singularity" (something to indicate whether a toy has multiple)
//| "softness"
  | "complexity"
  | "interactivity"
  | "symmetry"
  | "smoothness"
  | "luster";

export type ToyAttributes = {
  [key in ToyProperty]?: number
}

export type ToyProperties = {
  name: ToyName,
  shapes: Shape[],           // primary shape
  colors: Color[],           // ordered from highest to lowest %
  patterns: Pattern[],       // list of patterns on the toy
  sounds: Sound[],           // list of sounds the toy can make
  attributes: ToyAttributes, // 0-1
}

export type ToyData = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  lastMoveTime?: number,
  properties: ToyProperties
}