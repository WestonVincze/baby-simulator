<script lang="ts">
  import { babyStore } from "$stores";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
  import ProgressBar from "$lib/ProgressBar.svelte";
</script>

<div class="game">
  <div class="boredom">
    <h2>Boredom</h2>
    <div class="bar">
      <ProgressBar min={$babyStore.boredom} max={1} height={"20px"} color="#BB8493"/>
    </div>
  </div>
  <PlayMat />
  <ToyBox />
</div>

<style>
  .game {
    width: 100%;
    height: 100svh;
    max-width: 1200px;
    margin: 0 auto;
  }
  .boredom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 15px;
    padding: 0 25px;
  }
  .boredom .bar {
    flex-grow: 1;
  }
</style>
