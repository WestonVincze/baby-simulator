<script lang="ts">
  import { mainMenu, startGame } from "../stores/GameState";
</script>

<h2>For crying out loud...</h2>

<button on:click={startGame}>Try Again?</button>
<button on:click={mainMenu}>Main Menu</button>
