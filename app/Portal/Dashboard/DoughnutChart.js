"use client";
import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';

export default function DoughnutChart() {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    let chartStatus = Chart.getChart(ctx, 'myDoughnutChart');
    if (chartStatus !== undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            label: 'Total:',
            data: [12, 19],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
            hoverOffset: 25, // Set the hover offset
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    });

    // Add hoverRadius to create a smooth transition effect
    chart.data.datasets[0].hoverRadius = 10;

    chart.update();
  }, []);

  return <canvas ref={canvas} id="myDoughnutChart" width={100} height={100}></canvas>;
}
