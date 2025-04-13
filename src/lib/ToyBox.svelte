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
  <h2>Toy Box <InfoTooltip text="Toy Box contains all available toys. Moving a toy to the Play Mat will make it available to baby." /></h2>

  <div
    class="toy-box"
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
    background-color: #BB8493;
    border-radius: 15px;
  }
  .toy-box {
    position: relative;
    width: 100%;
    height: 100px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
</style>
