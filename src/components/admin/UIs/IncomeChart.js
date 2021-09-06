import React from 'react'
import style from './css/WareHouse.module.css'
import CashFlowChart from '../charts/CashFlowChart'
import _ from 'lodash'
import Footer from '../../layout/Footer'
import { useState, useEffect, useRef } from 'react'
import { PDFExport} from '@progress/kendo-react-pdf';
import IncomeTable from '../tables/IncomeTable'

const data = [
    {
      name: 'Jan',
      cost: 4000,
      income: 6000,
      profit: 2000,
    },
    {
      name: 'Feb',
      cost: 1000,
      income: 1398,
      profit: 398,
    },
    {
      name: 'Mar',
      cost: 2000,
      income: 9800,
      profit: 7800,
    },
    {
      name: 'Apr',
      cost: 2780,
      income: 3908,
      profit: 1000,
    },
    {
      name: 'May',
      cost: 1890,
      income: 4800,
      profit: 2181,
    },
    {
      name: 'Jun',
      cost: 2390,
      income: 3800,
      profit: 1500,
    },
    {
      name: 'July',
      cost: 3490,
      income: 4300,
      profit: 1000,
    },
    {
      name: 'Aug',
      cost: 2000,
      income: 9800,
      profit: 6290,
    },
    {
      name: 'Sep',
      cost: 0,
      income: 0,
      profit: 0,
    },
    {
      name: 'Oct',
      cost: 0,
      income: 0,
      profit: 0,
    },
    {
      name: 'Nov',
      cost: 0,
      income: 0,
      profit: 0,
    },
    {
      name: 'Dec',
      cost: 0,
      income: 0,
      profit: 0,
    },
  ];
  


const MAX_BOARD_SIZE = new Date().getFullYear();



function IncomeChart(props) {
    
    const [year, setYear]= useState('2021');
    const pdfExportComponent = useRef(null)

    const  handleExportWithComponent  = (event) => {
        pdfExportComponent.current.save();
    }
    const onChangeHandler =(event)=>{
        setYear(event.target.value);
    }

    useEffect(() => {
       console.log(year);
    }, [year])

    return (
        <div className={style['admin-main']}>
            <PDFExport 
            ref={pdfExportComponent}
            paperSize={'A2'}
            scale={1}
            marginTop="3cm">
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Income vs Cost Report</h1>
                        <p>This chart shows your income behaviours and cost behaviours</p>
                    </div>
                    <div className={style['filter']}>
                        <select value={year} className={style['filter-select']} onChange={onChangeHandler}>
                            {_.range(MAX_BOARD_SIZE, 2015).map(value => <option key={value} value={value}>{value}</option>)}
                        </select>
                    </div>
                    <button className={style['button']} onClick={handleExportWithComponent}>PDF Version</button>
                </div>

                <div style={{marginTop: '20px'}}>
                    <CashFlowChart data={data}/>
                </div>
                <div style={{paddingTop: '50px'}}>
                    <IncomeTable data={data}/>
                </div>
                
            </div>
            </PDFExport>
            <Footer/>
        </div>
    )
}

export default IncomeChart
