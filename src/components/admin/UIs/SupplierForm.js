import React,{useState} from 'react'
import style from './css/SupplierForm.module.css'
import  Checkbox from '@material-ui/core/Checkbox'
import Footer from '../../layout/Footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import instance from '../../../axios/axios-config';
import Notification from '../../layout/Notification'
import { useEffect } from 'react';

//const Materials = ['Silk', 'Polyester', 'Cotton', 'Velvet', 'Linen', 'Denim', 'Nylone'];
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


function SupplierForm(props) {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [material, setMaterial] =useState([]);
    const [Materials, setMaterials]= useState([]);

    useEffect(()=>{
        instance().get('/admin/materials').then((response)=>{
            const tempArray = response.data.map((obj)=>{return obj.name})
            setMaterials(tempArray);
        }).catch((e)=>{
            console.log(e);
        })
    },[])
    const getValue =(e)=>{
        let data = material
        let value = e.target.value;
        if(material.find(obj => obj === value)){
           let index = material.indexOf(value)
           if(index > -1){
               material.splice(index, 1)
           }
           console.log(material)
        }else{
            data.push(value)
            setMaterial(data)
            console.log(material)
        }

        
    }

    return (
        <Formik
        initialValues={{
            name: "",
            email: "",
            address: "",
            phone: "",
            mobile: "",
            terms: material
        }}

        validationSchema={Yup.object({
            name: Yup.string().trim().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().trim().required('Required'),
            phone: Yup.string().matches(phoneRegex, 'Invalid phone number').required('Required'),
            mobile: Yup.string().matches(phoneRegex, 'Invalid phone number'),    
            terms: Yup.array().min(1,'At least one raw material should be selected')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
            var supplierSchema={
                company_name:String,
                email:String,
                contact_person:String,
                telephone:Array,
                address: String,
                materials:Object,
                status:Number
            }
  
            supplierSchema.company_name = values.name
            supplierSchema.email = values.email
            supplierSchema.telephone = [values.phone, values.mobile]
            supplierSchema.address = values.address
            supplierSchema.materials = Object.assign({}, values.terms)
            supplierSchema.status = 1

            instance().post('admin/addsupplier', supplierSchema).then((response)=>{
                if(response.data.success){
                    setSubmitting(false);
                    resetForm();
                    setNotify({isOpen: true, message:'Supervisor Added Succesfully', type:'success'})
                }else{
                    setNotify({isOpen: true, message:'There is an supplier with this email. Try again using another email', type:'error'})
                }
            }).catch((err)=>{
                console.log(err)
            })

            
        }}
        >
            <div className={style['supplier-form-main']}>
            <div className={style['supplier-form-main-container']}>
                <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Supplier's Form</h1>
                        <p>You can add Suppliers to the system</p>
                    </div>
                </div>

                <div className={style['supplier-form-content']}>
                    
                        <Form>
                        <h2>Supplier Info...</h2>
                        <div className={style['supplier-add-item']}>
                            <label className={style['supplier-form-label']}>Supplier's Name</label>
                            <Field type='text' name='name' placeholder="Sunimal Textiles Pvt.Ltd" className={style['supplier-add-input']}/>
                            <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supplier-add-item']}>
                            <label className={style['supplier-form-label']}>Supplier's Email</label>
                            <Field type='email' name='email' placeholder="Sunimal Textiles Pvt.Ltd" className={style['supplier-add-input']}/>
                            <ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supplier-add-item']}>
                            <label className={style['supplier-form-label']}>Supplier's Address</label>
                            <Field type='text' name='address' placeholder="Sunimal Textiles Pvt.Ltd" className={style['supplier-add-input']}/>
                            <ErrorMessage name='address'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div className={style['supplier-add-item']}>
                            <label className={style['supplier-form-label']}>Supplier's Contacts</label>
                            <div className={style['supplier-contact']}>
                                <div className={style['supplier-phone']}>
                                    <Field type='text' name='phone' placeholder="033-2233782" className={style['supplier-add-input']}/>
                                    <ErrorMessage name='phone'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                                </div>
                                <div className={style['supplier-mobile']}>
                                    <Field type='text' name='mobile' placeholder="Optional contact" className={style['supplier-add-input']}/>
                                    <ErrorMessage name='mobile'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                                </div>
                            </div>
                        </div>
                        <h2>Materials...</h2>
                        <div className={style['material-container']}>
                           
                                {Materials.map((material)=>{
                                    return(
                                        
                                        <div key={material} className={style['material-content']}>
                                        <Checkbox color='primary' name='terms' value={material}  onChange={(e)=> getValue(e)}/>
                                        <label>{material}</label>
                                        
                                        </div>
                                        
                                       
                                    )
                                })}
                                
                            
                        </div>
                        <ErrorMessage name='terms'>{ msg => <div style={{ color: 'red', textAlign: 'center' }}>{msg}</div> }</ErrorMessage>
                        <div className={style['supplier-button']}>
                            <button type='submit' className={style['supplier-add-button']}>Add Supplier</button>
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

export default SupplierForm
