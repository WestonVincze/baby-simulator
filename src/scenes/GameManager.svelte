<script lang="ts">
  import { onMount } from "svelte";
  import { type GameState, gameState, Scene } from "../stores/GameState";
  import MainMenu from "./MainMenu.svelte";
  import Game from "./Game.svelte";
  import GameOver from "./GameOver.svelte";

  let state: GameState;

  const unsubscribe = gameState.subscribe(value => {
    state = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    }
  });
  $: console.log(state.activeScene)
</script>

{#if state.activeScene === Scene.MainMenu}
  <MainMenu />
{:else if state.activeScene === Scene.Playing}
  <Game />
{:else if state.activeScene === Scene.GameOver}
  <GameOver />
{/if}
