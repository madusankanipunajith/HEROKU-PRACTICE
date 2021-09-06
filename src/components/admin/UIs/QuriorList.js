import React from 'react'
import style from './css/WareHouse.module.css'
import style2 from './css/CustomerList.module.css'
import QuriorTable from '../tables/QuriorTable'
import Footer from '../../layout/Footer'

function QuriorList(props) {
    return (
        <div className={style['admin-main']}>
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Couriers</h1>
                        <p>Couriers who are working at your shop</p>
                    </div>
                </div>

                <div className={style2['customer-content']}>
                  <QuriorTable/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default QuriorList
