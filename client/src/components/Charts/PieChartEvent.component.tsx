import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import { ChartComponentProps } from './ChartFactory.component';

const PieChartEvent: React.FC<ChartComponentProps> = ({ data }) => {
  
  return (
    <PieChart width={700} height={300}>
      <Pie data={data} dataKey="value" nameKey="key" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartEvent;