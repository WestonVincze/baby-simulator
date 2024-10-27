<script lang="ts">
  import { startGame } from "../stores/GameState";
</script>

<div class="main-menu">
  <button on:click={startGame}>Start Simulation</button>
</div>

<style>
  .main-menu {
    width: 100%;
    background-color: #704264;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
