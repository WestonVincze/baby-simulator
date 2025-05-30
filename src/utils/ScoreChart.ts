import Chart from "chart.js/auto";
import { debugStore } from "$stores";

let chart: Chart | null = null;

// Function to render the chart
export function renderChart(canvasId: string) {
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
  debugStore.subscribe(({ appraisals, selectedAppraisal }) => {
    if (chart) {
      chart.destroy(); // Destroy the previous chart to avoid memory leaks
    }

    if (selectedAppraisal) {
      // Render consideration scores for the selected appraisal
      const considerations = selectedAppraisal.considerations;
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: considerations.map(c => c.name),
          datasets: [
            {
              label: `${selectedAppraisal.name} Consideration Scores`,
              data: considerations.map(c => c.score),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
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
    } else {
      // Render appraisal scores
      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: appraisals.map((a) => a.name),
          datasets: [
            {
              label: "Appraisal Scores",
              data: appraisals.map((a) => a.score),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
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
  });
}
