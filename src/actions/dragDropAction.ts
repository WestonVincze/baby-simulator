import { toyStore, playMatStore } from "$stores";
import type { Action } from "svelte/action"
import type { DragData, DropZone } from "$types";
import { TOY_SIZE } from "$constants";
import { get } from "svelte/store";

interface DragDropOptions {
  dropZone: DropZone;
  onDrop?: (id: string, target?: number) => void;
}

interface TouchData {
  id: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  height: number;
  width: number;
}

export const dragDrop: Action<HTMLElement, DragDropOptions> = (node, options) => {
  let touchData: TouchData | null = null;
  let draggedElement: HTMLElement | null = null;
  let ghostElement: HTMLElement | null = null;

  function getDropZoneFromPoint(clientX: number, clientY: number): { dropZone: DropZone; rect: DOMRect; element: HTMLElement } | null {
    const el = document.elementFromPoint(clientX, clientY);
    const dropZoneEl = el?.closest<HTMLElement>("[data-dropzone]");
    if (!dropZoneEl) return null;
    const zone = dropZoneEl.getAttribute("data-dropzone") as DropZone;
    console.log(zone);
    return { dropZone: zone, rect: dropZoneEl.getBoundingClientRect(), element: dropZoneEl };
  }

  function logicalPlayMatCoords(offsetX: number, offsetY: number, rect: DOMRect): { x: number; y: number } {
    const { logicalWidth, logicalHeight } = get(playMatStore);
    const logicalX = (offsetX / rect.width) * logicalWidth;
    const logicalY = (offsetY / rect.height) * logicalHeight;
    return {
      x: Math.max(TOY_SIZE / 2, Math.min(logicalWidth - TOY_SIZE / 2, logicalX)),
      y: Math.max(TOY_SIZE / 2, Math.min(logicalHeight - TOY_SIZE / 2, logicalY)),
    };
  }

  // Desktop drag and drop handlers
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

    const { id } = dragData;
    const zoneInfo = getDropZoneFromPoint(event.clientX, event.clientY);
    const dropZone = zoneInfo?.dropZone ?? options.dropZone;
    const rect = zoneInfo?.rect ?? node.getBoundingClientRect();

    if (dropZone === "ToyBox") {
      const toyBoxEl = zoneInfo?.element ?? node;
      const padding = 15;
      const adjustedOffsetX = event.clientX - rect.left + toyBoxEl.scrollLeft;
      const rawIndex = (adjustedOffsetX - padding) / (TOY_SIZE + 15);
      const targetIndex = Math.max(0, Math.round(rawIndex));

      toyStore.moveToy(id, dropZone, 0, 0);

      options.onDrop?.(id, targetIndex);
    } else {
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const { x, y } = logicalPlayMatCoords(offsetX, offsetY, rect);

      toyStore.moveToy(id, dropZone, x, y);
      options.onDrop?.(id);
    }
  }

  // Mobile touch handlers
  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    const target = event.target as HTMLElement;

    // Check if the target is a draggable toy
    const draggableToy = target.closest("[draggable='true']") as HTMLElement;
    if (!draggableToy) return;

    const toyId = draggableToy.getAttribute("data-toy-id");
    if (!toyId) return;

    draggedElement = draggableToy;
    
    const rect = draggableToy.getBoundingClientRect();
    touchData = {
      id: toyId,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      height: rect.height,
      width: rect.width,
    };

    // Create a ghost element for visual feedback
    ghostElement = draggableToy.cloneNode(true) as HTMLElement;
    ghostElement.style.position = "fixed";
    ghostElement.style.pointerEvents = "none";
    ghostElement.style.opacity = "0.7";
    ghostElement.style.zIndex = "10000";
    ghostElement.style.transition = "none";
    document.body.appendChild(ghostElement);

    updateGhostPosition(touch.clientX, touch.clientY);
    draggedElement.style.opacity = "0.5";
  }

  const handleTouchMove = (event: TouchEvent) => {
    if (!touchData || !ghostElement) return;

    event.preventDefault();
    const touch = event.touches[0];

    touchData.currentX = touch.clientX;
    touchData.currentY = touch.clientY;

    updateGhostPosition(touch.clientX, touch.clientY);
  }

  const handleTouchEnd = (event: TouchEvent) => {
    if (!touchData || !draggedElement || !ghostElement) return;

    const touch = event.changedTouches[0];

    const zoneInfo = getDropZoneFromPoint(touch.clientX, touch.clientY);
    const dropZone = zoneInfo?.dropZone ?? options.dropZone;
    const rect = zoneInfo?.rect ?? node.getBoundingClientRect();

    const offsetX = touch.clientX - rect.left;
    const offsetY = touch.clientY - rect.top;

    if (dropZone === "ToyBox") {
      const toyBoxEl = zoneInfo?.element ?? node;
      const padding = 15;
      const adjustedOffsetX = touch.clientX - rect.left + toyBoxEl.scrollLeft;
      const rawIndex = (adjustedOffsetX - padding) / (TOY_SIZE + 15);
      const targetIndex = Math.max(0, Math.round(rawIndex));
      toyStore.moveToy(touchData.id, dropZone, 0, 0);
      options.onDrop?.(touchData.id, targetIndex);
    } else {
      const { x, y } = logicalPlayMatCoords(offsetX, offsetY, rect);

      toyStore.moveToy(touchData.id, dropZone, x, y);
      options.onDrop?.(touchData.id);
    }

    // Cleanup
    if (ghostElement && ghostElement.parentNode) {
      document.body.removeChild(ghostElement);
    }
    if (draggedElement) {
      draggedElement.style.opacity = "1";
    }

    ghostElement = null;
    draggedElement = null;
    touchData = null;
  }

  const updateGhostPosition = (clientX: number, clientY: number) => {
    if (!ghostElement || !touchData) return;

    ghostElement.style.left = `${clientX - touchData.width / 2}px`;
    ghostElement.style.top = `${clientY - touchData.height / 2}px`;
  }

  // Add event listeners
  node.addEventListener("dragover", handleDragOver);
  node.addEventListener("drop", handleDrop);
  node.addEventListener("touchstart", handleTouchStart, { passive: false });
  node.addEventListener("touchmove", handleTouchMove, { passive: false });
  node.addEventListener("touchend", handleTouchEnd);

  return {
    destroy() {
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
      node.removeEventListener("touchstart", handleTouchStart);
      node.removeEventListener("touchmove", handleTouchMove);
      node.removeEventListener("touchend", handleTouchEnd);

      // Cleanup ghost element if still exists
      if (ghostElement && ghostElement.parentNode) {
        document.body.removeChild(ghostElement);
      }
    }
  }
}