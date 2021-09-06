import React from 'react'
import style from './css/WareHouse.module.css'
import style2 from './css/CustomerList.module.css'
import SupervisorTable from '../tables/SupervisorTable'
import Footer from '../../layout/Footer'

function SupervisorList(props) {
    return (
        <div className={style['admin-main']}>
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Supervisors</h1>
                        <p>Supervisors who are working at your shop</p>
                    </div>
                </div>

                <div className={style2['customer-content']}>
                    <SupervisorTable/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SupervisorList
