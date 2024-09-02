<script lang="ts">
  import Bar from "./Bar.svelte";
  import { babyStore } from "../stores/BabyStore";
</script>

<div class="stats">
  <span>Boredom:</span>
  <Bar min={$babyStore.boredom} max={100} />
</div>
<br>

{#each Object.keys($babyStore.boredomMap) as interest}
  <div class="stats">
    <span>{interest}:</span>
    <Bar min={$babyStore.boredomMap[interest]} max={100} />
  </div>
{/each}

<style>
  .stats {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 15px;
  }
  .stats > * {
    width: 120px;
  }
  .stats > span {
    text-align: right;
  }
</style>