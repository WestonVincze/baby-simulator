<script lang="ts">
  import { mainMenu, startGame } from "$stores";
</script>

<div class="game-over">
  <h1>For crying out loud...</h1>

  <div class="button-group">
    <button on:click={() => startGame(true)}>Try Again?</button>
    <button on:click={mainMenu}>Main Menu</button>
  </div>
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
    gap: 35px;
  }
</style>
