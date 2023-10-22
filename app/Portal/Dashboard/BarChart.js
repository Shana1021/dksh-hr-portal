"use client";

import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

export default function BarChart({ Statedata, Statelabels }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx, "myBarChart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Statelabels,
        datasets: [
          {
            label: "Current Employees",
            data: Statedata,
            backgroundColor: "rgb(190,0,40,1)", // Red for current employees
            borderWidth: 1,
            borderColor: "rgb(255,255,255,1)", // Border color
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "x", // horizontal bar chart
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false, // Remove x-axis gridlines
            },
          },
          y: {
            stacked: true, // Stack on the y-axis
            grid: {
              borderDash: [5, 5], // Set borderDash to make grid lines dotted
              borderDashOffset: 0, // Offset of the border dashes
            },
          },
        },
        categoryPercentage: 0.8, // Adjust the spacing between bars
        barPercentage: 1.2, // Adjust the width of the bars
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (context) => context.parsed.y, // Display only the data value
            },
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Solid black background
          },
        },
        layout: {
          padding: {
            top: 0,
            bottom: 20,
            left: 10,
            right: 0,
          },
        },
      },
    });
  }, [Statedata, Statelabels]);
  return (
    <canvas ref={canvas} id="myBarChart" /*width="800" height="400"*/></canvas>
  );
}
