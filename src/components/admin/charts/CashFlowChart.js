import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import style from './CashFlowChart.module.css'



export default class CashFlowChart extends PureComponent {


  state = {
    opacity: {
      cost: 5,
      income: 5,
      profit: 5
    },
  };

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  render() {
    const { opacity } = this.state;
    const data = this.props.data;
    //console.log(data);

    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" aspect={4 / 2} className={style['responsive-chart-cashflow']}>
          <LineChart
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
            <Line type="monotone" dataKey="income" strokeOpacity={opacity.pv} stroke="green" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cost" strokeOpacity={opacity.uv} stroke="red" />
            <Line type="monotone" dataKey="profit" strokeOpacity={opacity.uv} stroke="blue" />
          </LineChart>
        </ResponsiveContainer>
        <p className="notes">Your Cashflow Reports</p>
      </div>
    );
  }
}