import React from 'react'
import style from './MaterialTable.module.css'
import Rating from '@material-ui/lab/Rating';


function ProductTable(props) {
    const materials = props.data
    return (
        <div className={style['table-container']}>
             <h1 className={style['heading']}>Demanding Products (Top 10)</h1>
            <table className={style['table']}>
               
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Product's Image</th>
                        <th>Product's Name</th>
                        <th>Product's Rating</th>
                        {props.select && <th>Selection</th>}
                        
                    </tr>
                </thead>
                <tbody>
                    {materials.length > 0 ? materials.map((material, index)=>{
                            return <tr key={material._id}>
                                        <td data-label="rank">{index +1}</td>
                                        <td  data-label="image"><img style={{width:'40px', height:'40px'}} src={window.image_path_product+material.img} alt={material.img}/></td>
                                        <td  data-label="material_name">{material.name}</td>
                                        <td  data-label="rating"> <Rating name="half-rating-read"  defaultValue={material.rating} precision={0.5} readOnly /></td>
                                        {props.select &&  <td  data-label="selection"><span style={{color:'green'}}>Select</span></td>}
                                    </tr>
                        }):<tr><td>Empty Rows</td></tr>
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default ProductTable
