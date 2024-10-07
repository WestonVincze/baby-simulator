<script lang="ts">
  import Baby from "./Baby.svelte";
  import Toy from "./Toy.svelte";
  import { toys } from "../stores/ToyStore";
  import { dragDrop } from "../actions/dragDropAction";
    import InfoTooltip from "./InfoTooltip.svelte";

  $: playMatToys = $toys.filter(toy => toy.loc === "PlayMat");
</script>

<div class="playMat" use:dragDrop={{ dropZone: "PlayMat" }} role="presentation">
  <h2>Play Mat<InfoTooltip text="Drag & drop toys to and from the play mat." /></h2>
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
    height: 500px;
    width: 800px;
    border-radius: 15px;
    position: relative;
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 25%;
  }
</style>