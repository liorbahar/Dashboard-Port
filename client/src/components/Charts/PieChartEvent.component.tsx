import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const PieChartExample = () => {
  const data = [
    { name: 'Category 1', value: 25 },
    { name: 'Category 2', value: 40 },
    { name: 'Category 3', value: 30 },
  ];

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartExample;