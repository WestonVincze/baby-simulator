<script lang="ts">
  import Baby from "./Baby.svelte";
  import Toy from "./Toy.svelte";
  import GridOverlay from "./GridOverlay.svelte";
  import { gameStore, toyStore, playMatStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import { onMount, onDestroy } from "svelte";
  import { CELL_SIZE } from "$constants";

  let playMatEl: HTMLDivElement;
  let cols = Math.floor(800 / CELL_SIZE);
  let rows = Math.floor(500 / CELL_SIZE);

  let carpetTiles: { x: number; y: number; dark: boolean }[] = [];
  $: {
    const tiles: typeof carpetTiles = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        tiles.push({
          x: col * CELL_SIZE,
          y: row * CELL_SIZE,
          dark: (row + col) % 2 === 0,
        });
      }
    }
    carpetTiles = tiles;
  }

  let isDebug = false;

  function onPlayMatResize(entry: ResizeObserverEntry) {
    const { width, height } = entry.contentRect;
    cols = Math.floor(width / CELL_SIZE);
    rows = Math.floor(height / CELL_SIZE);
    playMatStore.setDimensions(width, height);
  }

  onMount(() => {
    const observer = new ResizeObserver(([entry]) => onPlayMatResize(entry));
    observer.observe(playMatEl);
    return () => observer.disconnect();
  });

  const unsubscribeGameStore = gameStore.subscribe(data => isDebug = data.isDebugMode);

  $: playMatToys = $toyStore.filter(toy => toy.loc === "PlayMat");

  onDestroy(() => {
    unsubscribeGameStore();
  })
</script>

<div class="playMatContainer" bind:this={playMatEl}>
  <div
    class="playMat"
    data-dropzone="PlayMat"
    style="width: {CELL_SIZE * cols}px; height: {CELL_SIZE * rows}px;"
    use:dragDrop={{ dropZone: "PlayMat" }}
    role="presentation"
  >
    <div class="carpet" aria-hidden="true">
      {#each carpetTiles as tile}
        <span
          class="tile {tile.dark ? 'dark' : ''}"
          style="left: {tile.x}px; top: {tile.y}px; width: {CELL_SIZE}px; height: {CELL_SIZE}px;"
        />
      {/each}
    </div>
    {#if isDebug}
      <GridOverlay />
    {/if}
    <Baby />
    {#each playMatToys as toy}
      <Toy {toy} absolutePosition={true} />
    {/each}
  </div>
</div>

<style>
  .playMatContainer {
    height: calc(100svh - 136px);
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .playMat {
    height: 100%;
    width: 100%;
    background-color: #704264;
    border-radius: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25%;
    overflow: hidden;
  }
  .carpet {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }
  .tile {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    font-size: 11px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.07);
    font-family: Inter, sans-serif;
    user-select: none;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }
  .tile.dark {
    background: rgba(0, 0, 0, 0.04);
  }
</style>
