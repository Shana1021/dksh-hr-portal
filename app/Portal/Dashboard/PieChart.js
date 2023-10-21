"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

export default function PieChart({ labels, data }) {
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
        labels: labels,
        datasets: [
          {
            label: "Total:",
            data: data,
            backgroundColor: [
              "rgb(240,167,5,1)",
              "rgb(0,0,135,1)",
              "rgb(190,0,40,1)",
              "rgb(2,46,31,1)",
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

    chart.data.datasets[0].hoverRadius = 10;
    chart.update();

    return () => {
      chart.destroy();
    };
  }, [labels, data]);

  return <canvas ref={canvas} id="myChart" /*width="736" height="736"*/></canvas>;
}
