<script lang="ts">
  import { mainMenu, startGame } from "$stores";
</script>

<div class="game-over">
  <h2>For crying out loud...</h2>

  <button on:click={startGame}>Try Again?</button>
  <button on:click={mainMenu}>Main Menu</button>
</div>

<style>
  .game-over {
    width: 100%;
    background-color: #49243E;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
</style>
