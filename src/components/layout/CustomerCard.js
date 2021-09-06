import React from 'react'
import style from './CustomerCard.module.css'

function CustomerCard(props) {
    var customer = props.customer;
    return (
        <div className={style['card-body']}>
            <div className={style['card-container']}>
                <img className={style['customer-avatar']} src={`http://localhost:5000/files/customer/cv.jpg`} alt='customer-avatar'/>
                <div className={style['info']}>
                    <h4 className={style['h4']}>{customer.name}</h4>
                    <h5>{customer.email}</h5>
                </div>
                <div className={style['address']}>
                    <span>Address</span>
                    <div className={style['address-content']}>
                        <span>Line 1</span>
                        <p>{customer.address.firstRow}</p>
                    </div>
                    <div className={style['address-content']}>
                        <span>Line 2</span>
                        <p>{customer.address.secondRow}</p>
                    </div>
                    <div className={style['address-content']}>
                        <span>City</span>
                        <p>{customer.address.city}</p>
                    </div>
                    <div className={style['address-content']}>
                        <span>District</span>
                        <p>{customer.address.district}</p>
                    </div>
                    <div className={style['address-content']}>
                        <span>Province</span>
                        <p>{customer.address.province}</p>
                    </div>
                    <div className={style['address-content']}>
                        <span>Postal Code</span>
                        <p>{customer.address.postalCode}</p>
                    </div>
                    <br></br>
                    <div className={style['address-content']}>
                        <span>Credits</span>
                        <p>{customer.total}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerCard
