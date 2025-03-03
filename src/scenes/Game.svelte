<script lang="ts">
  import BabyStats from "$lib/BabyStats.svelte";
  import DebugScreen from "$lib/DebugScreen.svelte";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
  import { onDestroy, onMount } from "svelte";
  import { babyStore, gameStore, mainMenu } from "$stores";
  import Modal from "$lib/Modal.svelte";

  let showDebugScreen = false;
  let showPauseMenu = false;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === '`') {
      showDebugScreen = !showDebugScreen;
    }
    if (event.key === 'Escape') {
      gameStore.togglePause();
      showPauseMenu = !showPauseMenu;
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
  <Modal title="Paused" onClose={() => showPauseMenu = false }>
    <div class="button-group">
      <button on:click={() => babyStore.resetBabyStore()}>Reset</button>
      <button on:click={() => mainMenu()}>Quit</button>
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
</style>
