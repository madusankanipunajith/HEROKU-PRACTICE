import React from 'react'
import style from '../admin/tables/MaterialTable.module.css'

function Circle(props) {
    return (
        <div  className={`${style['batch-body']}`} style={{backgroundColor: props.color}}>
            {(props.color === 'Black')? <div style={{color:'azure', fontWeight:'bold', marginTop:'5px', textAlign:'center'}}>{props.amount}</div> : <div style={{color:'black', fontWeight:'bold',marginTop:'5px', textAlign:'center'}}>{props.amount}</div>}
        </div>
    )
}

export default Circle



