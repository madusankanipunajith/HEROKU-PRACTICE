import React from 'react'
import style from './MaterialTable.module.css'

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const Circle = (props)=>{
    return <div  className={`${style['batch-body']}`} style={{backgroundColor: props.color}}>
            {(props.color === 'Black')? <div style={{color:'azure', fontWeight:'bold', marginTop:'5px'}}>{props.amount}</div> : <div style={{color:'black', fontWeight:'bold',marginTop:'5px'}}>{props.amount}</div>}
          </div>
}

function OrderTable(props) {
    const materials = props.data

    const status =(status)=>{
        if(status === 1){
            return <p style={{
                color:'azure', background:'green', padding:'2px', borderRadius:'5px', width:'100px', marginLeft:'60px'}}>
                Accepted</p>
        }else if(status === 0){
            return <p style={{
                color:'azure', background:'orange',padding:'2px', borderRadius:'5px',width:'100px', marginLeft:'60px'}}>
                Pending</p>
        }else{
            return <p style={{
                color:'azure', background:'red',padding:'2px', borderRadius:'5px',width:'100px', marginLeft:'60px'}}>
                Rejected</p>
        }
    }

    return (
        <div className={style['table-container']} style={{marginTop:'30px'}}>
             <h1 className={style['heading']}>History Of Orders</h1>
            <table className={style['table']}>
               
                <thead>
                    <tr>
                        <th>Count</th>
                        <th>Material's Name</th>
                        <th>Order Date</th>
                        <th>Supplier's Name</th>
                        <th>Order Infomation</th>
                        <th>Order Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
    
                {materials.length > 0 ? materials.filter((val)=>{
                    if (props.searchTerm === '') {return val}
                    else if(val.material.toLocaleLowerCase().includes(props.searchTerm.toLocaleLowerCase())){return val}
                    return false
                    }).map((material, index)=>{
                            return <tr key={material._id}>
                                <td data-label="rank">{index +1}</td>
                                <td  data-label="material_name">{material.material}</td>
                                <td  data-label="material_date"> {material.date.slice(0,10)}</td>
                                <td  data-label="supplier"> {material.supname.company_name}</td>
                                <td  data-label="info" style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}> {material.orderItems.map((item)=>{
                                    return <div key={item.color} ><Circle amount={item.amount} color={item.color}/></div>
                                })}</td>
                                <td  data-label="material_price">RS {formatter.format(material.price).replace('$', '')}</td>      
                                <td  data-label="status" style={{textAlign:'center'}}>{status(material.status)}</td>
                                </tr>
                        }):<tr><td>Empty Rows</td></tr>
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default OrderTable
