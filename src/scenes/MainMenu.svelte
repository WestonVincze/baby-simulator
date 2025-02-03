<script lang="ts">
  import { startGame } from "$stores";
  import HowToPlay from "./HowToPlay.svelte";
</script>

<div class="main-menu">
  <header>
    <h1>Baby Simulator</h1>
  </header>

  <div class="button-group">
    <button on:click={startGame}>Start</button>
  </div>

  <HowToPlay />
</div>

<style>
  .main-menu {
    font-family: 'Mountains of Christmas', Inter, Helvetica;
    width: 100%;
    padding: 85px 15px;
    background-color: #704264;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 50px;
  }
  header {
    margin-bottom: 25px;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-self: center;
  }
</style>
