import React, { useRef } from 'react'
import style from './css/WareHouse.module.css'
import Footer from '../../layout/Footer'
import Card from '../warehouse/Card'
import Card2 from '../warehouse/Card2'
import style2 from './css/MaterialReport.module.css'
import MaterialTable from '../tables/MaterialTable'
import ProductTable from '../tables/ProductTable'
import { useState, useEffect } from 'react'
import instance from '../../../axios/axios-config'
import Loader from '../../layout/Loader'
import { PDFExport} from '@progress/kendo-react-pdf';


function compare(a,b){
    if(a.rating < b.rating){
        return 1;
    }
    if(a.rating > b.rating){
        return -1;
    }

    return 0;
}
function compare2(a,b){
    if(a.rank < b.rank){
        return 1;
    }
    if(a.rank > b.rank){
        return -1;
    }

    return 0;
}
var top3 = 3;
var top10 = 10;


function MaterialReport(props) {
    const [products, setProducts] = useState([]);
    const [rankMaterial, setRankMaterial] = useState([]);
    const pdfExportComponent = useRef(null)

    const  handleExportWithComponent  = (event) => {
        pdfExportComponent.current.save();
    }
    
    useEffect(() => {
        const fetchData = async()=>{
            const response_1 = await instance().get('/admin/viewproducts');
            const response_2 = await instance().get('/admin/materialreport');
            setProducts(response_1.data);
            setRankMaterial(response_2.data);
        }

        fetchData();
       
    }, [])

    products.sort(compare)
    rankMaterial.sort(compare2)
    console.log(products);
    console.log(rankMaterial);
    return (
       
        <div className={style['admin-main']}>
            <PDFExport ref={pdfExportComponent}  paperSize="A2">
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Inventory Report</h1>
                        <p>Behavior of the raw materials and readymate Clothes in your shop</p>
                    </div>
                    <button className={style2['button']} onClick={handleExportWithComponent}>PDF Version</button>
                </div>

                <button className={style2['button-responsive']} onClick={handleExportWithComponent}>PDF</button>
            
            {products.length > 0 ? <div>
                <div className={style2['heading']}>
                    <h2>Top 3 Demanding Raw Materials</h2>
                </div>
                <div className={style2['body-1']}>

                    {rankMaterial.slice(0, top3).map((item)=>{
                       return <Card key={item.name} image={item.img} name={item.name} stock={item.stock} status={item.status} colors={item.colors} rank={item.rank}/>
                    })}
                   
                </div> 
                <div className={style2['heading']}>
                    <h2>Top 3 Demanding Redimate Clothes</h2> 
                </div>
                <div className={style2['body-1']}>
                    {products.slice(0, top3).map((item)=>{
                        return <Card2 key={item._id} image={item.img} name={item.name} modalNo={item.modalNo} stock={item.stock} price={item.price} rating={item.rating}/>
                    })}

                </div> 

                <MaterialTable data={rankMaterial.slice(0, top10).map((material)=>{return material})}/>  <br></br>
                <ProductTable data={products.slice(0, top10).map((product)=>{return product})} select= {false}/>
                </div>: <div style={{marginTop:'150px', marginBottom:'120px'}}><Loader/></div>}
           
                
            </div>
           
            </PDFExport>
            
            <Footer/>    
        </div>
        
    )
}



export default MaterialReport