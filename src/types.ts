export type DropZone = "PlayMat" | "ToyBox";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type Toy = {
  id: string,
  loc: "ToyBox" | "PlayMat",
  color: string,
  type: "triangle" | "circle" | "square",
  position: { x: number, y: number }
}
