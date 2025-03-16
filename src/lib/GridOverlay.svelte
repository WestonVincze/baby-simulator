<script lang="ts">
  import { onMount } from 'svelte';
  import { gridStore } from '$stores';
  import type { Grid } from '$types';

  let grid: Grid = [];

  // Subscribe to the grid store
  const unsubscribe = gridStore.subscribe(value => {
    grid = value;
  });

  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<style>
  .grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    pointer-events: none; /* Allow clicks to pass through */
  }
  .cell {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .has-items {
    background-color: rgba(255, 0, 0, 0.3);
  }
</style>

<div class="grid">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell.items.length > 0 ? 'has-items' : ''}" style="grid-row: {rowIndex + 1}; grid-column: {colIndex + 1};" />
    {/each}
  {/each}
</div>
