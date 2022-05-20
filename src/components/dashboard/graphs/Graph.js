import React from "react";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Graph1({
  title,
  scores,
  labels,
  backgroundColor,
  borderColor,
  tension,
}) {
  const options = {
    spanGaps: true,
    animation: false,
    responsive: true,
    datasets: {
      line: {
        pointRadius: 0, // disable for all `'line'` datasets
      },
    },
    elements: {
      point: {
        radius: 0, // default to disabled in all datasets
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: false,
      },
    },
  };

  const data = () => {
    return {
      datasets: [
        {
          pointRadius: 0,
          data: scores,
          borderColor: borderColor,
          spanGaps: true,
        },
      ],
      labels: labels,
    };
  };

  return <Line data={data} options={options} />;
}
