import React from 'react'
import style from './Card.module.css'
import Rating from '@material-ui/lab/Rating';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

function Card2(props) {
    const price = formatter.format(props.price).replace('$', '');
    return (
        <div className={style.card}>
            <div className={style['card-content-2']}>
                <img className={style['material-image']} src={window.image_path_product+props.image} alt="items_rows"/>
                <div className={style['material-description']}>
                    <span style={{fontWeight:'bold', fontSize:'16px'}}>{props.name}</span>
                    <span style={{fontWeight:'bold', fontSize:'14px'}}>{props.modalNo}</span>
                    <span>{props.stock} Units</span>
                    <span>RS&nbsp;{price}</span>
                </div>

            </div>
            <div className={style['material-colors']}> 
            <Rating name="half-rating-read"  defaultValue={props.rating} precision={0.5} readOnly />
                
            </div>
        </div>
    )
}

export default Card2
