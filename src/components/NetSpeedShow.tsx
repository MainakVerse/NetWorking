// components/NetworkSpeedMeter.tsx
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

// Define SpeedData type
interface SpeedData {
  downloadSpeed: number;
  uploadSpeed: number;
}

// Custom plugin for gauge needle
const needlePlugin = {
  id: 'gaugeNeedle',
  afterDatasetDraw(chart: any) {
    const { ctx, data, chartArea } = chart;
    const dataset = data.datasets[0];
    const value = dataset.data[0];
    const max = dataset.max || 250;

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = chartArea.bottom;
    const radius = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) * 0.85;

    const angle = Math.PI - (value / max) * Math.PI;

    ctx.save();
    ctx.translate(centerX, centerY);

    const needleLength = radius * 0.85;
    const tipX = Math.cos(angle) * needleLength;
    const tipY = Math.sin(angle) * needleLength;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineWidth = 2;
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = '#444444';
    ctx.stroke();

    const headSize = radius * 0.04;
    const perpAngle = angle + Math.PI / 2;
    const perpX = Math.cos(perpAngle) * headSize;
    const perpY = Math.sin(perpAngle) * headSize;

    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX + perpX, tipY + perpY);
    ctx.lineTo(tipX - perpX, tipY - perpY);
    ctx.closePath();
    ctx.fillStyle = '#444444';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = '#444444';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.restore();
  }
};

const NetworkSpeedMeter: React.FC = () => {
  const [speedData, setSpeedData] = useState<SpeedData | null>(null);

  const fetchNetworkSpeed = () => {
    const downloadSpeed = Math.random() * (200 - 10) + 10;
    const uploadSpeed = Math.random() * (150 - 5) + 5;

    setSpeedData({
      downloadSpeed,
      uploadSpeed,
    });
  };

  useEffect(() => {
    fetchNetworkSpeed();
    const interval = setInterval(fetchNetworkSpeed, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!speedData) {
    return <div className="h-96 flex items-center justify-center">Loading network speed data...</div>;
  }

  const createGaugeData = (value: number, color: string): ChartData<'doughnut'> => ({
    datasets: [
      {
        data: [value, 250 - value],
        backgroundColor: [color, '#f0f0f0'],
        borderColor: ['transparent', 'transparent'],
        borderWidth: 0,
        borderRadius: 5,
        rotation: 270,
      },
    ],
    labels: ['Speed', ''],
  });

  const gaugeOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    layout: { padding: { top: 10, bottom: 10 } },
    elements: {
      arc: { borderWidth: 0 }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic'
    },
  };

  ChartJS.register(needlePlugin);

  // Mock hourly activity data
  const hourlyActivityLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const hourlyDownloadData = hourlyActivityLabels.map(() => Math.random() * (200 - 10) + 10);
  const hourlyUploadData = hourlyActivityLabels.map(() => Math.random() * (150 - 5) + 5);

  const activityData = {
    labels: hourlyActivityLabels,
    datasets: [
      {
        label: 'Download Mbps',
        data: hourlyDownloadData,
        borderColor: '#1E90FF',
        backgroundColor: 'rgba(30, 144, 255, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Upload Mbps',
        data: hourlyUploadData,
        borderColor: '#32CD32',
        backgroundColor: 'rgba(50, 205, 50, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const activityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'User Activity per Hour',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-auto flex flex-col py-2 px-3 rounded-lg shadow">
      <div className="flex flex-grow justify-between">
        {/* Download Speed */}
        <div className="w-1/2 pr-2 flex flex-col">
          <h3 className="text-center text-blue-500 text-sm font-medium">
            Download Speed
          </h3>
          <div className="flex-grow relative">
            <Doughnut
              data={createGaugeData(speedData.downloadSpeed, '#1E90FF')}
              options={gaugeOptions}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-blue-700">
              {speedData.downloadSpeed.toFixed(1)} Mbps
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-2">
            <span>0</span>
            <span>125</span>
            <span>250</span>
          </div>
        </div>

        {/* Upload Speed */}
        <div className="w-1/2 pl-2 flex flex-col">
          <h3 className="text-center text-green-500 text-sm font-medium">
            Upload Speed
          </h3>
          <div className="flex-grow relative">
            <Doughnut
              data={createGaugeData(speedData.uploadSpeed, '#32CD32')}
              options={gaugeOptions}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-green-700">
              {speedData.uploadSpeed.toFixed(1)} Mbps
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-2">
            <span>0</span>
            <span>125</span>
            <span>250</span>
          </div>
        </div>
      </div>

      {/* Retest Button */}
      <div className="flex justify-center mt-1">
        <button
          onClick={fetchNetworkSpeed}
          className="px-4 my-4 py-2 bg-blue-800 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          Retest
        </button>
      </div>

      {/* Line Chart for Activity */}
      <div className="h-72 mt-2">
        <Line data={activityData} options={activityOptions} />
      </div>
    </div>
  );
};

export default NetworkSpeedMeter;
