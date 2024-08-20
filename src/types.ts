export type DropZone = "PlayMat" | "ToyBox" | "Baby";

export interface DragData {
  id: string,
  width: number,
  height: number,
}

export type ToyData = {
  id: string,
  loc: DropZone,
  color: string,
  type: "triangle" | "circle" | "square",
  position: { x: number, y: number }
}
