import { type Handlers } from "$fresh/server.ts";
import { renderChart } from "$fresh_charts/mod.ts";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export const handler: Handlers = {
  GET() {
    return renderChart({
      type: "bar",

      data: {
        labels: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D"],
        datasets: [
          {
            label: "Ritwik Banerjee",
            data: [25, 50, 100],
            borderColor: ChartColors.Red,
            backgroundColor: transparentize(ChartColors.Red, 0.5),
            borderWidth: 1,
          },
          {
            label: "Ahmad Esmali",
            data: [30, 80, 90],
            borderColor: ChartColors.Blue,
            backgroundColor: transparentize(ChartColors.Blue, 0.5),
            borderWidth: 1,
          },
        ],
      },
      options: {
        devicePixelRatio: 1,
        scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
        tooltips: {
          enabled: true,
          mode: "nearest",
        },
      },
    });
  },
};
