<script lang="ts">
  import type { DragData, Toy } from "../types";
  import BasicShape from "./BasicShape.svelte";

  export let toy: Toy
  export let absolutePosition = false;

  const handleDragStart = (event: DragEvent) => {
    /* we can set a custom image:
     * event.dataTransfer?.setDragImage()
     */
    const el = event.target as HTMLDivElement;
    const id = el.getAttribute("id");

    if (!id || !event.dataTransfer) return;

    const rect = el.getBoundingClientRect();

    const dragData: DragData = {
      id,
      width: rect.width,
      height: rect.height
    }

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(dragData));
  }

  const handleDragEnd = (event: DragEvent) => {}

</script>

<div
  id="{toy.id.toString()}"
  class="draggable"
  draggable="true"
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  role="presentation"
  style="{absolutePosition
    ? `position: absolute;
       left: ${toy.position?.x}px;
       top: ${toy.position?.y}px;`
    : ""}"
  >
  <BasicShape type={toy.type} color={toy.color} />
</div>

<style>
  .draggable {
    cursor: pointer;
  }
</style>
