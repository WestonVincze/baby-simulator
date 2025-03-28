<script lang="ts">
  import BabyStats from "$lib/BabyStats.svelte";
  import DebugScreen from "$lib/DebugScreen.svelte";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
  import { onDestroy, onMount } from "svelte";
  import { babyStore, gameStore, gridStore, mainMenu, sfxStore, toyStore } from "$stores";
  import Modal from "$lib/Modal.svelte";
  import { Reasoner } from "$ai/Reasoner";
    import { ActionSystem } from "$ai/Actions/ActionSystem";

  let showDebugScreen = false;
  let showPauseMenu = false;
  let sfxVolume = 0.3;

  const handleVolumeChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    sfxVolume = parseFloat(target.value);
    sfxStore.setVolume('sfx', sfxVolume);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '`') {
      toggleDebug();
    }
    if (event.key === 'Escape') {
      togglePause();
    }
  };

  const togglePause = () => {
    gameStore.togglePause();
    showPauseMenu = !showPauseMenu;
  }

  const toggleDebug = () => {
    gameStore.toggleDebug();
    showDebugScreen = !showDebugScreen;
  }

  const update = setInterval(() => {
    const decision = Reasoner(babyStore, toyStore, gridStore);
    ActionSystem.executeAction(decision, babyStore, toyStore, gridStore);
  }, 100)

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    clearInterval(update);
  });
</script>

<div class="game">
  <aside>
    <BabyStats />
  </aside>

  <section>
    <PlayMat />
    <ToyBox />
  </section>

  {#if showDebugScreen}
    <DebugScreen />
  {/if}
</div>

{#if showPauseMenu}
  <Modal title="Paused" onClose={() => togglePause()}>
    <div class="button-group">
      <button on:click={() => babyStore.resetBabyStore()}>Reset</button>
      <button on:click={() => mainMenu()}>Quit</button>
    </div>
    <div class="slider">
      <label for="volume-slider">Volume:</label>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={sfxVolume}
        on:input={handleVolumeChange}
      />
    </div>
  </Modal>
{/if}

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
  aside {
    width: 225px;
    background-color: #49243E;
    padding: 15px;
    border-radius: 15px;
  }
  .button-group {
    flex-direction: row;
  }
  .button-group > button {
    flex-grow: 1;
  }
  .slider {
    display: flex;
    margin-top: 15px;
    align-content: center;
    justify-content: center;
    gap: 15px;
  }
</style>
