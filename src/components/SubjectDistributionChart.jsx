import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { getColorForSubject } from '../utils/constants';

Chart.register(...registerables);

const SubjectDistributionChart = ({ events, theme }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!events || events.length === 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
      return;
    }

    const subjectCounts = events.reduce((acc, event) => {
      acc[event.subject] = (acc[event.subject] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(subjectCounts);
    const data = Object.values(subjectCounts);
    const backgroundColors = labels.map((label) =>
      getColorForSubject(label, theme === 'dark').bg.replace(/\/40$/, '')
    );

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Classes',
            data: data,
            backgroundColor: backgroundColors,
            borderColor: theme === 'dark' ? '#1e293b' : '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: theme === 'dark' ? '#cbd5e1' : '#475569',
              boxWidth: 20,
              padding: 15,
            },
          },
        },
        cutout: '60%',
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [events, theme]);

  return (
    <div className="h-80 md:h-96">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default SubjectDistributionChart;

 
