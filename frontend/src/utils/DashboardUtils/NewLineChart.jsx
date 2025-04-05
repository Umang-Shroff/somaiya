import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

// Data for the chart
const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export default class NewLineChart extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-v3w7s9';

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* ResponsiveContainer to make chart responsive */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            {/* CartesianGrid for grid lines */}
            <CartesianGrid strokeDasharray="3 3" />
            
            {/* XAxis with padding on left and right */}
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            
            {/* YAxis for vertical axis */}
            <YAxis />
            
            {/* Tooltip for hover details */}
            <Tooltip />
            
            {/* Legend to display chart labels */}
            <Legend />
            
            {/* Line for "pv" data with custom style */}
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            
            {/* Line for "uv" data with custom style */}
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            
            {/* Reference line to mark a threshold */}
            {/* <ReferenceLine y={4000} label="Threshold" stroke="red" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}