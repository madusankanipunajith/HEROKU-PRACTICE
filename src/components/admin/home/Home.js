import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import hello from '../../../assets/logo.jpeg'
import Chart from '../charts/Chart'
import Footer from '../../layout/Footer'
import CircularProgress from '@material-ui/core/CircularProgress';
import instance from '../../../axios/axios-config'

const defaultData = {
    customerCount:<CircularProgress size={25} />,
    supervisorCount:<CircularProgress size={25}/>,
    supplierCount:<CircularProgress size={25}/>,
    curiorCount:<CircularProgress size={25}/>,
    income:<CircularProgress size={20}/>,
    sales:<CircularProgress size={20}/>,
    otherCost:<CircularProgress size={20}/>,
    orderCost:<CircularProgress size={20}/>
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

function Home() {
    const [dashboarddata, setDashboardData] = useState(defaultData)
    const [incomeData, setIncomeData] = useState([])

    useEffect(() => {
        // Update the document title using the browser API
        instance().post('/admin/dashboard').then((response) => {
            setDashboardData(response.data)
            console.log(response.data);


        }).catch((err) => {
            alert(err)

        })

        instance().get('/admin/dashboard2').then((response)=>{
            setIncomeData(response.data)
            
        }).catch((err)=>{
            alert(err)
        })

    },[]);
    console.log(incomeData);
    return (
        <main>
            <div className="main-container">
                <div className="main-title">
                    <img src={hello} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Hello Madusanka</h1>
                        <p>Welcome to your admin dashboard</p>
                    </div>
                </div>

                <div className="main-cards">
                    <Link to="/admin/customers">
                    <div className="card">
                        <i className="fa fa-user-o fa-2x text-gold i-color"></i>
                        <div className="card-inner">
                            <p className="text-primary-p">Number of Customers</p>
                            <span className="font-bold text-title">{dashboarddata.customerCount}</span>
                        </div>
                    </div>
                    </Link>

                    <Link to='/admin/supervisors'>
                    <div className="card">
                        <i className="fa fa-user-circle-o fa-2x text-gold i-color"></i>
                        <div className="card-inner">
                            <p className="text-primary-p">Number of Supervisors</p>
                            <span className="font-bold text-title">{dashboarddata.supervisorCount}</span>
                        </div>
                    </div>
                    </Link>

                    <Link to='/admin/quriors'>
                    <div className="card">
                        <i className="fa fa-car fa-2x text-gold i-color"></i>
                        <div className="card-inner">
                            <p className="text-primary-p">Number of Couriers</p>
                            <span className="font-bold text-title">{dashboarddata.curiorCount}</span>
                        </div>
                    </div>
                    </Link>

                    <Link to='/admin/suppliers'>
                    <div className="card">
                        <i className="fa fa-calendar fa-2x text-gold i-color"></i>
                        <div className="card-inner">
                            <p className="text-primary-p">Number of Suppliers</p>
                            <span className="font-bold text-title">{dashboarddata.supplierCount}</span>
                        </div>
                    </div>
                    </Link>
                </div>

                <div className="charts">
                    <div className="charts-left">
                        <div className="charts-left-title">
                            <div>
                                <h1>Weekly Income Report</h1>
                                <p>Stitches & Curves, SriLanka</p>
                            </div>
                            <i className="fa fa-usd"></i>
                        </div>
                        <Chart incomeData={incomeData}/>
                    </div>

                    <div className="charts-right">
                        <div className="charts-right-title">
                            <div>
                                <h1>Today Stat Reports</h1>
                                <p>Stitches & Curves, SriLanka</p>
                            </div>
                            <i className="fa fa-usd"></i>
                        </div>

                        <div className="charts-right-cards">
                            <div className="card-1">
                                <h1>Income</h1>
                                <p>Rs&nbsp;{formatter.format(dashboarddata.income).replace('$', '')}</p>
                            </div>
                            <div className="card-2">
                                <h1>Sales</h1>
                                <p>{dashboarddata.sales}</p>
                            </div>
                            <div className="card-3">
                                <h1>Orders Cost</h1>
                                <p>Rs&nbsp;{formatter.format(dashboarddata.orderCost).replace('$', '')}</p>
                            </div>
                            <div className="card-4">
                                <h1>Profit</h1>
                               {dashboarddata.otherCost > 0 ?  <p style={{color:'green'}}>Rs&nbsp;{formatter.format(dashboarddata.otherCost).replace('$', '')}&nbsp;<i className="fa fa-arrow-up"></i></p>:  <p style={{color:'red'}}>Rs&nbsp;{formatter.format(dashboarddata.otherCost).replace('$', '')}&nbsp;<i className="fa fa-arrow-down"></i></p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    )
}

export default Home
