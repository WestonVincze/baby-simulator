<script lang="ts">
  import PlayMat from "./lib/PlayMat.svelte";
  import ToyBox from "./lib/ToyBox.svelte";
</script>

<main>
  <h1>Baby Simulator</h1>
  <PlayMat />
  <ToyBox />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
