<script lang="ts">
  import Baby from "./Baby.svelte";
  import Toy from "./Toy.svelte";
  import GridOverlay from "./GridOverlay.svelte";
  import { gameStore, toyStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import { onDestroy } from "svelte";
  import { CELL_SIZE, PLAY_MAT_WIDTH, PLAY_MAT_HEIGHT } from "$constants";

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // ["Aa", "Bb", "Cc"] ?
  const COLS = Math.floor(PLAY_MAT_WIDTH / CELL_SIZE);
  const ROWS = Math.floor(PLAY_MAT_HEIGHT / CELL_SIZE);

  let carpetTiles: { letter: string; x: number; y: number; dark: boolean }[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      carpetTiles.push({
        letter: ALPHABET[(row * COLS + col) % ALPHABET.length],
        x: col * CELL_SIZE,
        y: row * CELL_SIZE,
        dark: (row + col) % 2 === 0,
      });
    }
  }

  let isDebug = false;

  const unsubscribeGameStore = gameStore.subscribe(data => isDebug = data.isDebugMode);

  $: playMatToys = $toyStore.filter(toy => toy.loc === "PlayMat");

  onDestroy(() => {
    unsubscribeGameStore();
  })
</script>

<div class="playMat" data-dropzone="PlayMat" use:dragDrop={{ dropZone: "PlayMat" }} role="presentation">
  <div class="carpet" aria-hidden="true">
    {#each carpetTiles as tile}
      <span
        class="tile {tile.dark ? 'dark' : ''}"
        style="left: {tile.x}px; top: {tile.y}px;"
      >{tile.letter}</span>
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

<style>
  .playMat {
    background-color: #704264;
    /* height / width should match values in `constants.ts` */
    height: 500px;
    width: min(800px, 100%);
    border-radius: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
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
    /* sync with CELL_SIZE */
    width: 50px;
    height: 50px;
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
