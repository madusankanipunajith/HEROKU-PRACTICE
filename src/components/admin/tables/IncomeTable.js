import React from 'react'
import style from './MaterialTable.module.css'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

function IncomeTable(props) {
    //const [learData, setLearnData] = useStat({totalIncome: 0, totalCost: 0, totalProfit: 0})
    const data = props.data;

    const Income = data.map((obj)=>{return obj.income}).reduce((total,sum)=>{return total + sum})
    const Cost = data.map((obj)=>{return obj.cost}).reduce((total,sum)=>{return total + sum})
    const Profit = Income - Cost
    const Status = (Profit > 0)? 'Profitable': 'Non Profitable'
    return (
        <div className={style['table-container']}>
             <h1 className={style['heading']}>Annual Cash Flow's Summary in 2021</h1>
             <table className={style['table']}>
               
                <thead>
                    <tr>
                        <th>Rows</th>
                        <th>Month</th>
                        <th>Income (Rs)</th>
                        <th>Cost (Rs)</th>
                        <th>Profit (Rs)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((obj, index)=>{
                        return <tr key={index}>                  
                        <td data-label="rank">{index + 1}</td>
                        <td  data-label="month">{obj.name}</td>
                        <td  data-label="income">{formatter.format(obj.income).replace('$', '')}</td>
                        <td  data-label="cost">{formatter.format(obj.cost).replace('$', '')}</td>
                        <td  data-label="profit">{`${formatter.format(obj.profit).replace('$', '')} ${obj.profit > 0 ? '⬆':'⬇'}`}</td>
                    </tr>
                    })}
                </tbody>
                {/**<tbody>
                <tr>                  
                    <td data-label="rank">1</td>
                    <td  data-label="image">Year</td>
                    <td  data-label="material_name">2021</td>
                </tr>
                <tr>                  
                    <td data-label="rank">2</td>
                    <td  data-label="image">Total Cost</td>
                    <td  data-label="material_name">Rs 100,000</td>
                </tr>
                <tr>                  
                    <td data-label="rank">3</td>
                    <td  data-label="image">Total Income</td>
                    <td  data-label="material_name">Rs 150,000</td>
                </tr>       
                <tr>                  
                    <td data-label="rank">4</td>
                    <td  data-label="image">Total Profit</td>
                    <td  data-label="material_name">Rs 50,000</td>
                </tr>
                <tr>                  
                    <td data-label="rank">5</td>
                    <td  data-label="image">Annual Status of the Company</td>
                    <td  data-label="material_name">Profitable</td>
                </tr>
                <tr>                  
                    <td data-label="rank">6</td>
                    <td  data-label="image">Best Month</td>
                    <td  data-label="material_name">May</td>
                </tr>    
                    
                </tbody> */}
            </table>
           
            <table className={style['table']} style={{marginTop:'20px'}}>
                <thead>
                    <tr>
                        <th>Rows</th>
                        <th>Description</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                <tr>                  
                    <td data-label="rank">1</td>
                    <td  data-label="image">Year</td>
                    <td  data-label="material_name">2021</td>
                </tr>
                <tr>                  
                    <td data-label="rank">2</td>
                    <td  data-label="image">Total Cost</td>
                    <td  data-label="material_name">Rs {formatter.format(Cost).replace('$', '')}</td>
                </tr>
                <tr>                  
                    <td data-label="rank">3</td>
                    <td  data-label="image">Total Income</td>
                    <td  data-label="material_name">Rs {formatter.format(Income).replace('$', '')}</td>
                </tr>       
                <tr>                  
                    <td data-label="rank">4</td>
                    <td  data-label="image">Total Profit</td>
                    <td  data-label="material_name">Rs {formatter.format(Profit).replace('$', '')}</td>
                </tr>
                <tr>                  
                    <td data-label="rank">5</td>
                    <td  data-label="image">Annual Status of the Company</td>
                    <td  data-label="material_name">{Status}</td>
                </tr>
                   
                    
                </tbody> 
            </table>
        </div>
    )
}

export default IncomeTable
