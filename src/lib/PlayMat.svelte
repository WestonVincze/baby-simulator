<script lang="ts">
  import Baby from "./Baby.svelte";
  import Toy from "./Toy.svelte";
  import GridOverlay from "./GridOverlay.svelte";
  import { gameStore, toyStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import InfoTooltip from "./InfoTooltip.svelte";
  import { onDestroy } from "svelte";

  let isDebug = false;

  const unsubscribeGameStore = gameStore.subscribe(data => isDebug = data.isDebugMode);

  $: playMatToys = $toyStore.filter(toy => toy.loc === "PlayMat");

  onDestroy(() => {
    unsubscribeGameStore();
  })
</script>

<div class="playMat" use:dragDrop={{ dropZone: "PlayMat" }} role="presentation">
  {#if isDebug}
    <GridOverlay />
  {/if}
  <h2>Play Mat<InfoTooltip text="All toys within the Play Mat are visible to baby. The preferred toy is indicated in a thought bubble if there is at least one toy." /></h2>
  <Baby />
  {#each playMatToys as toy}
    <Toy {toy} absolutePosition={true} />
  {/each}
</div>

<style>
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  .playMat {
    background-color: #704264;
    /* height / width should match values in `constants.ts` */
    height: 500px;
    width: 800px;
    border-radius: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 25%;
  }
</style>
