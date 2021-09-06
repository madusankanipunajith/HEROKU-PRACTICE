import React,{useState,useEffect} from 'react'
import OrderTable from '../tables/OrderTable'
import style from './css/AddProduct.module.css'
import instance from '../../../axios/axios-config'
import Footer from '../../layout/Footer'
import Loader from '../../layout/Loader'


function ViewOrders(props) {
    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

   
   
    useEffect(() => {
        instance().get('/admin/vieworders').then((response)=>{
           
            setData(response.data)
            setToggle(true)
            /**Orders.forEach((product)=>{
                var prod = {
                    _id:String,
                    img:String,
                    name:String,
                    rating:Number,
                    colors:Array
                }

                prod._id = product._id;
                prod.name = product.name;
                prod.price = product.price;
                prod.rating = product.rating;
                prod.img = product.img;
                prod.colors = Object.values(product.colors)

                newOrders.push(prod);
            })
             */
            
        }).catch((e)=>{
            console.log(e);
        })
       
    }, [])
    return (
        <div className={style['add-product-main']}>
           
            <div className={style['add-product-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Material Orders</h1>
                        <p>This is your companie's order history</p>
                    </div>
                    
                </div>
                <div className={style['search-bar']}>
                    <input type='text' placeholder='search your material here... 🔍' onChange={(e)=> {setSearchTerm(e.target.value)}}/>
                </div>

                {toggle ? <OrderTable data={data} searchTerm={searchTerm}/> : <div style={{marginTop:'150px', marginBottom:'120px'}}><Loader/></div>}
            </div>
           
           
            <Footer />
            
        </div>
    )
}

export default ViewOrders
