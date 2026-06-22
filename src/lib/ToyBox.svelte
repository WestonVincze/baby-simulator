<script lang="ts">
  import { onMount } from "svelte";
  import Toy from "./Toy.svelte";
  import InfoTooltip from "./InfoTooltip.svelte";
  import { toyStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import { Toys } from "$data/Toys";
  import { TOY_SIZE } from "../constants";

  let toyOrder: string[] = []

  onMount(() => {
    if ($toyStore.length > 0) return;

    Toys.forEach((properties, i) => {
      toyStore.addToy({
        loc: "ToyBox",
        data: properties,
        position: {
          x: i * (TOY_SIZE + 15) + (TOY_SIZE / 2) + 15,
          y: 0
        }
      })
      toyOrder.push(`${i + 1}`);
    });
  });

  $: toyBoxToys = $toyStore
    .filter(toy => toy.loc === "ToyBox")
    .sort((toyA, toyB) => toyOrder.findIndex(id => id === toyA.id) - toyOrder.findIndex(id => id === toyB.id));

  function handleDrop(draggedToyId: string, targetIndex?: number) {
    if (targetIndex === undefined) return;

    const currentIndex = toyOrder.indexOf(draggedToyId);

    if (currentIndex !== -1) {
      toyOrder.splice(currentIndex, 1);
    }

    toyOrder.splice(targetIndex, 0, draggedToyId);
  }
</script>

<div class="toy-box-container">
  <div
    class="toy-box"
    data-dropzone="ToyBox"
    use:dragDrop={{
      dropZone: "ToyBox",
      onDrop: (id, target) => handleDrop(id, target)
    }}
    role="presentation"
  >
    {#each toyBoxToys as toy}
      <Toy {toy} />
    {/each}
  </div>
</div>

<style>
  .toy-box-container {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: center;
  }
  .toy-box {
    position: relative;
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: #BB8493;
    width: 100%;
    height: 100px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;
    scrollbar-width: thin;
    filter: drop-shadow(0 -4px 8px rgba(0,0,0,0.50));
  }
  .toy-box::-webkit-scrollbar {
    height: 4px;
  }
  .toy-box::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 2px;
  }
</style>
