import React from 'react'
import style from './Card.module.css'
import ColorBatch from './ColorBatch';

function Card(props) {
    const stock_class = props.status === 'in stock' ? `${style['instock']}`: `${style['outstock']}`;
    const stock_icon = props.status === 'in stock' ? 'fa fa-smile-o' : 'fa fa-frown-o';
    return (
        <div className={style.card}>
            <div className={style['card-content']}>
                <img className={style['material-image']} src={window.image_path_material+props.image} alt="items_rows"/>
                <div className={style['material-description']}>
                    <span style={{fontWeight:'bold', fontSize:'20px'}}>{props.name}</span>
                    <span>{props.stock} Units</span>
                    <span className={`${style['material-status']} ${stock_class}`}><i className={stock_icon}></i>&nbsp;{props.status}</span>
                </div>
            </div>
            <div className={style['material-colors']}> 
                {props.colors.map((item)=>{
                   return <ColorBatch key={item} color={item}/>
                })}
                
            </div>
        </div>
    )
}

export default Card
