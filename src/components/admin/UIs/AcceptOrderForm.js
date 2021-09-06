import React,{useReducer,useState} from 'react'
import {Form, ErrorMessage, Formik, Field} from 'formik'
import  Checkbox from '@material-ui/core/Checkbox'
import Notification from '../../layout/Notification'
import * as Yup from 'yup'
import style from './css/AcceptOrderForm.module.css'
import ConfirmDialog from '../../layout/ConfirmDialog'
import { Fragment } from 'react'
import instance from '../../../axios/axios-config'


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const ColorBatch = (props)=>{
    return <div className={style['color-batch']} style={{backgroundColor: props.color}}>
               {props.color === 'Black' ?  <p style={{color:'azure'}}>{props.amount}</p>: <p style={{color:'black', fontWeight:'bold'}}>{props.amount}</p>}
        </div>
}

const initialState = {status: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'accept':
      return {status: 1};
    case 'reject':
      return {status: 2};
    default:
      throw new Error();
  }
}

function AcceptOrderForm(props) {
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})
    const [state, dispatch] = useReducer(reducer, initialState);
    const [rejectToggle, setRejectToggle]= useState(false)
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    
    //console.log(state.status);

    const getValue = (e)=>{
        console.log('bye');
        setRejectToggle(!rejectToggle)
        console.log('hi');
        console.log(rejectToggle);
    }


    if(state.status === 2){
        
        if(rejectToggle === true){
            console.log('Rejected');
            var conf={
                supplier:String,
                id: String,
                status:Number
            }
            conf.supplier = "60efda000000000000000000"
            conf.status = 2
            conf.id = props.order._id

            console.log(conf);
            instance().patch('/admin/acceptorder', conf).then((response)=>{
                if(response.data.success){
                    setNotify({isOpen: true, message:'Order is rejected successfully', type:'success'})
                    setTimeout(()=>{
                        //props.setToggleState(!props.toggleState)
                        window.location.reload();
                    },1000)
                   
                }else{
                    setNotify({isOpen: true, message:'Sorry! something went wrong in updation', type:'error'})
                }
            }).catch((e)=>{
                console.log(e);
            })

            state.status = 0;

        }else{
            console.log('You have to confirm');
            state.status = 0;
            setNotify({isOpen: true, message:'Sorry! You have to confirm before rejecting the order', type:'error'})
        }
    }
   
    return (
        <Fragment>
        <Formik
        enableReinitialize
        initialValues={{
            name: ''
        }}

        validationSchema={Yup.object({
            name: Yup.string().trim().required('Required'),
        
        })}

        onSubmit={(values,{setSubmitting, resetForm })=>{

            var conf={
                supplier:String,
                id: String,
                status:Number,
                material:String,
                price:Number,
                date:Date
            }

            conf.id = props.order._id
            conf.supplier = values.name
            conf.status = 1
            conf.material = props.order.material
            conf.price = props.order.price
            conf.date = props.order.date
    
            console.log(conf);

            instance().patch('/admin/acceptorder', conf).then((response)=>{
                if(response.data.success){
                    setNotify({isOpen: true, message:'Order is assigned successfully', type:'success'})
                    setTimeout(()=>{
                        //props.setToggleState(!props.toggleState)
                        window.location.reload()
                    },1000)
                }else{
                    setNotify({isOpen: true, message:'Sorry! something went wrong in updation', type:'error'})
                }
            }).catch((e)=>{
                console.log(e);
            })

            
        }}
        >
        <Form>   
        <div className={style['order-form-wrapper']}>
            <div className={style['order-form-content']}>
            
                <div className={style['material']}>
                    <h1>{props.order.material}</h1>
                </div>
                <div className={style['color-content']}>

                    {props.order.ordered_items.map((item, index)=>{
                        return  <ColorBatch key={index} color = {item.color} amount={item.amount}/>
                    })}
                   
                   {/**
                    <ColorBatch color= 'Black'/>
                    <ColorBatch color = 'Green'/>  */}
                    
                </div>
                <div className={style['form-add-input']}>
               
                    <Field className={style['select']} name="name" as="select">
                    <option value=''>&nbsp;&nbsp;Choose a Supplier</option>
                    {props.order.suppliers.length>0? props.order.suppliers.map((supplier)=>{
                        return <option key={supplier._id} value={`${supplier._id}`}>&nbsp;&nbsp;{supplier.company_name}</option>
                    }):''}

                    {/**<option value='sunil'>&nbsp;&nbsp;Sunil</option>
                    <option value='kamal'>&nbsp;&nbsp;Kamal</option>
                    <option value='nimal'>&nbsp;&nbsp;Nimal</option>  */}

                    </Field>
                    <ErrorMessage name='name'>{ msg => <div style={{ color: 'maroon' }}>{msg}</div> }</ErrorMessage>
                
                </div>
                <div className={style['accept-order']}>
                    <button type='submit'  onClick={()=> {dispatch({type: 'accept'})}}>Accept</button>
                </div>
            </div>
            <div className={style['form-bottom']}>

            <div className={style['date']}>
                <h4>📆 {props.order.date.slice(0,10)}</h4>
            </div>
            <div className={style['rejected-order']}>
                <Checkbox color='secondary' name='terms' value={rejectToggle} onChange={(e)=> getValue(e)}/>
                <button type='button' onClick={() => dispatch({type: 'reject'})}>Reject</button>
                
            </div>
            <div className={style['cost']}>
               <h4>💸 Rs {formatter.format(props.order.price).replace('$', '')}</h4>
            </div>
            </div>
            
            </div>
            </Form>
           
           </Formik>
            <Notification notify={notify} setNotify={setNotify}/> 
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
         </Fragment>
    )
}

export default AcceptOrderForm
