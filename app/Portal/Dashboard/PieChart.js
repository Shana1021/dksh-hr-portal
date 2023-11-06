"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";

export default function PieChart({ Deplabels, Depdata }) {
  const canvas = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = canvas.current;
    if (chart) {
      chart.destroy();
    }

    const newChart = new Chart(ctx, {
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
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 55,
            left: 0,
            right: 0,
          },
        },
      },
    });

    setChart(newChart);

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [Deplabels, Depdata]);

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

  return <canvas ref={canvas} id="myChart"></canvas>;
}
