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
    console.log(femaleProfiles.length);

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Male", "Female"],
        datasets: [
          {
            label: "Total:",
            data: [maleProfiles.length, femaleProfiles.length],
            backgroundColor: ["rgb(0,0,135,1)", "rgb(190,0,40, 1)"],
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
            position: "right",
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 0,
            left: 20,
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
