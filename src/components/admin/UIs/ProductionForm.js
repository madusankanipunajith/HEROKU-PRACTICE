import React from 'react'
import style from './css/AddProduct.module.css'
import instance from '../../../axios/axios-config'

function ProductionForm(props) {
    return (
        <div className={style['add-product-main']}>
            <div className={style['add-product-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Add Production - Silk</h1>
                        <p>Add your production's new status here</p>
                    </div>
                </div>

               
            </div>

            <Footer/>
        </div>
    )
}

export default ProductionForm
