<script lang="ts">
  import { babyStore, mainMenu } from "$stores";
  import type { AttributeCategory, ToyAttribute } from "$types";
  import ProgressBar from "./ProgressBar.svelte";
  import InfoTooltip from "./InfoTooltip.svelte";

  $: currentToyAttributes = $babyStore.currentToy ? babyStore.getCurrentToyAttributes() : [];
  $: aversions = Object.entries($babyStore.aversions).map(
    ([aversion, { value, category }]) => ({ aversion, value, category }) // $babyStore.aversions[aversion as ToyAttribute]})
  );

  $: groupedAversions = aversions.reduce((acc, { aversion, value, category }) => {
    if (!acc[category]) {
      acc[category] = [];
    }

    if (value > 0) {
      acc[category].push({ aversion, value });
    }
    return acc;
  }, {} as Record<AttributeCategory, { aversion: string, value: number }[]>);
</script>

<div class="container">
  <div class="babyStats">
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

    {#each Object.entries(groupedAversions) as [category, aversions]}
      {#if aversions.length > 0}
        <h3>{category}s</h3>
      {/if}
      {#each aversions as { aversion, value }}
        {#if value && value > 0}
          <div class="aversions">
            <span>{aversion}:</span>
            <div class="bar">
              <ProgressBar min={value || 0} max={1} color={currentToyAttributes.includes(aversion) ? "tomato" : "slateblue"} />
            </div>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
  <div class="button-group">
    <button on:click={() => mainMenu()}>Quit</button>
    <button on:click={() => babyStore.resetBabyStore()}>Reset</button>
  </div>
</div>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .babyStats {
    text-align: right;
  }
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
  .button-group {
    flex-direction: row;
  }
</style>
