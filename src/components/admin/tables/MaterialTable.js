import React from 'react'
import style from './MaterialTable.module.css'

let totalAmount = 0;
function MaterialTable(props) {
    const materials = props.data
    if(materials.length > 0){
        totalAmount = materials.map((obj)=>{return obj.rank}).reduce((total, num)=>{return total + num});
    }
    
    return (
        <div className={style['table-container']}>
             <h1 className={style['heading']}>Demanding Materials (Top 10)</h1>
            <table className={style['table']}>
               
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Material's Image</th>
                        <th>Material's Name</th>
                        <th>Material's Order Ratio</th>
                        <th>Material's Status</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.length > 0 ? materials.map((material, index)=>{
                            return <tr key={index}>
                                        <td data-label="rank">{index+1}</td>
                                        <td  data-label="image"><img style={{width:'40px', height:'40px'}} src={window.image_path_material+material.img} alt={material.img}/></td>
                                        <td  data-label="material_name">{material.name}</td>
                                        <td data-label="ratio">{((material.rank/totalAmount)*100).toFixed(2)} %</td>
                                        <td  data-label="rating">{material.status}</td>
                                    </tr>
                        }): <tr><td>Empty Rows</td></tr>
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default MaterialTable
