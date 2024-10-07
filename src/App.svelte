<script lang="ts">
  import MainMenu from "./scenes/MainMenu.svelte";
  import Game from "./scenes/Game.svelte";
</script>

<main>
  <header>
    <h1>Baby Simulator</h1>
  </header>
  <section>
    <Game />
    <MainMenu />
  </section>
</main>

<style>
  header {
    margin-bottom: 25px;
  }
</style>
