<script lang="ts">
  import BabyStats from "$lib/BabyStats.svelte";
  import Simulation from "./Simulation.svelte";
</script>

<div class="detailed-layout">
  <section>
    <Simulation />
  </section>
  <aside>
    <BabyStats />
  </aside>
</div>

<style>
  .detailed-layout {
    display: flex;
    gap: 15px;
    flex: 1;
  }
  section {
    height: 100svh;
    width: calc(100svw - 240px);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
    min-width: 0;
  }
  aside {
    background-color: #49243E;
    width: 225px;
    padding: 15px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }
  @media (max-width: 1000px) {
    .detailed-layout {
      flex-direction: column;
      gap: 0;
    }
    aside {
      width: 100%;
      border-radius: 0;
    }
    section {
      width: 100%;
    }
  }
</style>