<script lang="ts">
  import { startGame } from "$stores";
</script>

<div class="main-menu">
  <header>
    <h1>Baby Simulator</h1>
  </header>
  <button on:click={startGame}>Start</button>
</div>

<style>
  .main-menu {
    font-family: 'Mountains of Christmas', Inter, Helvetica;
    width: 100%;
    background-color: #704264;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  header {
    margin-bottom: 25px;
  }
</style>
