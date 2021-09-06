import React,{useEffect,useState, useRef} from 'react'
import style from './css/WareHouse.module.css'
import style2 from './css/CustomerChart.module.css'
import CustomerCharts from '../charts/CustomerCharts'
import GenderChart from '../charts/GenderChart'
import Footer from '../../admin/footer/Footer'
import { PDFExport} from '@progress/kendo-react-pdf';
import CustomerCard from '../../layout/CustomerCard'
import instance from '../../../axios/axios-config'

function compare(a,b){
    if(a.total < b.total){
        return 1;
    }
    if(a.total > b.total){
        return -1;
    }

    return 0;
}

function CustomerChart(props) {
    const [customers, setCustomers] = useState([]);
    const pdfExportComponent = useRef(null)

    const  handleExportWithComponent  = (event) => {
        pdfExportComponent.current.save();
    }

    useEffect(()=>{
        instance().get('/admin/bestcustomers').then((response)=>{
            setCustomers(response.data)
        }).catch((e)=>{
            console.log(e);
        })
    },[])

    customers.sort(compare)

    return (
        <div className={style['admin-main']}>
            <PDFExport ref={pdfExportComponent}  paperSize="A2">
            <div className={style['admin-main-container']}>
           
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Customer Report</h1>
                        <p>Customers have been categorized according to their province (Chart 1)</p>
                        <p>Customers have been categorized according to their gender (Chart 2)</p>
                    </div>
                    <button className={style2['button']} onClick={handleExportWithComponent}>PDF Version</button>
                </div>
                
                <div className={style2['customer-chart-content']}>
                    <CustomerCharts />
                </div>

                <div className={style2['customer-chart-content']}>
                    <GenderChart/>
                </div>
            
                <div className={style2['heading']}>
                    <h2>Best Customers</h2>
                </div>
                <div className={style2['top-customers']}>
                    {customers.length > 0 && customers.slice(0, 3).map((customer)=>{
                        return <CustomerCard key={customer.email} customer= {customer}/>
                    })}
                    
                </div>
            </div>
            </PDFExport>
            <Footer/>
        </div>
    )
}

export default CustomerChart
