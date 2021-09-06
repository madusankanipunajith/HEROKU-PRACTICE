import React from "react";
import style from "./css/EditSupplier.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Footer from "../../layout/Footer";
import instance from "../../../axios/axios-config";
import Notification from '../../layout/Notification';
import {Form, ErrorMessage, Formik, Field} from 'formik';
import * as Yup from 'yup'

const Materials = [];

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


function EditSupplier(props) {
  let {id} = useParams();
  const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
  var otherTerms = [];
 // const materials = Materials;
  const [materials, setMaterials] = useState(Materials)
  const [supplier, setSupplier] = useState({});
  const [terms, setTerms] = useState([]);
  


  /**const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevState) => ({
      ...prevState,
      [name]: value,
    })); */

    //console.log(supplier.name);
  


  useEffect(() => {
   
    instance().get(`/admin/viewsupplier/${id}`).then((response)=>{
      
      if(response.data.notFound){
        console.log("Sorry you can't update");
        setNotify({isOpen: true, message:'Sorry there is no user available with this identity', type:'error'})
        setTimeout(() => {
          window.location.href = window.location.origin+'/admin/suppliers';
        }, 2000);
      }else{
        
        var sup={
          id:String,
          name:String,
          address:String,
          email:String,
          telephone:String,
          mobile:String,
          terms:Array
        }
        sup.id = response.data._id;
        sup.name = response.data.company_name;
        sup.address = response.data.address;
        sup.email = response.data.email;
        sup.telephone = response.data.telephone[0];
        sup.mobile = response.data.telephone[1];
        sup.terms = Object.values(response.data.materials);
      }

      setSupplier(sup);
      setTerms(sup.terms);
     
      
    }).catch((e)=>{
      console.log(e);
      setNotify({isOpen: true, message:'You cannot change ID format', type:'error'})
      setTimeout(() => {
        window.location.href = window.location.origin+'/admin/suppliers';
      }, 2000);
    })


    instance().get('/admin/materials').then((response)=>{
      const tempArray = response.data.map((obj)=>{return obj.name})
      setMaterials(tempArray);
    }).catch((e)=>{
      console.log(e);
    })
   
  }, [id])

  otherTerms = materials.filter(function (e) {
    return this.indexOf(e) < 0;
  }, terms);

  const getValue = (e) => {
    let data = terms;
    let value = e.target.value;
    if (terms.find((obj) => obj === value)) {
      let index = terms.indexOf(value);
      if (index > -1) {
        terms.splice(index, 1);
      }
      console.log(terms);
    } else {
      data.push(value);
      setTerms(data);
      console.log(terms);
    }

    
  };

 
  const supData={
    name:  supplier.name,
    email: supplier.email,
    address: supplier.address,
    telephone: supplier.telephone,
    mobile: supplier.mobile,
    
  }
  console.log(supData.name)
  return (
    <Formik
    enableReinitialize
    initialValues={{
      name: supplier.name || '',
      email: supplier.email || '',
      address: supplier.address || '',
      phone: supplier.telephone || '',
      mobile: supplier.mobile || '',
      terms: terms || []
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
      telephone:Array,
      address: String,
      materials:Object
  }

  supplierSchema.company_name = values.name
  supplierSchema.email = values.email
  supplierSchema.telephone = [values.phone, values.mobile]
  supplierSchema.address = values.address
  supplierSchema.materials = Object.assign({}, values.terms)

  console.log(supplierSchema);
  setSubmitting(false);
  
  
  instance().patch(`/admin/editsupplier/${id}`, supplierSchema).then((response)=>{
    console.log(response.data);
    if(response.data.success){
      setNotify({isOpen: true, message:'Making changes....', type:'success'})
      setTimeout(()=>{

        setInterval(()=>{
          setNotify({isOpen: true, message:'Supplier updated successfully', type:'success'})
        },800);
        
        setTimeout(()=>{
          window.location.href = window.location.origin+'/admin/supplier/edit/'+id;
        },800);
        
      },1200)
    }else{
      setNotify({isOpen: true, message:'Sorry! already there is a supplier with given email address', type:'error'})
    }
  }).catch((e)=>{
    console.log(e);
  })

  }}
    
    >
      <div className={style["edit-supplier-main"]}>
      <div className={style["edit-supplier-main-container"]}>
        <div className="main-title">
          <img src={props.logo} alt="hello" />
          <div className="main-greeting">
            <h1>Edit Sunimal.Pvt.Ltd</h1>
            <p>You can edit selected supplier details</p>
          </div>
          <div className={style["back"]}>
            <Link to="/admin/suppliers">
              <p>{"<-"} Back to suppliers list</p>
            </Link>
          </div> 
        </div>
        <div className={style["back-responsive"]}>
          <Link to="/admin/suppliers">
            <p>{"<-"} Back to suppliers list</p>
          </Link>
        </div>
        <Form>
          <div className={style["supplier-form-content"]}>
            <div className={style["form-left"]}>
              <h2>Personal Information</h2>

              <div className={style["personal-info"]}>
                <div className={style["supplier-add-item"]}>
                  <label>Supplier Name</label>
                  <Field
                    className={style["supplier-add-input"]}
                    name="name"
                    type='text'
                  />
                   <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style["supplier-add-item"]}>
                  <label>Supplier Email</label>
                  <Field
                    className={style["supplier-add-input"]}
                    name="email"
                    type='text'
                  
                  />
                   <ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style["supplier-add-item"]}>
                  <label>Supplier Address</label>
                  <Field
                    className={style["supplier-add-input"]}
                    name="address"
                    type='text'
                   
                  />
                   <ErrorMessage name='address'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style["supplier-add-item"]}>
                  <label>Supplier Telephone</label>
                  <Field
                    className={style["supplier-add-input"]}
                    name="phone"
                    type='text'
                    
                  />
                   <ErrorMessage name='phone'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style["supplier-add-item"]}>
                  <label>Supplier Telephone (Optional)</label>
                  <Field
                    className={style["supplier-add-input"]}
                    name="mobile"
                    type='text'
                    
                  />
                   <ErrorMessage name='mobile'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
              </div>
              <div className={style["material-info"]}>
                <h2>Materials</h2>
                <div className={style["material-items"]}>
                  {terms.map((term) => {
                    return <p key={term}>{term}</p>;
                  })}
                </div>
              </div>
            </div>
            <div className={style["form-right"]}>
              <div className={style["form-right-content"]}>
                <div className={style["already-items"]}>
                  <div className={style["message"]}>
                    <h2>Provided Materials</h2>
                    <p style={{ color: "red" }}>Tap to Del-</p>
                  </div>
                  {terms.map((term) => {
                    return (
                      <div key={term} className={style["items"]}>
                        <Checkbox
                          defaultChecked={false}
                          color="secondary"
                          name="terms"
                          value={term}
                          onChange={(e) => getValue(e)}
                        />
                        <label>{term}</label>
                      </div>
                    );
                  })}
                </div>

                <div className={style["supposed-items"]}>
                  <div className={style["message"]}>
                    <h2>Other Materials</h2>
                    <p style={{ color: "green" }}>Tap to Add+</p>
                  </div>
                  {otherTerms.map((term) => {
                    return (
                      <div key={term} className={style["items"]}>
                        <Checkbox
                          color="primary"
                          name="terms"
                          value={term}
                          onChange={(e) => getValue(e)}
                        />
                        <label>{term}</label>
                      </div>
                    );
                  })}
                </div>
                
              </div>
              <ErrorMessage name='terms'>{ msg => <div style={{ color: 'red', textAlign: 'center' }}>{msg}</div> }</ErrorMessage>
              <div className={style["button-wrapper"]}>
                <button type="submit" className={style["button"]}>Update</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <Notification notify={notify} setNotify={setNotify}/>
      <Footer/>
    </div>
    </Formik>
  );
}


export default EditSupplier;
