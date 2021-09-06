import React from 'react'
import style from './css/WareHouse.module.css'
import ProductsHome from '../warehouse/Products'
import Footer from '../../layout/Footer'

function Products(props) {
    return (
        <div className={style['admin-main']}>
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Warehouse</h1>
                        <p>Already created products in your shop</p>
                    </div>
                </div>

                <ProductsHome />
            </div>
            <Footer/>
        </div>
    )
}

export default Products
