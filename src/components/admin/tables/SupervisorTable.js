import React,{useState, useEffect} from 'react'
import './CustomerTable.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import ReactTooltip from "react-tooltip";
import Notification from '../../layout/Notification';
import ConfirmDialog from '../../layout/ConfirmDialog';
import instance from '../../../axios/axios-config';


const userRows=[];

function SupervisorTable() {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})
    const [data, setData]= useState(userRows);
    const [toggleState, setToggleState] = useState(true)
    useEffect(() => {
        instance().post('/admin/supervisorlist')
            .then((response) => {

                var newSuperList = [];
                var superList = [];
                superList = response.data
                superList.forEach((supervisor) => {
                    var superv = {
                        id: String,
                        name: String,
                        email: String,
                        address: String,
                        tel: [String, String]
                    }

                    superv.id = supervisor._id
                    superv.name = supervisor.fName + ' ' + supervisor.lName
                    superv.email = supervisor.email
                    superv.address = supervisor.address
                    superv.tel = [supervisor.mobile, supervisor.telephone]
                    newSuperList.push(superv)

                })
                setData(newSuperList)
                //console.log(newSuperList);
            })
            .catch((err) => {
                //  console.log(err);
            })
    },[toggleState]);

    const deleteHandler = (email)=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        //setData(data.filter((item)=> item.id !== id))
        //console.log(email);
        instance().post('/admin/deletesupervisor', {email: email}).then((response)=>{
            if(response.data.deleted){
                setToggleState(!toggleState);
                setNotify({isOpen: true, message:'Deleted Successfully', type:'success'})
            }else{
                console.log('Cant Deleted');
            }
            
        }).catch((e)=>{
            console.log(e);
        })
    }

    const columns = [
        
        { field: 'name', headerName: 'Customer Name', width: 250, },
        { field: 'email', headerName: 'Email', width: 280 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'tel', headerName: 'Telephone', width: 200, renderCell: (params)=>{
            
               return(
                <div className="customer-telephone">
                    <div style={{marginRight: '5px'}}>{params.row.tel[0]}</div> |
                    <div style={{marginLeft: '5px'}}>{params.row.tel[1]}</div>
                </div>
               ) 
            
        } },
        { field: 'action', headerName: 'Delete', width: 150, renderCell: (params)=>{

            return(
                <>
                <DeleteOutline data-tip data-for='d-tip' className="customer-delete" onClick={()=>
                    setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete Supervisor?",
                        subTitle: "You can't undo this operation",
                        onConfirm: ()=> {deleteHandler(params.row.email)}
                    })
                
                
                }/> 
                <ReactTooltip id='d-tip' place='left' effect='solid'>
                    Delete Supervisor
                </ReactTooltip>
                </>
                
            )
        }}

      ];
    
    return (
        <div className='customer-list'>
            <DataGrid autoHeight {...data} disableSelectionOnClick rows={data} columns={columns}  /> 

            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
        </div>
    )
}

export default SupervisorTable
