import React, { PureComponent } from 'react';
import { BarChart as RechartBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dashboard from '../../services/Dashboard';
import { useQuery } from 'react-query';




 const RebateBarChart = () =>  {
  
  const user_id = JSON.parse(localStorage.getItem('referrer-data'))?.doctor_id;
  const { isLoading:loadingEarnings, data:earnings  } = useQuery('earnings', ()=> Dashboard.GetRebateEarnings(user_id))


    const data = [
      {
        name: 'Mon',
        day: earnings?.data?.rebate_earnings?.Mon ?? 8,
      },
      {
        name: 'Tue',
        day: earnings?.data?.rebate_earnings?.Tue,
      },
      {
        name: 'Wed',
        day: earnings?.data?.rebate_earnings?.Wed,
      },
      {
        name: 'Thu',
        day: earnings?.data?.rebate_earnings?.Thu,
      },
      {
        name: 'Fri',
        day: earnings?.data?.rebate_earnings?.Fri,
      },
      {
        name: 'Sat',
        day: earnings?.data?.rebate_earnings?.Sat,
      },
      {
        name: 'sun',
        day: earnings?.data?.rebate_earnings?.Sun,
      },
    ];

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
          <CartesianGrid vertical={false} strokeDasharray="1" />
          <XAxis fontWeight={700} fontSize={12} dataKey="name" />
          <YAxis unit={'k'} fontWeight={700} fontSize={12} />
          <Tooltip />
          {/* <Legend /> */}
          <Bar 
            dataKey="day"  
            barSize={22}
            fill="#043664" 
            activeBar={<Rectangle  stroke="blue" />} 
            radius={[10,10,0,0]}
            />
        </RechartBarChart>
      </ResponsiveContainer>
    );

}

export default RebateBarChart