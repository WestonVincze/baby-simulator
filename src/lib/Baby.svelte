<script lang="ts">
  import { dragDrop } from "../actions/dragDropAction";
  import { toys } from "../stores/ToyStore";
  import Toy from "./Toy.svelte";

  $: currentToy = $toys.filter(toy => toy.loc === "Baby")[0] ?? null;

  const handleDrop = (id: string) => {
    if (currentToy && currentToy.id !== id) {
      toys.updateToy(currentToy.id, "ToyBox", 200, 200);
    }
  }
</script>

<div
  class="baby-container"
  use:dragDrop={{ dropZone: "Baby", onDrop:  handleDrop }}
>
  <!-- does not look good in current state
  <img
    class="thoughts"
    draggable="false"
    src="thought-bubbles.svg"
    alt="thought bubble graphic"
  />
  -->
  <img
    class="baby"
    draggable="false"
    src="sitting-baby.png"
    alt="Sitting baby"
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
  .thoughts {
    width: 150px;
    position: absolute;
    bottom: 85%;
    opacity: 0.5;
    pointer-events: none;
    z-index: 5;
  }
  .baby {
    width: 200px;
    pointer-events: none;
  }
  .current-toy {
    z-index: 4;
    position: absolute;
    top: 85%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>