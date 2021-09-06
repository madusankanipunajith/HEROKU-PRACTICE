import React from 'react'
import './css/Profile.css'
import Footer from '../../layout/Footer'
import * as Yup from 'yup' 
import { Formik, Form } from 'formik'
import {CustomeTextInput} from '../forms/CustomeTextInput'
import {CustomePhotoInput} from '../forms/CustomePhotoInput'


const ProfileData ={
    userName : 'Madusanka 990',
    fullName : 'Madusanka Nipunajith',
    birthDate : '1997-09-28',
    email : 'madushankanipunajith@gmail.com',
    address : '168/B Oruthota, Gampaha',
    Tel : ['0712081918', '0332233782'],
}

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;



function Profile(props) {

    return (
        <Formik
        initialValues={{
            username: "",
            fullname: "",
            birthday: "",
            email: "",
            address: "",
            tel1: "",
            tel2: "",
        }}

        validationSchema={Yup.object({
            username: Yup.string().min(3,'Must be at least 3 characters').required('Required'),
            fullname: Yup.string().required('Required'),
            birthday: Yup.date().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().required('Required'),
            tel1: Yup.string().matches(phoneRegex, 'Invalid phone number').required('Required'),
            tel2: Yup.string().matches(phoneRegex,'Invalid phone number'),
        })}

        onSubmit={(values, actions) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
                actions.resetForm();
            }, 1000);
        }}
        >
        <main>
        

        <div className="main-container">
            <div className="main-title">
                <img src={props.logo} alt="hello"/> 
                <div className="main-greeting">
                    <h1>Profile</h1>
                    <p>Welcome to your admin profile</p>
                </div>
            </div>
            <div className="profile-content">
                
                <div className="profile-content-left">
                    <h2>Your Profile Details</h2>
                    <div className="admin-show-top">
                        <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg" className="admin-show-img" alt=""/>
                        <div className="admin-show-top-title">
                            <span className="admin-show-username">Madusanka Nipunajith</span>
                            <span className="admin-show-title">Admin</span>
                        </div>
                    </div>

                    <div className="admin-show-bottom">
                        <span className="admin-show-bottom-title">Account Details</span>
                        <div className="admin-show-info">
                            <i className="fa fa-user"></i>
                            <span className="admin-show-info-title">{ProfileData.userName}</span>
                        </div>
                        <div className="admin-show-info">
                            <i className="fa fa-birthday-cake"></i>
                            <span className="admin-show-info-title">{ProfileData.birthDate}</span>
                        </div>
                        <div className="admin-show-info">
                            <i className="fa fa-envelope"></i>
                            <span className="admin-show-info-title">{ProfileData.email}</span>
                        </div>
                        <div className="admin-show-info">
                            <i className="fa fa-phone-square"></i>
                            <div className="tel-numbers">
                                <span className="admin-show-info-title">{ProfileData.Tel['0']}</span>
                                <span className="admin-show-info-title">{ProfileData.Tel['1']}</span>
                            </div>
                        </div>
                        <div className="admin-show-info">
                            <i className="fa fa-map-marker"></i>
                            <span className="admin-show-info-title">{ProfileData.address}</span>
                        </div>
                    </div>
                </div>


                <div className="profile-content-right">
                    <h2>Edit Profile</h2>
                <div className="admin-update">
                    
                    <div className="admin-update-form">
                        
                        
                        {formik =>(
                            <div className="admin-update-left">
                            <Form>
                                <CustomeTextInput label="User Name" name='username' type='text'/>
                                <CustomeTextInput label="Birth Day" type='date' name='birthday'/>
                                <CustomeTextInput label="Full Name" type='text' name='fullname'/>
                                <CustomeTextInput label="Email" type='email' name='email'/>
                                <CustomeTextInput label='Address' type='text' name='address'/>
                                <CustomeTextInput label="Phone Number" type='number' name='tel1'/>
                                <CustomeTextInput label="Phone Number (Optional)" type='number' name='tel2'/>

                                <div className="admin-update-right">
                                    <CustomePhotoInput id='file' type='file'/>
                                    <button type='submit' className="user-update-button">{formik.setSubmitting ? 'Loading...' : 'Submit'}</button>
                                </div>
                            </Form>
                            </div>
                        )}
                            
                        
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
        <Footer/>
        
        </main>
        </Formik>
    )
}

export default Profile