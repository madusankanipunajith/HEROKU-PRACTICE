import React, { useState, useEffect } from 'react'
import './CustomerTable.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import ReactTooltip from "react-tooltip";
import Notification from '../../layout/Notification';
import ConfirmDialog from '../../layout/ConfirmDialog';
import { Fragment } from 'react';
import instance from '../../../axios/axios-config';

 const userRows = [];


function CustomerTable(props) {

    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})
    const [data, setData]= useState(userRows);
    const [toggleState, setToggleState] = useState(true)

    useEffect(() => {
        instance().post('/admin/customerlist')
            .then((response) => {

                var newCusList = [];
                var cusList = [];
                cusList = response.data
                cusList.forEach((customer) => {
                    var cus = {
                        id: String,
                        name: String,
                        email: String,
                        address: Object,
                        province:String,
                        tel: [String, String],
                        gender:String
                    }

                    cus.id = customer._id
                    cus.name = customer.fName + ' ' + customer.lName
                    cus.email = customer.email
                    cus.address = customer.addressObj.firstRow+','+customer.addressObj.secondRow+','+customer.addressObj.city
                    cus.province = customer.addressObj.province
                    cus.gender = customer.gender
                    cus.tel = [customer.mobile, customer.phone]
                    newCusList.push(cus)

                })
                setData(newCusList)
                //console.log(newSuperList);
            })
            .catch((err) => {
                //  console.log(err);
            })
    },[toggleState]);

    const deleteHandler = (id)=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        //setData(data.filter((item)=> item.id !== id))
        instance().post('/admin/deletecustomer', id).then((response)=>{
            setToggleState(!toggleState);
            setNotify({isOpen: true, message:'Deleted Successfully', type:'success'})
        }).catch((e)=>{
            console.log(e);
        })
        
    }
   
    
    const columns = [
        
        { field: 'name', headerName: 'Customer Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'gender', headerName: 'Gender', width: 150, renderCell: (params)=>{
            return (
                <div className="customer-gender">
                    {params.row.gender}
                    <div className='gender-icon'>{params.row.gender ==='Male' ?<i className='fa fa-male'></i> : <i className='fa fa-female'></i>}</div>
                </div>
            )
        } },
        { field: 'address', headerName: 'Address', width: 230 },
        { field: 'province', headerName: 'Province', width: 150 },
        { field: 'action', headerName: 'Delete',disableSorting: true, width: 150, renderCell: (params)=>{

            return(
                <>
                <DeleteOutline data-tip data-for='d-tip' className="customer-delete" onClick={()=>
                    setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete ?",
                        subTitle: "You can't undo this operation",
                        onConfirm: ()=> {deleteHandler(params.row.id)}
                    })
                
                }/> 
                <ReactTooltip id='d-tip' place='bottom' effect='solid'>
                    Delete Customer
                </ReactTooltip>
                </>
                
            )
        }}

      ];
    return (
       
        <Fragment>
            <div className='customer-list'>
            <DataGrid autoHeight {...data} disableSelectionOnClick rows={data} columns={columns}  /> 

            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
        </div>
        </Fragment>
       
       
    )
}

export default CustomerTable
