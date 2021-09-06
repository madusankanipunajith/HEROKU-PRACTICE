import React from 'react'
import style from './SupplierCard.module.css'
import {Link} from 'react-router-dom'
import instance from '../../axios/axios-config';


function SupplierCard(props) {

    const id = props.supplier.id;

    const deleteHandler=(id)=>{
        props.setConfirmDialog({
            ...props.confirmDialog,
            isOpen: false
        })
        console.log(id);
        instance().delete(`/admin/deletesupplier/${id}`).then((response)=>{

            if(response.data.deleted){
                props.setNotify({isOpen: true, message:'Deleted Successfully', type:'success'})
                setTimeout(()=>{
                    props.setToggle(!props.toggle);
                },2000)
            }else{
                console.log('Cant Deleted');
            }
        }).catch((e)=>{
            console.log(e);
        })

        console.log(id);
    }

    return (
        <div className={style['supplier-card']}>
            <div className={style['card-content']}>
                <label><div className={style['icons']}><i className="fa fa-user fa-2x"></i></div><b>{props.supplier.name}</b></label>
                <label><div className={style['icons']}><i className="fa fa-envelope fa-2x"></i></div>{props.supplier.email}</label>
                <label><div className={style['icons']}><i className="fa fa-phone-square fa-2x"></i></div>{props.supplier.tel[0]}&nbsp; | {props.supplier.tel[1]}</label>
                <label><div className={style['icons']}><i className="fa fa-map-marker fa-2x"></i></div>{props.supplier.address}</label>
                <div className={style['label']}>
                    <div className={style['icons']}><i className="fa fa-cogs fa-2x"></i></div>
                    <div className={style['supplier-material']}>
                        <ul className={style['list']}>
                            {props.supplier.items.map((item)=>{
                                return <li key={item}>❆ {item}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={style['card-action']}>
                <Link to={'/admin/supplier/edit/'+ id}>
                <div className={style['supplier-edit']}>
                    <button>Edit</button>
                </div>
                </Link>
                <div className={style['supplier-delete']}>
                    <button onClick={()=>
                        props.setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete Supplier?",
                            subTitle: "You can't undo this operation",
                            onConfirm: ()=> {deleteHandler(props.supplier.id)}
                        })
                    }>Delete</button>
                </div>
            </div>

        </div>
    )
}

export default SupplierCard 
