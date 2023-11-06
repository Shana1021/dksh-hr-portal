"use client";
import Chart from "chart.js/auto";
import { useRef, useEffect } from "react";

const LineChart = ({ month, probationary }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
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
            label: "Number of Employees:",
            data: probationary,
            backgroundColor: "blue",
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
            top: 0,
            bottom: 25,
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
