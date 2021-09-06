import React from 'react'
import style from './css/WareHouse.module.css'
import WareHouseHome from '../warehouse/WareHouse'
import Footer from '../../layout/Footer'

function WareHouse(props) {
    return (
        <div className={style['admin-main']}>
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Warehouse</h1>
                        <p>All the materials in your shop</p>
                    </div>
                </div>
            
                <WareHouseHome />
            </div>
            <Footer/>
        </div>
    )
}

export default WareHouse
