import React from 'react'
import style from './WareHouse.module.css'
import Card2 from './Card2'
import { useState, Fragment, useEffect } from 'react'
import PopUpDialog from '../../layout/PopUpDialog'
import ProductForm from '../UIs/ProductForm'
import instance from '../../../axios/axios-config'
import Loader from '../../layout/Loader'
import Notification from '../../layout/Notification'

const productRows =[]

function ProductsHome() {
    const [searchTerm, setSearchTerm] = useState('')
    const [popUp, setPopUp]= useState({isOpen: false, title: '', subTitle: '', id: '', type: '', edit:''})
    const [popUp2, setPopUp2] = useState({isOpen: false, title: ''})
    const [products, setProducts] = useState(productRows);
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})

    useEffect(()=>{
        instance().get('/admin/viewproducts').then((response)=>{
            var newProducts = [];
            var Products = [];
            Products = response.data;
            Products.forEach((product)=>{
                var prod = {
                    id:String,
                    name:String,
                    modelNo:String,
                    price:Number,
                    rating:Number,
                    stock:String,
                    img:String
                }

                prod.id = product._id;
                prod.name = product.name;
                prod.modelNo = product.pno;
                prod.price = product.price;
                prod.rating = product.rating;
                prod.stock = '';
                prod.img = product.img;
                prod.stock = product.stock;

                newProducts.push(prod);
            })

            setProducts(newProducts)
        }).catch((e)=>{
            console.log(e);
        })
    },[])
   
    console.log(products);
    return (
        <Fragment>
            <div className={style['product-content']}>
            <div className={style['search-bar']}>
                <input type='text' placeholder='search bar 🔍' onChange={(e)=> {setSearchTerm(e.target.value)}}/>
            </div>
            <div className={style['add-button']}>
                <button onClick={()=> setPopUp2({isOpen: true, title:'Product Form'})}>+ Add</button>
            </div> 
            </div>
            {products.length > 0 ? <div className={style['warehouse-content']}>
            {products.filter((val)=>{
                if(searchTerm === ''){
                    return val;
                }else if(val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return val;
                }
                return false
            }).map((item) =>{
            return <div key={item.id} onClick={()=> setPopUp({isOpen: true, title: `${item.name}`, subTitle:`${item.modelNo}`, id: `${item.id}`, type:'products', edit:'editproduct'})} >
               <Card2 key={item.id} image={item.img} name={item.name} modalNo={item.modelNo} stock={item.stock} price={item.price} rating={item.rating}/>
           </div>
            })}

            

            <PopUpDialog
                popUp={popUp}
                setPopUp={setPopUp}
                setNotify = {setNotify}
            >

            </PopUpDialog>

            <ProductForm
                popUp={popUp2}
                setPopUp={setPopUp2}
            >

            </ProductForm>
        </div> : <div style={{marginTop:'70px'}}><Loader/></div>}  

        <Notification notify={notify} setNotify={setNotify}/>        
        </Fragment>
    )
}

export default ProductsHome
