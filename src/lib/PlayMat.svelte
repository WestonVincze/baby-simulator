<script lang="ts">
  import Baby from "./Baby.svelte";
  import Toy from "./Toy.svelte";
  import { toys } from "../stores/ToyStore";
  import { dragDrop } from "../actions/dragDropAction";

  $: playMatToys = $toys.filter(toy => toy.loc === "PlayMat");
</script>

<div class="playMat" use:dragDrop={{ dropZone: "PlayMat" }} role="presentation">
  <Baby />
  {#each playMatToys as toy}
    <Toy {toy} absolutePosition={true} />
  {/each}
</div>

<style>
  .playMat {
    background-color: tomato;
    height: 500px;
    width: 800px;
    border-radius: 15px;
    position: relative;
    display: flex;
    place-items: center;
  }
</style>