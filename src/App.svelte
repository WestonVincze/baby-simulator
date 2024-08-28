<script lang="ts">
  import PlayMat from "./lib/PlayMat.svelte";
  import ToyBox from "./lib/ToyBox.svelte";
  import BabyStats from "./lib/BabyStats.svelte";
</script>

<main>
  <header>
    <h1>Baby Simulator</h1>
  </header>
  <aside>
    <BabyStats />
  </aside>
  <section>
    <PlayMat />
    <ToyBox />
  </section>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
