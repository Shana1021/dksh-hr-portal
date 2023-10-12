"use client";

import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';

export default function BarChart() {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx, 'myBarChart');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Current Employees',
            data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
            backgroundColor: 'rgb(190, 0, 40, 0.9)', // Red for current employees
            borderWidth: 1,
            borderColor: 'rgba(255, 99, 132, 1)', // Border color
            borderRadius: 5,
          },
          {
            label: 'New Employees',
            data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65],
            backgroundColor: 'rgb(173, 216, 230, 0.5)', // blue for new employees
            borderWidth: 1,
            borderColor: 'rgba(169, 169, 169, 1)', // Border color
            borderRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'x', // horizontal bar chart
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
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => context.parsed.y, // Display only the data value
            },
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Solid black background
          },
        },
      },
    });
  }, []);
  return <canvas ref={canvas} id="myBarChart" width={400} height={200}></canvas>;
}