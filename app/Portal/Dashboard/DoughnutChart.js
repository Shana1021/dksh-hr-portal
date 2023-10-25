"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

export default function DoughnutChart({ maleProfiles, femaleProfiles }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx, "myDoughnutChart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Total:",
            data: [maleProfiles.length, femaleProfiles.length],
            backgroundColor: ["#16C098", "#5932EA"],
            borderColor: ["rgb(255,255,255)", "rgb(255,255,255)"],
            borderWidth: 1,
            hoverOffset: 25, // Set the hover offset
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

    // Add hoverRadius to create a smooth transition effect
    chart.data.datasets[0].hoverRadius = 10;

    chart.update();
  }, [maleProfiles, femaleProfiles]);

  return <canvas ref={canvas} id="myDoughnutChart"></canvas>;
}
