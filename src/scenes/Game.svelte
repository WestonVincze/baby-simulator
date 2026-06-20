<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { babyStore, gameStore, gridStore, mainMenu, sfxStore, contextStore } from "$stores";
  import Modal from "$lib/Modal.svelte";
  import { brainReasoner, createPickupToyAppraisals } from "$ai/Reasoner";
  import { ActionSystem } from "$ai/Actions/ActionSystem";
  import { get } from "svelte/store";
  import Simulation from "./Simulation.svelte";
  import Detailed from "./Detailed.svelte";
  import DecisionChart from "$lib/DecisionChart.svelte";

  export let mode: "detailed" | "simulation" = "detailed";
  let showDebugScreen = false;
  let showPauseMenu = false;
  let sfxVolume = 0.3;

  let isPaused = false;

  const unsubscribeGame = gameStore.subscribe(data => {
    isPaused = data.isPaused;
  })

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
    if (isPaused) return;
    // update baby's aversion scores
    babyStore.updateStats();

    const context = get(contextStore);

    const babyCoordinates = gridStore.getGridCoordinates(context.baby.position.x, context.baby.position.y)
    const toysInRange = gridStore.getItemsWithinOneTile(babyCoordinates.x, babyCoordinates.y);

    const dynamicAppraisals = createPickupToyAppraisals(
      toysInRange.map(toy => toy.id)
    );

    const decision = brainReasoner.getBestAction(context, dynamicAppraisals);

    if (!decision) return;

    ActionSystem.executeAction(decision);
  }, 100)

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    window.removeEventListener('keydown', handleKeyDown);
    unsubscribeGame();
    clearInterval(update);
  });
</script>

<div class="game">
  {#if mode === "detailed"}
    <Detailed />
  {:else if mode === "simulation"}
    <Simulation />
  {/if}

  {#if showDebugScreen}
    <DecisionChart />
    <!--DebugScreen /-->
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
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
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
