import React,{useState} from 'react'
import style from './css/QuriorForm.module.css'
import  Checkbox from '@material-ui/core/Checkbox'
import Footer from '../../layout/Footer'
import {Form, ErrorMessage, Formik, Field} from 'formik'
import Notification from '../../layout/Notification'
import * as Yup from 'yup'
import instance from '../../../axios/axios-config'

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function QuriorForm(props) {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [vehicle, setVehicle] =useState([]);
    const getValue =(e)=>{
        let data = vehicle
        let value = e.target.value;
        if(vehicle.find(obj => obj === value)){
           let index = vehicle.indexOf(value)
           if(index > -1){
               vehicle.splice(index, 1)
           }
           console.log(vehicle)
        }else{
            data.push(value)
            setVehicle(data)
            console.log(vehicle)
        }

        
    }

    return (
        <Formik 
        initialValues={{
            orgname: "",
            email: "",
            address: "",
            phone: "",
            mobile: "",
            password: "",
            confirmation: "",
            terms: vehicle
        }}

        validationSchema={Yup.object({
            orgname: Yup.string().trim().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().trim().required('Required'),
            phone: Yup.string().matches(phoneRegex, 'Invalid phone number').required('Required'),
            mobile: Yup.string().matches(phoneRegex, 'Invalid phone number'),    
            password: Yup.string().matches(pwdRegex,'Password must have at least one capital letter, simple letter and number').min(5,'Password should have at least 5 characters').required('Required'),
            confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
            terms: Yup.array().min(1,'At least one vehicle should be selected')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
            var quriorSchema={
                fName:String,
                lName:String,
                email:String,
                password:String,
                mobile:String,
                telephone:String,
                address: String,
                usertype:Number,
                vehicles:Array
            }
  

            quriorSchema.fName = capitalizeFirstLetter(values.orgname.split(' ')[0]); 
            if(values.orgname.split(' ')[1]){
                quriorSchema.lName = capitalizeFirstLetter(values.orgname.split(' ')[1]);
            }else{
                quriorSchema.lName = ''
            }
            quriorSchema.email = values.email
            quriorSchema.password = values.password
            quriorSchema.telephone = values.phone
            quriorSchema.mobile = values.mobile
            quriorSchema.address = values.address
            quriorSchema.vehicles = values.terms

            instance().post('/admin/addcourier', quriorSchema).then((response)=>{
                if(response.data.success){
                    setSubmitting(false);
                    resetForm();
                    setNotify({isOpen: true, message:'Qourier Added Succesfully', type:'success'})
                }else{
                    setNotify({isOpen: true, message:'Sorry! alreay there is a user with this email address', type:'error'})
                }
               

            }).catch((err)=>{
                console.log(err)
            })
            /**setTimeout(() => { 
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm();
            }, 1000); */
          }}
        >
        <div className={style['qurior-form-main']}>
            <div className={style['qurior-form-main-container']}>
                
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Courier's Form</h1>
                        <p>You can add Couriers to the system. You have to fill both sides of the form</p>
                    </div>
                </div>

                <Form className={style['qurior-form']}>
                    <div className={style['qurior-form-content']}>
                        <div className={style['qurior-form-left']}>
                        <h2>Organizational Informations</h2><br/>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Organization's Name</label>
                                <Field type='text' name='orgname' placeholder="Sunimal Delivers Pvt.Ltd" className={style['qurior-add-input']}/>
                                <ErrorMessage name='orgname'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Organization's Address</label>
                                <Field type='text' name='address' placeholder="168/B, Oruthota, Gampaha" className={style['qurior-add-input']}/>
                                <ErrorMessage name='address'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Organization's email</label>
                                <Field type='email' name='email' placeholder="sunimal@gmail.com" className={style['qurior-add-input']}/>
                                <ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Official Contacts</label>
                                <Field type='text' name='phone' placeholder="033-223-6789 or 0332233782" className={style['qurior-add-input']}/>
                                <ErrorMessage name='phone'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Official Contacts (Optional)</label>
                                <Field type='text' name='mobile' placeholder="033-223-6789 or 0332233782" className={style['qurior-add-input']}/>
                                <ErrorMessage name='mobile'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                                <label className={style['qurior-form-label']}>Password</label>
                                <Field type='password' name='password' placeholder="***" className={style['qurior-add-input']}/>
                                <ErrorMessage name='password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['qurior-add-item']}>
                            <label className={style['qurior-form-label']}>Confirm Password</label>
                                <Field type='password' name='confirmation' placeholder="***" className={style['qurior-add-input']}/>
                                <ErrorMessage name='confirmation'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                        </div>
                        <div className={style['qurior-form-right']}>
                        <h2>Organization's Vehicles</h2><br/>
                            <div className={style['qurior-form-right-item']}>
                                <Checkbox color='primary' name='terms' value='Motorbike' onChange={(e)=> getValue(e)}/>
                                <label>Motor Bikes</label>
                            </div>
                            <div className={style['qurior-form-right-item']}>
                                <Checkbox color='primary' name='terms' value='Car' onChange={(e)=> getValue(e)}/>
                                <label>Cars</label>
                            </div>
                            <div className={style['qurior-form-right-item']}>
                                <Checkbox color='primary' name='terms' value='Van' onChange={(e)=> getValue(e)}/>
                                <label>Vans</label>
                            </div>
                            <div className={style['qurior-form-right-item']}>
                                <Checkbox color='primary' name='terms' value='Lorry' onChange={(e)=> getValue(e)}/>
                                <label>Lorries</label>
                            </div>
                            <div className={style['qurior-form-right-item']}>
                                <Checkbox color='primary' name='terms' value='Threewheel' onChange={(e)=> getValue(e)}/>
                                <label>Threewheels</label>
                            </div>
                            <ErrorMessage name='terms'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>                            
                            
                            <div className={style['qurior-button']}>
                                <button type='submit' className={style['qurior-add-button']}>Add Courier</button>
                            </div>
                        </div>
                    
                    </div>
                </Form>
                <Notification notify={notify} setNotify={setNotify}/>
            </div>
            <Footer/>
        </div>
        </Formik>
    )
}

export default QuriorForm
