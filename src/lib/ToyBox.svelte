<script lang="ts">
  import Toy from "./Toy.svelte";
  import { toyStore } from "$stores";
  import { dragDrop } from "$actions/dragDropAction";
  import { Toys } from "$data/Toys";
  import InfoTooltip from "./InfoTooltip.svelte";
  import { TOY_SIZE } from "../constants";

  Toys.forEach(properties => toyStore.addToy({ loc: "ToyBox", data: properties }));

  $: toyBoxToys = $toyStore
    .filter(toy => toy.loc === "ToyBox")
    .sort((toyA, toyB) => toyA.position.x - toyB.position.x)
    .map((toy, i) => {
      const x = i * (TOY_SIZE + 15) + 15;
      toyStore.updateToy(toy.id, toy.loc, x, toy.position.y);
      return toy;
    });
</script>

<div class="toy-box-container">
  <h2>Toy Box <InfoTooltip text="Toy Box contains all available toys. Moving a toy to the Play Mat will make it available to baby." /></h2>

  <div class="toy-box" use:dragDrop={{ dropZone: "ToyBox"}} role="presentation">
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
