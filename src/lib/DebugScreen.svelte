<script lang="ts">
  import { debugStore } from '$stores';
  import type { DebugData, ToyAttribute } from '$types';
  import { onDestroy } from 'svelte';

  let debugInfo: DebugData;

  const unsubscribe = debugStore.subscribe((data: DebugData) => {
    debugInfo = data;
  });

  $: preferences = Object.keys(debugInfo.babyData.preferences).map(k => ({ name: k, value: debugInfo.babyData.preferences[k as ToyAttribute]?.value}));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="debug-screen">
  <h2>Debug Info</h2>
  <h3>Preferences</h3>
  <ul>

  {#each preferences as preference}
    <li>{preference.name}: {preference.value}</li>
  {/each}
  </ul>
  {#if debugInfo.considerations.length > 0}
    <ul>
      {#each debugInfo.considerations as { name, scores }}
        <li>
          <h3>{name}</h3>
          <p>Aversion: {scores.aversion.toFixed(2)}</p>
          <p>Preference: {scores.preference.toFixed(2)}</p>
          <p>Distance: {scores.distance.toFixed(2)}</p>
          <p>Recent Interactions: {scores.recentInteractions.toFixed(2)}</p>
          <p>Bonus: {scores.bonusWeight.toFixed(2)}</p>
          <p class="total">Total: {scores.total.toFixed(2)}</p>
        </li>
      {/each}
    </ul>
    {:else}
    <p>no active toys</p>
  {/if}
</div>

<style>
  .debug-screen {
    position: fixed;
    top: 0;
    right: 0;
    min-width: 150px;
    max-height: 100svh;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    overflow-y: auto;
    font-size: 14px;
    text-align: right;
  }
  li {
    list-style: none;
  }
  h3 {
    font-weight: 600;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
  .total {
    font-weight: bold;
  }
</style>
