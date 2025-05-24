// components/BarChart.tsx
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import type { Employee } from '../types/employee';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: Employee[];
}

export const BarChart = ({ data }: BarChartProps) => {
  // Group by month
  const monthlyData = data.reduce((acc: Record<string, number>, hire: Employee) => {
    if (hire.created_at) {
      const month = new Date(hire.created_at).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Hires',
        data: Object.values(monthlyData),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Hiring Trend',
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};