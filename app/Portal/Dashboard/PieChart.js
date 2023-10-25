"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

export default function PieChart({ Deplabels, Depdata }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx, "myChart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: Deplabels,
        datasets: [
          {
            label: "Total:",
            data: Depdata,
            backgroundColor: [
              "#00FFF0",
              "#0047FF",
              "#FF7700",
              "#8001FF",
              "#FF2E7E",
              "#FFAB05",
              "#003f5c",
              "#58508d",
              "#bc5090",
            ],
            borderColor: ["lightgrey"],
            borderWidth: 1,
            hoverOffset: 25,
          },
        ],
      },
      options: {
        responsive: true,

        plugins: {
          legend: {
            position: "none",
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 80,
            left: 80,
            right: 0,
          },
        },
      },
    });

    chart.data.datasets[0].hoverRadius = 10;
    chart.update();

    return () => {
      chart.destroy();
    };
  }, [Deplabels, Depdata]);

  return <canvas ref={canvas} id="myChart"></canvas>;
}
