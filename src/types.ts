export type DropZone = "PlayMat" | "ToyBox" | "Baby";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type ToyData = {
  id: string,
  loc: DropZone,
  position: { x: number, y: number },
  lastMoveTime?: number,
  properties: ToyProperties
}

export type ToyProperties = {
  shape: "triangle" | "circle" | "square", // main shape
  colors: string[],                        // ordered from highest to lowest %
  patterns: string[],                      // list of patterns on the toy
  sounds: string[],                        // list of sounds the toy can make
  points: number,                          // the number of verticies
  complexity: number,                      // 0-10
  interactivity: number,                   // 0-10
  symmetry: number,                        // 0-10
  smoothness: number,                      // 0-10
  luster: number,                          // 0-10
}
