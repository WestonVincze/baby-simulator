<script lang="ts">
  import { debugStore } from '$stores';
  import type { DebugData } from '$types';
  import { onDestroy } from 'svelte';

  let debugInfo: DebugData[] = [];

  const unsubscribe = debugStore.subscribe((data: DebugData[]) => {
    debugInfo = data;
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="debug-screen">
  <h2>Debug Info</h2>
  {#if debugInfo.length > 0}
    <ul>
      {#each debugInfo as { name, scores }}
        <li>
          <h3>{name}</h3>
          <p>Appeal: {scores.appeal.toFixed(2)}</p>
          <p>Distance: {scores.distance.toFixed(2)}</p>
          <p>Last Move: {scores.lastMove.toFixed(2)}</p>
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
  }
  li {
    text-align: right;
    list-style: none;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
  h3 {
    font-weight: 600;
  }
</style>
