import React from "react";
import style from './CustomerCharts.module.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Western",
    pv: 2400
  },
  {
    name: "Central",
    pv: 3000
  },
  {
    name: "Sothern",
    pv: 2000
  },
  {
    name: "Uva",
    pv: 2780
  },
  {
    name: "Sabaragamuwa",
    pv: 1890
  },
  {
    name: "Northen",
    pv: 2390
  },
  {
    name: "North Central",
    pv: 3490
  },
  {
    name: "North Western",
    pv: 390
  },
  {
    name: "Eastern",
    pv: 340
  }
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
       
        <p className="desc">Anything you want can be displayed here....</p>
      </div>
    );
  }

  return null;
};

export default function App() {
  return (
    <ResponsiveContainer width="100%" aspect={4 / 2} className={style['responsive-chart-customer']}>
      <BarChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="pv" barSize={40} fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>
  );
}


