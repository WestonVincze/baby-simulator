import type { Action } from "svelte/action"

interface DragDropOptions {
  dropZone: "PlayMat" | "ToyBox";
  onDrop: (id: string, dropZone: "PlayMat" | "ToyBox", x: number, y: number) => void
}

export const dragDrop: Action<HTMLElement, DragDropOptions> = (node, options) => {
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    const id = event.dataTransfer?.getData("id");
    if (!id) {
      console.warn("Dropped object does not have an id.");
      return;
    }

    const { dropZone, onDrop } = options;
    onDrop(id, dropZone, event.offsetX, event.offsetY);
  }

  node.addEventListener("dragover", handleDragOver);
  node.addEventListener("drop", handleDrop);

  return {
    destroy() {
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
    }
  }
}
