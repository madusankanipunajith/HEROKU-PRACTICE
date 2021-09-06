import React from 'react'
import style from './css/CustomerList.module.css'
import CustomerTable from '../tables/CustomerTable'
import Footer from '../../layout/Footer'


function CustomerList(props) {
    
    return (
        <main>
            <div className="main-container">
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Customers</h1>
                        <p>Customers who belong to the system</p>
                    </div>
                </div>


                <div className={style['customer-content']}>
                    
                    <CustomerTable />
                </div>
            </div>

            <Footer/>

        </main>
    )
}

export default CustomerList
