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

<div class="grid">
  {#each grid as row, rowIndex}
    {#each row as cell, colIndex}
      <div class="cell {cell.items.length > 0 ? 'has-items' : ''}" style="grid-row: {rowIndex + 1}; grid-column: {colIndex + 1};">
        {#if grid[rowIndex][colIndex].value > 0}
          {grid[rowIndex][colIndex].value}
        {/if}
      </div>
    {/each}
  {/each}
</div>

<style>
  .grid {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50px);
    grid-template-rows: repeat(auto-fill, 50px);
    pointer-events: none; /* Allow clicks to pass through */
  }
  .cell {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .has-items {
    background-color: rgba(255, 0, 0, 0.3);
  }
</style>