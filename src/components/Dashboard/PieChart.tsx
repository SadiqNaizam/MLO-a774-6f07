import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
  percentage?: number; // Optional, as it might be derived or displayed separately
}

interface PieChartProps {
  data: PieChartDataItem[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            borderColor: 'hsl(var(--border))', 
            borderRadius: 'var(--radius)' 
          }}
          formatter={(value: number, name: string, entry: any) => {
            const percentage = entry.payload.payload.percentage;
            return [`${value} (${percentage}%)`, name];
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="100%"
          fill="#8884d8"
          paddingAngle={1}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
