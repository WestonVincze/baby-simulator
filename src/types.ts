export type DropZone = "PlayMat" | "ToyBox" | "Baby";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type Shape = "triangle" | "circle" | "square";
export type Color = "green" | "red" | "blue";
export type Pattern = "stars" | "dots" | "stripes";
export type Sound = "ding" | "beep" | "pop";

export type ToyProperty =
  | Shape
  | Color
  | Pattern
  | Sound
  | "complexity"
  | "interactivity"
  | "symmetry"
  | "smoothness"
  | "luster";

export type ToyAttributes = {
  [key in ToyProperty]?: number
}

export type ToyProperties = {
  shape: Shape,             // main shape
  colors: Color[],         // ordered from highest to lowest %
  patterns: Pattern[],       // list of patterns on the toy
  sounds: Sound[],         // list of sounds the toy can make
  attributes: ToyAttributes, // 0-1
}

export type ToyData = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  lastMoveTime?: number,
  properties: ToyProperties
}