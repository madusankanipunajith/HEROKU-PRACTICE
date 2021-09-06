import React from 'react'
import './css/Profile.css'
import * as Yup from 'yup' 
import { Formik, Form, Field, ErrorMessage } from 'formik'

function PasswordChange(props) {

    const oldPassword = props.password;
    const pwdRegex = props.pwdRegex;

    return (
        <Formik
            initialValues={{
                old_password: '',
                new_password: '',
                confirm_password: ''
            }}

            validationSchema={Yup.object({
                old_password : Yup.string().oneOf([oldPassword, null], 'Entered password did not match with your current password').required('Required'),
                new_password : Yup.string().matches(pwdRegex,'Password must have at least one capital letter and number').min(5,'Password should have at least 5 characters').required('Required'),
                confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').required('Required')
            })}

            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => { 
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                  resetForm();
                }, 1000);
              }}
        >
            
            <Form className='admin-update'>
            <h2>Change Your Password</h2>
            <div className="admin-update-item">
                <label htmlFor='Old Password'>Old Password</label>
                <Field className="admin-password-input" name='old_password' type="password" placeholder="Enter your current password"/>
                <ErrorMessage name='old_password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
            </div>
            <div className="admin-update-item">
                <label htmlFor='New Password'>New Password</label>
                <Field className="admin-password-input" name='new_password' type="password"/>
                <ErrorMessage name='new_password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
            </div>
            <div className="admin-update-item">
                <label htmlFor='Confirm Password'>Confirm Password</label>
                <Field className="admin-password-input" name='confirm_password' type="password"/>
                <ErrorMessage name='confirm_password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
            </div>
            <button type='submit' className="user-update-button">Change My Password</button>
            </Form>
        </Formik>
    )
}

export default PasswordChange
