<script lang="ts">
    import BabyStats from "../lib/BabyStats.svelte";
    import PlayMat from "../lib/PlayMat.svelte";
    import ToyBox from "../lib/ToyBox.svelte";
</script>

<div class="game">
  <aside>
    <BabyStats />
  </aside>

  <section>
    <PlayMat />
    <ToyBox />
  </section>
</div>


<style>
  .game { 
    display: flex;
    gap: 15px;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  aside {
    background-color: #49243E;
    padding: 15px;
    border-radius: 15px;
  }
</style>