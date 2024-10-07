<script lang="ts">
  import Toy from "./Toy.svelte";
  import { toys } from "../stores/ToyStore";
  import { dragDrop } from "../actions/dragDropAction";
  import { TOY_SIZE } from "../constants";
  import { Toys } from "../data/Toys";
  import InfoTooltip from "./InfoTooltip.svelte";

  Toys.forEach(properties => toys.addToy({ loc: "ToyBox", properties }));

  $: toyBoxToys = $toys
    .filter(toy => toy.loc === "ToyBox")
    .sort((toyA, toyB) => toyA.position.x - toyB.position.x)
    .map((toy, i) => {
      const x = i * (TOY_SIZE + 15) + 15;
      toys.updateToy(toy.id, toy.loc, x, toy.position.y);
      return toy;
    });
</script>

<div class="toy-box-container">
  <h2>Toy Box <InfoTooltip text="Drag & drop toys to and from the play mat." /></h2>

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
