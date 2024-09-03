<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";
  import { babyStore } from "../stores/BabyStore";
  import type { ToyProperty } from "../types";

  $: aversions = Object.keys($babyStore.aversions).map(
    aversion => ({ aversion, value: $babyStore.aversions[aversion as ToyProperty]})
  );
</script>

<div class="stats">
  <span>Boredom:</span>
  <ProgressBar min={$babyStore.boredom} max={100} />
</div>
<br>

<h2>Aversions</h2>
{#if Object.keys($babyStore.aversions).length === 0}
  <span class="italic">no aversions</span>
{/if}

{#each aversions as { aversion, value }}
  <div class="stats">
    <span>{aversion}:</span>
    <ProgressBar min={value || 0} max={100} />
  </div>
{/each}

<style>
  h2 {
    text-align: right;
  }
  .italic {
    display: block;
    text-align: right;
    font-style: italic;
  }
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