<script lang="ts">
  import { startGame } from "../stores/GameState";
</script>

<div class="main-menu">
  <button on:click={startGame}>Start Simulation</button>
</div>

<style>
  .main-menu {

  }

</style>
