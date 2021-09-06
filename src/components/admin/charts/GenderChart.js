import React, { PureComponent } from 'react';
import style from './CustomerCharts.module.css';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Male', value: 2400 },
  { name: 'Female', value: 4567 },

];

export default class GenderChart extends PureComponent {

  render() {
    return (
      <ResponsiveContainer aspect={6/ 2} className={style['responsive-chart-customer']}>
        <PieChart width={500} height={900}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}