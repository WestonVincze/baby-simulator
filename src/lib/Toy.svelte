<script lang="ts">
  import type { DragData, ToyData } from "../types";
  import BasicShape from "./BasicShape.svelte";

  export let toy: ToyData
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
    
    // center drag image under the cursor
    event.dataTransfer.setDragImage(el, rect.width / 2, rect.height / 2);

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("application/json", JSON.stringify(dragData));
  }

  const handleDragEnd = (event: DragEvent) => {}

  const handleClick = (event: Event) => {
    /* debug: print toy data */
    console.log(`toy ${toy.id}`);
    console.log(`lastMoveTime: ${toy.lastMoveTime}`);
    console.log(`shape: ${toy.properties.shape}`);
    console.log(`colors: ${toy.properties.colors.join(", ")}`);
    console.log(`patterns: ${toy.properties.patterns.join(", ")}`);
    console.log(`sounds: ${toy.properties.sounds.join(", ")}`);
    console.table(toy.properties.attributes);
  }
</script>

<div
  id="{toy.id.toString()}"
  class="toy"
  draggable="true"
  on:click={handleClick}
  on:dragstart={handleDragStart}
  on:dragend={handleDragEnd}
  role="presentation"
  style="{absolutePosition
    ? `position: absolute;
       left: ${toy.position?.x}px;
       top: ${toy.position?.y}px;`
    : ""}"
  >
  <BasicShape type={toy.properties.shape} color={toy.properties.colors[0]} />
</div>

<style>
  .toy {
    cursor: pointer;
  }
  .custom-drag-image {
    opacity: 0;
  }
</style>
