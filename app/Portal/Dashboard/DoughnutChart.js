"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";

export default function DoughnutChart({ maleProfiles, femaleProfiles }) {
  const canvas = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = canvas.current;

    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
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
            position: "top",
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 60,
            left: 0,
            right: 0,
          },
        },
      },
    });

    // Add hoverRadius to create a smooth transition effect
    newChart.data.datasets[0].hoverRadius = 10;
    newChart.update();
    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [maleProfiles, femaleProfiles]);

  useEffect(() => {
    function handleResize() {
      if (chart) {
        chart.resize();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chart]);

  return <canvas ref={canvas} id="myDoughnutChart"></canvas>;
}
