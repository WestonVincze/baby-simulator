<script lang="ts">
  import DebugScreen from "$lib/DebugScreen.svelte";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
  import { babyStore } from "$stores";
  import { onDestroy, onMount } from "svelte";
  import { gameStore } from "$stores";
    import ProgressBar from "$lib/ProgressBar.svelte";
    import InfoTooltip from "$lib/InfoTooltip.svelte";

  let showDebugScreen = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '`') {
      showDebugScreen = !showDebugScreen;
    }
    if (event.key === 'Escape') {
      gameStore.togglePause();
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<div class="game">
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

  {#if showDebugScreen}
    <DebugScreen />
  {/if}
</div>

<style>
  .game { 
    display: flex;
    gap: 15px;
  }
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
