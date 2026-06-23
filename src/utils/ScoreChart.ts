import Chart from "chart.js/auto";
import { debugStore } from "$stores";
import type { AppraisalScore } from "$types";

let chart: Chart | null = null;
let unsubscribe: (() => void) | null = null;

// Function to initialize the chart
function initializeChart(ctx: CanvasRenderingContext2D, appraisals: AppraisalScore[], selectedAppraisal: AppraisalScore | null): void {
  const labels = selectedAppraisal
    ? selectedAppraisal.considerations.map(c => c.name)
    : appraisals.map((a) => a.name);

  const data = selectedAppraisal
    ? selectedAppraisal.considerations.map(c => c.score)
    : appraisals.map((a) => a.score);

  const label = selectedAppraisal
    ? `${selectedAppraisal.name} Consideration Scores`
    : "Appraisal Scores";

  const backgroundColor = selectedAppraisal
    ? "rgba(255, 99, 132, 0.2)"
    : "rgba(75, 192, 192, 0.2)";

  const borderColor = selectedAppraisal
    ? "rgba(255, 99, 132, 1)"
    : "rgba(75, 192, 192, 1)";

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Function to update the chart dynamically
function updateChart(appraisals: AppraisalScore[], selectedAppraisal: AppraisalScore | null): void {
  if (!chart) return;

  const labels = selectedAppraisal
    ? selectedAppraisal.considerations.map(c => c.name)
    : appraisals.map((a) => a.name);

  const data = selectedAppraisal
    ? selectedAppraisal.considerations.map(c => c.score)
    : appraisals.map((a) => a.score);

  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].label = selectedAppraisal
    ? `${selectedAppraisal.name} Consideration Scores`
    : "Appraisal Scores";

  chart.data.datasets[0].backgroundColor = selectedAppraisal
    ? "rgba(255, 99, 132, 0.2)"
    : "rgba(75, 192, 192, 0.2)";

  chart.data.datasets[0].borderColor = selectedAppraisal
    ? "rgba(255, 99, 132, 1)"
    : "rgba(75, 192, 192, 1)";

  chart.update(); // Update the chart without re-rendering
}

// Function to render the chart
export function renderChart(canvasId: string): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) {
    console.error(`Canvas element with ID '${canvasId}' not found.`);
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("Failed to get 2D context for canvas.");
    return;
  }

  // Subscribe to debugStore to update the chart dynamically
  unsubscribe = debugStore.subscribe(({ appraisals, selectedAppraisal }) => {
    console.log('updating')
    if (!chart) {
      console.log('no chart')
      // Initialize the chart if it hasn't been created yet
      initializeChart(ctx, appraisals, selectedAppraisal);
    } else {
      console.log('chart')
      // Update the chart dynamically
      updateChart(appraisals, selectedAppraisal);
    }
  });
}

export function destroyChart(): void {
  if (chart) {
    chart.destroy();
    chart = null;
  }

  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}