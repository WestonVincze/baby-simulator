<script lang="ts">
  import Toy from "./Toy.svelte";
  import { toys } from "../stores/ToyStore";
  import { dragDrop } from "../actions/dragDropAction";
  import { TOY_SIZE } from "../constants";
  import { toyProperties } from "../data/Toys";

  toyProperties.forEach(properties => toys.addToy({ loc: "ToyBox", properties }));

  $: toyBoxToys = $toys
    .filter(toy => toy.loc === "ToyBox")
    .sort((toyA, toyB) => toyA.position.x - toyB.position.x)
    .map((toy, i) => {
      const x = i * (TOY_SIZE + 15) + 15;
      toys.updateToy(toy.id, toy.loc, x, toy.position.y);
      return toy;
    });
</script>

<div class="toy-box" use:dragDrop={{ dropZone: "ToyBox"}} role="presentation">
  {#each toyBoxToys as toy}
    <Toy {toy} />
  {/each}
</div>

<style>
  .toy-box {
    background-color: burlywood;
    width: 100%;
    height: 100px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
</style>
