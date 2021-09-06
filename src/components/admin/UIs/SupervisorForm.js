import React,{useState} from 'react'
import style from './css/SupervisorForm.module.css'
import * as Yup from 'yup' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Moment from 'moment'
import Notification from '../../layout/Notification'
import Footer from '../../layout/Footer'
import instance from '../../../axios/axios-config'

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function SupervisorForm(props) {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    return (
        <Formik
        initialValues={{
            name: "",
            birthday: Moment(new Date('1997-09-28')).format('YYYY-MM-DD'),
            email: "",
            address: "",
            phone: "",
            mobile: "",
            password: "",
            confirmation: ""
        }}

        validationSchema={Yup.object({
            name: Yup.string().trim().min(3,'Must be at least 3 characters').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().trim().required('Required'),
            birthday: Yup.date().required('Required').max(new Date(), "He or She can't be born in the future!"),
            phone: Yup.string().matches(phoneRegex, 'Invalid phone number').required('Required'),
            mobile: Yup.string().matches(phoneRegex,'Invalid phone number'),
            password: Yup.string().matches(pwdRegex,'Password must have at least one capital letter and number').min(5,'Password should have at least 5 characters').required('Required'),
            confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
            var superSchema = {
                fName:String,
                lName:String,
                email:String,
                password:String,
                mobile:String,
                telephone:String,
                address: String,
                usertype:Number,
                dob:Date
            }

            superSchema.fName = capitalizeFirstLetter(values.name.split(' ')[0])
            if(values.name.split(' ')[1]){
                superSchema.lName = capitalizeFirstLetter(values.name.split(' ')[1]);
            }else{
                superSchema.lName = ''
            }
            
            superSchema.email = values.email
            superSchema.password = values.password
            superSchema.mobile = values.phone
            superSchema.telephone = values.mobile
            superSchema.address = values.address
            superSchema.dob = Moment(new Date(values.birthday)).format('YYYY-MM-DD')

            instance().post('/admin/addsupervisor', superSchema).then((response)=>{
                if(response.data.success){
                    setSubmitting(false);
                    resetForm();
                    setNotify({isOpen: true, message:'Supervisor Added Succesfully', type:'success'})
                }else{
                    setNotify({isOpen: true, message:'There is a user with this email. please use a new one', type:'error'})
                }
                
            }).catch((err)=>{
                console.log(err)
            })
            /**setTimeout(() => {
              console.log('Hi');
              values.name = capitalizeFirstLetter(values.name);  
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm();
              setNotify({isOpen: true, message:'Supervisor Added Succesfully', type:'success'})
            }, 1000); */
          }}
        >


        <div className={style['supervisor-form-main']}>
            <div className={style['supervisor-form-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Supervisor's Form</h1>
                        <p>You can add Supervisors to the system</p>
                    </div>
                </div>

                <div className={style['supervisor-form-content']}>
                    <h2>Supervisor Form</h2>
                    <Form className={style['supervisor-form']}>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Supervisor Name' className={style['supervisor-form-label']}>Supervisor Name</label>
                            <Field type="text" placeholder="annaback 99" name='name' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Birth Day' className={style['supervisor-form-label']}>Birth Day</label>
                            <Field type="date" name='birthday' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='birthday'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Email' className={style['supervisor-form-label']}>Email</label>
                            <Field type="email" placeholder="annaback@gmail.com" name='email' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='email' >{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Home Address' className={style['supervisor-form-label']}>Home Address</label>
                            <Field type="text" placeholder="168/B, Oruthota, Gampaha" name='address' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='address'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Mobile' className={style['supervisor-form-label']}>Mobile</label>
                            <Field type="text" placeholder="071-208-9456" name='phone' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='phone'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Mobile (Optional)' className={style['supervisor-form-label']}>Mobile (Optional)</label>
                            <Field type="text" placeholder="033-223-3782" name='mobile' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='mobile'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Password' className={style['supervisor-form-label']}>Password</label>
                            <Field type="password" placeholder="***" name='password' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supervisor-add-item']}>
                            <label htmlFor='Confirm Password' className={style['supervisor-form-label']}>Confirm Password</label>
                            <Field type="password" placeholder="***" name='confirmation' className={style['supervisor-add-input']}/>
                            <ErrorMessage name='confirmation'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>

                        <div className={style['supervisor-add-item']}>
                            <button type='submit' className={style['supervisor-add-button']}>Add Supervisor</button>
                        </div>
                    </Form>
                </div>
                <Notification notify={notify} setNotify={setNotify}/>
            </div>
            <Footer/>
        </div>
        </Formik>
    )
}

export default SupervisorForm
