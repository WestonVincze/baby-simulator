import { toys } from "../stores/ToyStore";
import type { Action } from "svelte/action"
import type { DragData, DropZone } from "../types";

interface DragDropOptions {
  dropZone: DropZone;
  onDrop?: (id: string) => void;
}

export const dragDrop: Action<HTMLElement, DragDropOptions> = (node, options) => {
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const data = event.dataTransfer?.getData("application/json");

    if (!data) {
      console.warn("Dropped object is missing data.");
      return;
    }

    let dragData: DragData;
    try {
      dragData = JSON.parse(data) as DragData;
    } catch {
      console.error("Dropped object contains an invalid data.")
      return;
    }

    const { dropZone } = options;
    const { id, height, width } = dragData;

    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - width / 2;
    const offsetY = event.clientY - rect.top - height / 2;

    const x = Math.max(0, Math.min(rect.width - width, offsetX));
    const y = Math.max(0, Math.min(rect.height - height, offsetY));

    toys.updateToy(id, dropZone, x, y);
    options.onDrop?.(id);
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
