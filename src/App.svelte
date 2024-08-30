<script lang="ts">
  import PlayMat from "./lib/PlayMat.svelte";
  import ToyBox from "./lib/ToyBox.svelte";
  import BabyStats from "./lib/BabyStats.svelte";
</script>

<main>
  <aside>
    <BabyStats />
  </aside>
  <section>
    <header>
      <h1>Baby Simulator</h1>
    </header>
    <PlayMat />
    <ToyBox />
  </section>
</main>

<style>
  main {
    display: flex;
  }
  aside {
    padding: 15px;
    padding-top: 75px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
