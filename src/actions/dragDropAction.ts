import { toyStore } from "$stores";
import type { Action } from "svelte/action"
import type { DragData, DropZone } from "$types";
import { PLAY_MAT_HEIGHT, PLAY_MAT_WIDTH, TOY_SIZE } from "$constants";

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
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const x = Math.max(TOY_SIZE / 2, Math.min(PLAY_MAT_WIDTH - TOY_SIZE / 2, offsetX));
    const y = Math.max(TOY_SIZE / 2, Math.min(PLAY_MAT_HEIGHT - TOY_SIZE / 2, offsetY));

    options.onDrop?.(id);
    toyStore.moveToy(id, dropZone, x, y);
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
