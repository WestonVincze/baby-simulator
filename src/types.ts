export type DropZone = "PlayMat" | "ToyBox" | "Baby";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type Shape = "triangle" | "circle" | "square";

export type ToyData = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  lastMoveTime?: number,
  properties: ToyProperties
}

type PropertyData = Record<string,number>

export type ToyProperties = {
  shape: Shape,             // main shape
  colors: string[],         // ordered from highest to lowest %
  patterns: string[],       // list of patterns on the toy
  sounds: string[],         // list of sounds the toy can make
  attributes: PropertyData, // 0-1
}
