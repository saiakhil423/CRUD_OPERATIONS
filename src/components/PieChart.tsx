import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DepartmentData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: DepartmentData[] | any;
}

const defaultColors = [
  '#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899',
  '#14B8A6', '#F97316', '#8B5CF6', '#EF4444', '#0EA5E9'
];

const generateColors = (count: number) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(defaultColors[i % defaultColors.length]);
  }
  return colors;
};

export const PieChart = ({ data }: PieChartProps) => {
  if (!Array.isArray(data)) {
    return <p>Error: Invalid data format for Pie Chart</p>;
  }

  if (data.length === 0) {
    return <p>No data available for Pie Chart</p>;
  }

  const chartData = {
    labels: data.map((item: DepartmentData) => item.name),
    datasets: [
      {
        data: data.map((item: DepartmentData) => item.value),
        backgroundColor: generateColors(data.length),
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};
