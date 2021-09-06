import React,{useEffect, useState} from 'react'
import style from './css/WareHouse.module.css'
import style2 from './css/SupplierList.module.css'
import SupplierCard from '../../layout/SupplierCard'
import Footer from '../../layout/Footer'
import instance from '../../../axios/axios-config';
import Notification from '../../layout/Notification';
import ConfirmDialog from '../../layout/ConfirmDialog';



const suppliers =[];

function SupplierList(props) {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})

    const [data, setData] = useState(suppliers);
    const [toggleState, setToggleState] = useState(false);

    useEffect(() => {
        instance().get('/admin/supplierlist').then((response)=>{
            var newSupList = [];
            var supList = [];
            supList = response.data;
            console.log(response.data);

            supList.forEach((supplier)=>{
                var sup = {
                    id:String,
                    name:String,
                    address:String,
                    email:String,
                    tel:Array,
                    items:Array
                }

                sup.id = supplier._id;
                sup.name = supplier.company_name;
                sup.address = supplier.address;
                sup.email = supplier.email;
                sup.tel = [...supplier.telephone];
                sup.items = Object.values(supplier.materials);

                newSupList.push(sup);
            })

            setData(newSupList);

        }).catch((e)=>{
            console.log(e);
        })
       
    }, [toggleState])

    return (
        <div className={style['admin-main']}>
            <div className={style['admin-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Suppliers</h1>
                        <p>Suppliers who are connecting with your shop</p>
                    </div>
                </div>

                <div className={style2['supplier-content']}>
                    {data.map((supplier) =>{
                        return <SupplierCard key={supplier.id} confirmDialog={confirmDialog} setNotify={setNotify} setConfirmDialog={setConfirmDialog} toggle={toggleState} setToggle={setToggleState} supplier={supplier}/>
                    })}
                    
                </div>
            </div>
            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
            <Footer/>
        </div>
    )
}

export default SupplierList
