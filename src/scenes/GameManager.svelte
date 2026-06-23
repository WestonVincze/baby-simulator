<script lang="ts">
  import { onMount } from "svelte";

  import { type GameState, gameStore, Scene } from "$stores";
  import MainMenu from "./MainMenu.svelte";
  import Game from "./Game.svelte";
  import GameOver from "./GameOver.svelte";

  let state: GameState;

  const unsubscribe = gameStore.subscribe(value => {
    state = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    }
  });
</script>

{#if state.activeScene === Scene.MainMenu}
  <MainMenu />
{:else if state.activeScene === Scene.Playing}
  <Game mode="detailed" />
{:else if state.activeScene === Scene.Simulation}
  <Game mode="simulation" />
{:else if state.activeScene === Scene.GameOver}
  <GameOver />
{/if}
