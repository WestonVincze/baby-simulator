<script lang="ts">
  import BasicShape from "../icons/ToyIcon.svelte";
  import Toy from "./Toy.svelte";
  import { dragDrop } from "../actions/dragDropAction";
  import { toyStore } from "../stores/ToyStore";
  import type { ToyState } from "../types";
  import { onDestroy } from "svelte";
  import { babyStore } from "../stores/BabyStore";
  import { getTimeSinceTimestamp } from "../helpers";

  let baby: HTMLImageElement;

  $: currentToy = $toyStore.filter(toy => toy.loc === "Baby")[0] ?? null;
  $: babyStore.setCurrentToy(currentToy);

  const update = setInterval(() => {
    babyStore.updateStats();
  }, 100);

  $: desiredToy = currentToy || $toyStore
    .filter(toy => toy.loc === "PlayMat")
    .map(toy => ({ toy, distance: Math.sqrt(
      Math.pow(toy.position.x - 400, 2) +
      Math.pow(toy.position.y - 250, 2))
    } as { toy: ToyState | null, distance: number }))
    .reduce((closestToy, toy) =>
      closestToy.distance < toy.distance
      ? closestToy
      : toy, { toy: null, distance: Infinity })
    .toy || null;


  // TODO: remove this placeholder for tracking the most recently interacted toy
  $: mostRecentlyInteractedToy = $toyStore
    .filter(toy => toy.loc === "PlayMat" && toy.lastMoveTime)
    .map(toy => ({ name: toy.data.name, time: getTimeSinceTimestamp(toy.lastMoveTime!) }))
    .reduce((mostRecentlyInteractedToy, toy) => 
      mostRecentlyInteractedToy.time < toy.time
      ? mostRecentlyInteractedToy
      : toy, { name: "", time: Infinity }).name;

  $: console.log(`most recently interacted toy: ${mostRecentlyInteractedToy || "N/A"}`);
  
  const handleDrop = (id: string) => {
    if (currentToy && currentToy.id !== id) {
      toyStore.updateToy(currentToy.id, "ToyBox", Infinity, 0);
    }
  }

  onDestroy(() => {
    clearInterval(update);
  })
</script>

<svelte:head>
  <link rel="preload" as="image" href="/thought-bubbles.svg" />
</svelte:head>

<div
  class="baby-container"
  use:dragDrop={{ dropZone: "Baby", onDrop:  handleDrop }}
>
  {#if desiredToy}
    <div class="desired-toy">
      <div class="desired-toy-container">
        <img
          class="thought-bubble"
          draggable="false"
          src="thought-bubbles.svg"
          alt="thought bubble graphic"
        />
        <BasicShape name={desiredToy.data.name} colors={desiredToy.data.colors} />
      </div>
    </div>
  {/if}
  <img
    class="baby"
    draggable="false"
    src="sitting-baby.png"
    alt="Sitting baby"
    bind:this={baby}
  />
  {#if currentToy}
    <div class="current-toy">
      <Toy toy={currentToy} />
    </div>
  {/if}
</div>

<style>
  .baby-container {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin: 0 auto;
  }
  .desired-toy {
    position: absolute;
    bottom: 85%;
    pointer-events: none;
    z-index: 5;
  }
  .desired-toy-container {
    height: 130px;
    width: 150px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .thought-bubble {
    width: 150px;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.5;
  }
  .baby {
    width: 200px;
    pointer-events: none;
    z-index: 3;
  }
  .current-toy {
    z-index: 4;
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
