<script lang="ts">
  import { debugStore } from "$stores";
  import { onDestroy, onMount } from "svelte";
  import { destroyChart, renderChart } from "$utils";
  import type { AppraisalScore } from "$types";

  let appraisals: AppraisalScore[] = [];
  let selectedAppraisal: AppraisalScore | null = null;
  let activeTab: "table" | "chart" = "table";
  let isChartInitialized = false;

  debugStore.subscribe(({ appraisals: storeAppraisals, selectedAppraisal: storeSelectedAppraisal }) => {
    appraisals = storeAppraisals;
    selectedAppraisal = storeSelectedAppraisal;
  });

  async function switchTab(tab: "table" | "chart") {
    console.log('switching tab')
    activeTab = tab;

    if (tab === "chart" && !isChartInitialized) {
      console.log(isChartInitialized);
      const canvas = document.getElementById("appraisalChart") as HTMLCanvasElement;
      if (canvas) {
        console.log('rendering chart')
        renderChart("appraisalChart");
      }
      isChartInitialized = true;
    }
  }

  onDestroy(() => {
    isChartInitialized = false;
    destroyChart();
  })
</script>

<div class="debug-screen">
  <!-- Tab Navigation -->
  <div class="tabs">
    <button
      class:active={activeTab === "table"}
      on:click={() => switchTab("table")}
    >
      Appraisal Table
    </button>
    <button
      class:active={activeTab === "chart"}
      on:click={() => switchTab("chart")}
    >
      Chart
    </button>
  </div>

  <!-- Appraisal Table -->
  {#if activeTab === "table"}
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Appraisal Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {#each appraisals as appraisal}
            <tr on:click={() => debugStore.selectAppraisal(appraisal)}>
              <td>{appraisal.name}</td>
              <td>{appraisal.score.toFixed(5)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <!-- Chart -->
  <div class="chart-container" class:hidden={activeTab !== "chart"}>
    {#if selectedAppraisal}
      <button on:click={debugStore.resetSelection}>Back to Appraisal Scores</button>
    {/if}
    <h3>Visualization</h3>
    <canvas id="appraisalChart"></canvas>
  </div>
</div>

<style>
  .debug-screen {
    max-height: 650px;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
  }

  .tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tabs button {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .tabs button.active {
    background-color: #0056b3;
  }

  .tabs button:hover {
    background-color: #0056b3;
  }

  .table-container {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 400px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ddd4;
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }

  tbody tr:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }

  .chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }

  canvas {
    max-width: 800px;
    width: 100%;
  }
  .hidden {
    display: none;
  }
</style>