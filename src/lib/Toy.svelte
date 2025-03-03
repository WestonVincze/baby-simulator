<script lang="ts">
  import type { DragData, ToyState } from "$types";
  import ToyIcon from "$icons/ToyIcon.svelte";
  import { toyStore } from "$stores";

  export let toy: ToyState
  export let absolutePosition = false;

  let currentAudio: HTMLAudioElement | null = null;

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

  const playSound = (soundName: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(`sfx/${soundName}.mp3`);
    currentAudio.play();
  }

  const handleClick = (event: Event) => {
    const sounds = Object.entries(toy.data.attributes).filter(([key, attribute]) => attribute.category === "Sound");

    if (sounds.length > 0){
      toyStore.interactWithToy(toy.id);
      playSound(sounds[0][0]);
    }
    
    /* debug: print toy data */
    console.log(`toy ${toy.id}`);
    console.log(`latest interactions:\n${toy.interactions?.map(x => `${x.type}: ${x.timestamp}ms`).join('\n')}`);
    console.log(`position: ${toy.position.x}, ${toy.position.y}`)
    console.table(toy.data.attributes);
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
  <ToyIcon name={toy.data.name} />
</div>

<style>
  .toy {
    cursor: pointer;
  }
  /*
  .custom-drag-image {
    opacity: 0;
  }
  */
</style>
