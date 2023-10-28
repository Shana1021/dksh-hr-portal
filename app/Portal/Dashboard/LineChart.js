"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

const LineChart = ({ month, probationary }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    ctx.canvas.width = 300;
    ctx.canvas.height = 100;
    let chartStatus = Chart.getChart(ctx, "myChart");
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: month,
        datasets: [
          {
            label: "Total:",
            data: probationary,
            backgroundColor: "rgba(240, 167, 5, 0.2)",
            borderColor: "blue",
            borderWidth: 1,
            hoverOffset: 25,
            fill: false,
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
            top: 30,
            bottom: 20,
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
  }, [month, probationary]);

  return <canvas ref={chartRef} id="lineChart"></canvas>;
};

export default LineChart;
