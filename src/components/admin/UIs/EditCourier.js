import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import { Dialog, DialogTitle, DialogContent, DialogActions, Checkbox } from '@material-ui/core'
import * as Yup from 'yup' 
import { Formik,Form, ErrorMessage } from 'formik'
import style from './css/EditCourier.module.css'
import instance from '../../../axios/axios-config';

const Vehicles = ['Car', 'Van', 'Lorry', 'Motorbike', 'Threewheel'];

function EditCourier(props) {
    const {popUp, setPopUp} = props;
    var otherVehicles = [];
    //console.log(popUp.vehicles);

    otherVehicles = Vehicles.filter(function (e){
        return this.indexOf(e) < 0;
    },popUp.vehicles)

    const getValue = (e) => {

        let value = e.target.value;
        if (popUp.vehicles.find((obj) => obj === value)) {
          let index = popUp.vehicles.indexOf(value);
          if (index > -1) {
            popUp.vehicles.splice(index, 1);
          }
          console.log(popUp.vehicles);
        } else {
          popUp.vehicles.push(value);
          
          console.log(popUp.vehicles);
        }
    
        
    };

    console.log(otherVehicles);
    return (
        <Formik
            enableReinitialize
            initialValues={{
                vehicles: popUp.vehicles || []
            }}

            validationSchema={Yup.object({
                vehicles: Yup.array().min(1,'At least one raw material should be selected')
            })}

            onSubmit={(values, { setSubmitting, resetForm })=>{
                console.log(values.vehicles);
                var cob={
                    email: String,
                    vehicles: Array
                }
                cob.email = popUp.email;
                cob.vehicles = values.vehicles;

                instance().patch('/admin/editcourier', cob).then((response)=>{
                    if(response.data.success){
                        props.setNotify({isOpen: true, message:'Edited Vehicles Successfully', type:'success'});
                        setTimeout(()=>{
                            setPopUp({...popUp, isOpen: false})
                        },2000)
                    }else{
                        props.setNotify({isOpen: true, message:'Cannot Update. Try Again...', type:'error'})
                    }
                }).catch((e)=>{
                    console.log(e);
                })
            }}
        >
            <Dialog open={popUp.isOpen} PaperProps={{
            style: {
                boxShadow: '1px',
                width:'500px',          
                },
            }}>
            
                <Form>
                <DialogTitle>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span>{popUp.title}</span>
                    <CancelIcon style={{cursor:'pointer', backgroundColor:'pink'}} onClick={()=> setPopUp({...popUp, isOpen: false})}/>
                    </div><br/>
                    <span style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', fontSize:'16px'}}>
                        <p>You can add new vehicles or remove current vehicles of the selected courier</p>
                    </span>
                </DialogTitle>
                <DialogContent className={style['form-content']}>
                    <div className={style['exist-vehicle']}>
                        <p style={{color:'red', fontWeight:'bold'}}>Tap to Del -</p>
                        <div className={style['vehicle-list']}>
                            {popUp.vehicles.map((vehicle)=>{
                                return <div  key={vehicle} className={style['vehicle-checkbox']}>
                                    <Checkbox 
                                        indeterminate
                                        inputProps={{ 'aria-label': 'checkbox' }}
                                        defaultChecked={false}
                                        color="secondary"
                                        name="vehicles"
                                        value={vehicle}
                                        onChange={(e) => getValue(e)}
                                    />
                                    {<label>{vehicle}</label>}
                                    </div>
                            })}
                            <ErrorMessage name='vehicles'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                    </div>
                    <div className={style['exist-vehicle']}>
                        <p style={{color:'green', fontWeight:'bold'}}>Tap to Add +</p>
                        <div className={style['vehicle-list']}>
                            {otherVehicles.map((vehicle)=>{
                                return <div  key={vehicle} className={style['vehicle-checkbox']}>
                                    <Checkbox 
                                        
                                        defaultChecked={false}
                                        color="primary"
                                        name="vehicles"
                                        value={vehicle}
                                        onChange={(e) => getValue(e)}
                                    />
                                    {<label>{vehicle}</label>}
                                    </div>
                            })}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <button type='submit' className={style['button']}>Update</button>
                </DialogActions>
                </Form>
            
        </Dialog>
        </Formik>
    )
}

export default EditCourier
