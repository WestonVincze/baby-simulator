<script lang="ts">
  import DebugScreen from "$lib/DebugScreen.svelte";
  import { onDestroy, onMount } from "svelte";
  import { babyStore, gameStore, gridStore, mainMenu, sfxStore, toyStore } from "$stores";
  import Modal from "$lib/Modal.svelte";
  import { brainReasoner, createPickupToyAppraisals, type Context } from "$ai/Reasoner";
  import { ActionSystem } from "$ai/Actions/ActionSystem";
  import { get } from "svelte/store";
  import { AversionConsideration, PreferenceConsideration, RecentInteractionsConsideration } from "$ai/Considerations";
  import Simulation from "./Simulation.svelte";
  import Detailed from "./Detailed.svelte";

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
    babyStore.updateStats();

    const toyValue: Record<string, number> = {}
    const baby = get(babyStore);
    const grid = get(gridStore);
    const toys = get(toyStore);

    toys.forEach(toy => {
      if (toy.loc === "ToyBox") return;

      // mark the value of a toy as -1 if it was dropped within the last 5 seconds
      if (
        toy.interactions &&
        toy.interactions
          .filter(interaction => {
            if (interaction.type !== "drop") return false;

            const time = performance.now() - interaction.timestamp;
            if (time <= 5000) return true;
            return false
          })
          .length > 0
      ) {
        toyValue[toy.id] = -1;
        return;
      }

      const scores: number[] = [];
      // aversion score
      const aversionScore = AversionConsideration(baby.aversions, toy.data.attributes);
      scores.push(aversionScore);

      // preference score
      const preferenceScore = PreferenceConsideration(baby.preferences, toy.data.attributes);
      scores.push(preferenceScore);

      // recent interactions score
      const recentInteractionsScore = toy.interactions ? RecentInteractionsConsideration(toy.interactions, 5000) : 0;
      scores.push(recentInteractionsScore);

      toyValue[toy.id] = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    });

    const context = {
      baby,
      toys,
      toyValue,
      grid
    }

    const babyCoordinates = gridStore.getGridCoordinates(baby.position.x, baby.position.y)
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
