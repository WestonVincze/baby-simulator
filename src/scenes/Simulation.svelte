<script lang="ts">
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
  import { babyStore } from "$stores";
  import ProgressBar from "$lib/ProgressBar.svelte";
</script>

<section>
  <div class="boredom">
    <h2>Boredom</h2>
    <div class="bar">
      <ProgressBar min={$babyStore.boredom} max={1} />
    </div>
  </div>
  <PlayMat />
  <ToyBox />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .boredom .bar {
    width: 100%;
    height: 25px;
  }
</style>
