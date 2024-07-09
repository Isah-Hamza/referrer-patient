import React, { PureComponent } from 'react';
import { BarChart as RechartBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Tue',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Wed',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thu',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Fri',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Sat',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'sun',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default class BarChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <RechartBarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontWeight={700} fontSize={12} dataKey="name" />
          <YAxis fontWeight={700} fontSize={12} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar 
            dataKey="pv"  
            width={2} 
            fill="#8884d8" 
            activeBar={<Rectangle fill="pink" stroke="blue" />} 
            radius={[10,10,0,0]}
            />
        </RechartBarChart>
      </ResponsiveContainer>
    );
  }
}
