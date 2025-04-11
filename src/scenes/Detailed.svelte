<script lang="ts">
  import BabyStats from "$lib/BabyStats.svelte";
  import PlayMat from "$lib/PlayMat.svelte";
  import ToyBox from "$lib/ToyBox.svelte";
</script>

<aside>
  <BabyStats />
</aside>

<section>
  <PlayMat />
  <ToyBox />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  aside {
    width: 225px;
    background-color: #49243E;
    padding: 15px;
    border-radius: 15px;
  }
</style>