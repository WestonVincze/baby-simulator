<script lang="ts">
  import { onDestroy } from "svelte";

  import Toy from "./Toy.svelte";
  import ToyIcon from "$icons/ToyIcon.svelte";
  import { dragDrop } from "$actions/dragDropAction";
  import { gameStore, babyStore, toyStore } from "$stores";
  import type { ToyState } from "$types";

  let baby: HTMLImageElement;
  let toys: ToyState[];
  let isPaused = false;

  const unsubscribeToys = toyStore.subscribe(data => {
    toys = data
  })

  const unsubscribeGame = gameStore.subscribe(data => {
    isPaused = data.isPaused;
  })

  $: currentToy = $toyStore.filter(toy => toy.loc === "Baby")[0] ?? null;
  $: babyStore.setCurrentToy(currentToy);
  $: activeToys = toys.filter(toy => toy.loc === "PlayMat" || toy.loc === "Baby");

  const handleDrop = (id: string) => {
    if (!currentToy || currentToy.id === id) return;

    const toy = toyStore.getToyById(id);

    if (!toy) {
      console.error(`Unexpected error; toy not found for for id ${id}`);
      return;
    }

    toyStore.moveToy(
      currentToy.id,
      toy.loc,
      toy.position.x,
      toy.position.y
    );
  }

  const update = setInterval(() => {
    if (isPaused) return;
    babyStore.updateStats();
    babyStore.setDesiredToy(activeToys);
  }, 100);

  onDestroy(() => {
    clearInterval(update);
    unsubscribeToys();
    unsubscribeGame();
  })
</script>

<svelte:head>
  <link rel="preload" as="image" href="/thought-bubbles.svg" />
</svelte:head>

<div
  class="baby-container"
  use:dragDrop={{ dropZone: "Baby", onDrop: handleDrop }}
>
  {#if $babyStore.desiredToy}
    <div class="desired-toy">
      <div class="desired-toy-container">
        <img
          class="thought-bubble"
          draggable="false"
          src="thought-bubbles.svg"
          alt="thought bubble graphic"
        />
        <ToyIcon name={$babyStore.desiredToy.data.name}  />
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
