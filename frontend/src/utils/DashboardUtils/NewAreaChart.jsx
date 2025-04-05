import React, { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

export default class NewAreaChart extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/p/sandbox/stacked-area-chart-forked-5yjhcs';

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {/* ResponsiveContainer to make chart responsive */}
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            {/* CartesianGrid for grid lines */}
            <CartesianGrid strokeDasharray="3 3" />
            
            {/* XAxis for the horizontal axis */}
            <XAxis dataKey="name" />
            
            {/* YAxis for the vertical axis */}
            <YAxis />
            
            {/* Tooltip to display data when hovering */}
            <Tooltip />
            
            {/* Area for 'uv' with stacked area and customized stroke and fill */}
            <Area
              type="monotone"
              dataKey="uv"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            
            {/* Area for 'pv' with stacked area and customized stroke and fill */}
            <Area
              type="monotone"
              dataKey="pv"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            
            {/* Area for 'amt' with stacked area and customized stroke and fill */}
            <Area
              type="monotone"
              dataKey="amt"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

