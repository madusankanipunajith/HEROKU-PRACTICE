import React,{useState, useEffect} from 'react'
import style from './css/AddProduct.module.css'
import AcceptOrderForm from './AcceptOrderForm'
import Footer from '../../layout/Footer'
import instance from '../../../axios/axios-config'
import Loader from '../../layout/Loader'

function AcceptOrder(props) {
    //const [searchTerm, setSearchTerm] = useState('')
    const [data, setData] = useState([])
    const [toggleState, setToggleState] = useState(false)
    useEffect(()=>{
      
        instance().get('admin/viewnotconfirmingorders').then((response)=>{
           setData(response.data)
        }).catch((e)=>{
            console.log(e);
        })

    },[toggleState])

    window.orders = data.length;
    console.log(window.orders);
    return (
        <div className={style['add-product-main']}>
            <div className={style['add-product-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Accept Orders</h1>
                        <p>You should accept orders before sending to supplier</p>
                    </div>
                </div>
                {/**<div className={style['search-bar']}>
                    <input type='text' placeholder='search your material here... 🔍' onChange={(e)=> {setSearchTerm(e.target.value)}}/>
                </div> */}

                {data.length > 0 ? data.map((order)=>{
                    return <AcceptOrderForm key={order._id} order={order} toggleState={toggleState} setToggleState={setToggleState}/>
                }): <div style={{marginTop:'100px'}}><Loader/></div>}
                
            </div>

            <Footer/>
        </div>
    )
}

export default AcceptOrder
