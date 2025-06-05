

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

type ChartDataItem = {
  month: string; // "2025-04"
  revenue: number;
};

interface RevenueChartProps {
  data: ChartDataItem[];
}

const formatMonth = (month: string): string => {
  const [year, monthNum] = month.split('-');
  const date = new Date(Number(year), Number(monthNum) - 1);
  return date.toLocaleString('default', { month: 'short' });
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  // Format data to include monthName
  const formattedData = data.map((item) => ({
    ...item,
    monthName: formatMonth(item.month),
  }));

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Revenue (Last 12 Months)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
