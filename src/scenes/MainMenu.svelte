<script lang="ts">
  import { startGame } from "$stores";
  import HowToPlay from "./HowToPlay.svelte";

  let showHowToPlay = false;
</script>

<div class="main-menu">
  <header>
    <h1>
      <span class="xl">Baby</span>
      <span class="md">Simulator</span>
    </h1>
    <div class="img-container">
      <img
        draggable="false"
        src="sitting-baby.png"
        alt="Sitting baby"
      />
    </div>
  </header>

  <div class="button-group">
    <button on:click={startGame}>Start</button>
    <button on:click={() => showHowToPlay = true}>How To Play</button>
  </div>

  {#if showHowToPlay}
    <HowToPlay onClose={() => showHowToPlay = false} />
  {/if}
</div>

<style>
  .main-menu {
    font-family: 'Mountains of Christmas', Inter, Helvetica;
    position: relative;
    width: 100%;
    padding: 35px 15px;
    background-color: #704264;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .img-container {
    position: relative;
  }
  .img-container::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 25%;
    border-radius: 50%;
    background-color: rgba(50, 50, 50, 0.3);
    filter: blur(7px);
  }
  img {
    height: 200px;
    width: 200px; 
    position: relative;
  }
  h1 {
    display: flex;
    flex-direction: column;
  }
  h1 .xl {
    font-size: 8rem;
  }
  h1 .md {
    font-size: 3.2rem;
  }
</style>
