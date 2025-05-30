<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { onDestroy, onMount } from "svelte";
  import Chart from "chart.js/auto";
  import type { AppraisalScore } from "$types";
  import { debugStore } from "$stores";
  import { renderChart } from "$utils";

  $: appraisals = $debugStore.appraisals;
  $: selectedAppraisal = $debugStore.selectedAppraisal;

  // Define types for appraisals and considerations
  interface Appraisal {
    id: string;
    score: number;
  }

  interface Consideration {
    id: string;
    score: number;
  }

  interface DebugData {
    appraisals: Appraisal[];
    considerations: Consideration[];
  }

  // Mock data for appraisals and considerations
  const debugData: Writable<DebugData> = writable({
    appraisals: [
      { id: "Idle", score: 0.8 },
      { id: "Move", score: 0.6 },
      { id: "Play", score: 0.9 },
      { id: "Pickup Toy", score: 0.7 },
      { id: "Drop Toy", score: 0.5 },
    ],
    considerations: [
      { id: "Idle-Consideration-1", score: 0.8 },
      { id: "Move-Consideration-1", score: 0.6 },
      { id: "Play-Consideration-1", score: 0.9 },
      { id: "Pickup Toy-Consideration-1", score: 0.7 },
      { id: "Drop Toy-Consideration-1", score: 0.5 },
    ],
  });

  let data: DebugData;

  // Subscribe to the debug data store
  debugData.subscribe((value) => {
    data = value;
  });

  let chart: Chart | undefined;

  // Render the chart when the component is mounted
  onMount(() => {
    renderChart("appraisalChart");
  });
</script>

<div class="debug-screen">
  <h2>Debug Screen</h2>

  <!-- Appraisal Scores Table -->
  <h3>Appraisal Scores</h3>
  <table>
    <thead>
      <tr>
        <th>Appraisal Name</th>
        <th>Score</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each appraisals as appraisal}
        <tr>
          <td>{appraisal.name}</td>
          <td>{appraisal.score}</td>
          <td>
            <button on:click={() => debugStore.selectAppraisal(appraisal)}>View Considerations</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <!-- Reset Button -->
  {#if selectedAppraisal}
    <button on:click={debugStore.resetSelection}>Back to Appraisal Scores</button>
  {/if}

  <!-- Chart -->
  <h3>Visualization</h3>
  <canvas id="appraisalChart"></canvas>
</div>

<style>
  .debug-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }

  canvas {
    max-width: 800px;
    width: 100%;
  }

  button {
    margin: 5px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>

