import React,{useState} from 'react'
import style from './Login.module.css'
import avatar from '../../../assets/logo.jpeg'
import {Form, ErrorMessage, Formik, Field} from 'formik'
import * as Yup from 'yup'
import instance from '../../../axios/axios-config'
import LoginAlert from '../../layout/LoginAlert'


//var isvalid = true;
function Login() {
    const [alert, setAlert] = useState(false);
   
    return (
        <Formik
        initialValues={{
            email: '',
            password: ''
        }}

        validationSchema={Yup.object({
            email : Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
            instance().post('/auth',values).then((response)=>{
                if(response.data.auth && (response.data.authType===0)){
                    
                    window.location.href = window.location.pathname;
                    console.log(response.data);
                    console.log("Validation success");
                   
                }else{
                    alert("Login unsuccessfull");
                }
            }).catch((err)=>{
                console.log(err);   
                setAlert(true);             
                console.log(alert)
                
            })
            
            /**setTimeout(() => { 
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm();
            }, 1000); */
          }}
        >
            
            <div className={style['admin-login-body']}>
           
    
            <div className={style['admin-login-container']}>
            
            <img className={style['admin-avatar']} src={avatar} alt='admin-avatar'/>
            
            <h1>Admin Login</h1>
            {alert &&  <LoginAlert/>}
            <Form className={style['admin-form']}>
                <div className={style['admin-form-content']}>
                    <label>Email</label>
                    <Field type='email' name='email' className={style['login-input']}/>
                    <ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style['admin-form-content']}>
                    <label>Password</label>
                    <Field type='password' name='password' className={style['login-input']}/>
                    <ErrorMessage name='password'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                </div>
                <div className={style['admin-login-button']}>
                    <button type='submit'>Login</button>
                </div>
                <div className={style['lost-password']}>
                    {/**<Link to="#">Forgot Password</Link> */}
                    Forgot Password ?
                </div>
            </Form>
        </div>
          
        </div>
        </Formik>
    )
}

export default Login



/**<Alert show={invalid} variant="danger">
                    <Alert.Heading>Invalid User</Alert.Heading>
                    <p>Sorry! There is no admin for given inputs. Please check your email and password again<br/>
                     If you forgot your password don't worry, use the forgot password option. 
                     We will let you to come up with new password
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setInvalid(false)} variant="outline-success">
                            Okay
                        </Button>
                    </div>
                </Alert> */