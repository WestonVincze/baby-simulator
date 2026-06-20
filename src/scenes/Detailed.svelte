<script lang="ts">
  import BabyStats from "$lib/BabyStats.svelte";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
</script>

<div class="detailed-layout">
  <aside>
    <BabyStats />
  </aside>
  <section>
    <PlayMat />
    <ToyBox />
  </section>
</div>

<style>
  .detailed-layout {
    display: flex;
    gap: 15px;
    flex: 1;
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex: 1;
    min-width: 0;
  }
  aside {
    width: 225px;
    min-width: 225px;
    background-color: #49243E;
    padding: 15px;
    border-radius: 15px;
  }
  @media (max-width: 768px) {
    .detailed-layout {
      flex-direction: column;
    }
    aside {
      width: 100%;
      min-width: unset;
    }
  }
</style>