import React,{useState, useEffect} from 'react'
import './CustomerTable.css'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import CommuteIcon from '@material-ui/icons/Commute';
import ReactTooltip from "react-tooltip";
import instance from '../../../axios/axios-config';
import Notification from '../../layout/Notification';
import ConfirmDialog from '../../layout/ConfirmDialog';
import EditCourier from '../UIs/EditCourier';



/**const userRows =[
    {id: '1', name: 'Madusanka Nipunajith', email: 'madushankanipunajith@gmail.com', address: '168/B, Oruthota, Gampaha',
    tel: ['0332233782', '0714053927'], vehicle:['Car', 'Van']},
    {id: '2', name: 'Madusanka Nipunajith', email: 'madushankanipunajith@gmail.com', address: '168/B, Oruthota, Gampaha',
    tel: ['0332233782', '0714053927'], vehicle:['Bike']},
    {id: '3', name: 'Madusanka Nipunajith', email: 'madushankanipunajith@gmail.com', address: '168/B, Oruthota, Gampaha',
    tel: ['0332233782'], vehicle:['Lorry', 'Bike']}
] */

const userRows =[];

function QuriorTable() {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})
    const [data, setData]= useState(userRows);
    const [toggleState, setToggleState] = useState(true)
    const [popUp, setPopUp]= useState({isOpen: false, title: '', vehicles: []})

    useEffect(() => {
        instance().get('/admin/courierlist').then((response)=>{

            var newCurList = [];
            var curList = [];
            curList = response.data;
            console.log(curList);

            curList.forEach((courier)=>{
                var cur = {
                    id: String,
                    name: String,
                    email: String,
                    address: String,
                    tel: [String, String],
                    vehicle: Array
                }

                cur.id = courier._id
                cur.name = courier.fName + ' ' + courier.lName
                cur.email = courier.email
                cur.address = courier.address
                cur.tel = [courier.telephone, courier.mobile]
                cur.vehicle = [...courier.vehicles]
                newCurList.push(cur)
            })

            setData(newCurList)
           

        }).catch((e)=>{
            console.log(e);
        })
       
    }, [toggleState])

    //console.log(data);

    const deleteHandler = (email)=>{
        //setData(data.filter((item)=> item.email !== email))
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        instance().delete(`/admin/deletecourier/${email}`).then((response)=>{
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
        
        { field: 'name', headerName: 'Qurior Name', width: 250, },
        { field: 'email', headerName: 'Email', width: 280 },
        { field: 'address', headerName: 'Address', width: 350 },
        { field: 'tel', headerName: 'Telephone', width: 200, renderCell: (params)=>{
            
               return(
                <div className="customer-telephone">
                    <div style={{marginRight: '5px'}}>{params.row.tel[0]}</div> |
                    <div style={{marginLeft: '5px'}}>{params.row.tel[1]}</div>
                </div>
               ) 
            
        } },
        { field: 'vehicle', headerName: 'Vehicles', width: 300 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params)=>{

            return(
                <div className="qurior-action">

                    <CommuteIcon className="qurior-edit" onClick={()=>{
                        setPopUp({isOpen: true, title: params.row.name, email: params.row.email, vehicles: params.row.vehicle})
                    }}/>
                   
                    <DeleteOutline data-tip data-for='d-tip' className="qurior-delete" onClick={()=>
                        //deleteHandler(params.row.id)
                        setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete Courier?",
                            subTitle: "You can't undo this operation",
                            onConfirm: ()=> {deleteHandler(params.row.email)}
                        })

                    }/> 
                    <ReactTooltip id='d-tip' place='left' effect='solid'>
                        Delete Qurior
                    </ReactTooltip>
                    
                </div>
                
            )
        }}

      ];

    return (
       <div className='customer-list'>
            <DataGrid autoHeight {...data} disableSelectionOnClick rows={data} columns={columns}  /> 

            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>

            <EditCourier
                popUp={popUp}
                setPopUp={setPopUp}
                setNotify = {setNotify}
            
            />
        </div>
    )
}

export default QuriorTable
