<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";
  import { babyStore } from "../stores/BabyStore";
  import type { ToyAttribute } from "../types";
  import InfoTooltip from "./InfoTooltip.svelte";

  $: aversions = Object.keys($babyStore.aversions).map(
    aversion => ({ aversion, value: $babyStore.aversions[aversion as ToyAttribute]})
  );
</script>


<h2>Boredom <InfoTooltip text="Playing with toys reduces boredom but the meter fills to 100% the simulation ends." /></h2>
<div class="boredom">
  <div class="bar">
    <ProgressBar min={$babyStore.boredom} max={1} />
  </div>
</div>

<h2>Aversions <InfoTooltip text="When a toy is played with by baby its properties become less appealing to baby and satisfy less boredom." /></h2>
{#if Object.keys($babyStore.aversions).length === 0}
  <span class="italic">no aversions</span>
{/if}

{#each aversions as { aversion, value }}
  <div class="aversions">
    <span>{aversion}:</span>
    <div class="bar">
      <ProgressBar min={value || 0} max={1} />
    </div>
  </div>
{/each}

<button on:click={() => babyStore.resetBabyStore()}>Reset</button>

<style>
  h2 {
    display: flex;
    justify-content: right;
    gap: 5px;
  }
  .italic {
    display: block;
    text-align: right;
    font-style: italic;
  }
  .boredom {
    display: flex;
    justify-content: right;
    margin-bottom: 15px;
  }
  .boredom .bar {
    width: 150px;
    height: 15px;
  }
  .aversions {
    display: flex;
    place-content: center;
    place-items: center;
    gap: 15px;
  }
  .aversions > * {
    width: 120px;
  }
  .aversions > span {
    text-align: right;
  }
  .aversions .bar {
    width: 60px;
  }
  button {
    margin-top: 15px;
  }
</style>