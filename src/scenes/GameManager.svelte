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

  $: console.log(`current scene: ${Scene[state.activeScene]}`);
</script>

<div class="game">
  {#if state.activeScene === Scene.MainMenu}
    <MainMenu />
  {:else if state.activeScene === Scene.Playing}
    <Game />
  {:else if state.activeScene === Scene.GameOver}
    <GameOver />
  {/if}
</div>

<style>
  .game {
    position: relative;
    width: 995px;
    height: 650px;
    display: flex;
    justify-content: center;
  }
</style>
