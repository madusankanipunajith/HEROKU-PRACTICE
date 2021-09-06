import React,{useState, useEffect} from 'react'
import './css/Profile.css'
import Footer from '../../layout/Footer'
import * as Yup from 'yup' 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Moment from 'moment';
import PasswordChange from './PasswordChange'
import instance from '../../../axios/axios-config'
import Notification from '../../layout/Notification'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType,FilePondPluginImageValidateSize)

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

var prev_file;

function Profile(props) {
    const [files, setFiles] = useState([
        {
            source: 'http://localhost:5000/files/logo.png',
        },
        ])

    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    const [userData, setUserData] = useState([])
    const [toggleState, setToggleState] = useState(true)
    const [birthDate, setBirthDate] = useState(new Date());
    
    useEffect(()=>{
        instance().get('admin/profile').then((response)=>{
            setUserData(response.data)
            setFiles([{source:  window.image_path_admin+response.data.img}])
            setBirthDate(new Date(response.data.dob))
            console.log(response.data.img);
        }).catch((err)=>{
            console.log(err)
        })
    },[toggleState])

    //console.log(files[0]);

    const ProfileData ={
        userName : userData.username,
        fullName : userData.fName + ' '+ userData.lName,
        birthDate : new Date(userData.dob),
        email : userData.email,
        address : userData.address,
        Tel : [userData.telephone, userData.mobile],
        password: userData.password,
        month: new Date(userData.dob).getMonth()+1,
        img: window.image_path_admin+userData.img || 'http://localhost:5000/files/logo.png'
    }
    return (
        <Formik
        enableReinitialize
        initialValues={{
            username: ProfileData.userName || '',
            birthday: Moment(ProfileData.birthDate).format('YYYY-MM-DD') || '',
            fullname: ProfileData.fullName || '',
            email: ProfileData.email || '',
            address: ProfileData.address || '',
            tel1: ProfileData.Tel[0] || '',
            tel2: ProfileData.Tel[1] || '',
            files: ProfileData.img
        }}

        validationSchema={Yup.object({
            username: Yup.string().trim().min(3,'Must be at least 3 characters').required('Required'),
            //birthday: Yup.date().required('Required').max(Moment(new Date()).format('YYYY-MM-DD'), "You can't be born in the future!"),
            fullname: Yup.string().trim().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().trim().required('Required'),
            tel1: Yup.string().matches(phoneRegex,'Invalid phone number').required('Required'),
            tel2: Yup.string().matches(phoneRegex,'Invalid phone number'),
            files: Yup.mixed().required('Required')
        })}

        onSubmit={(values, { setSubmitting }) => {
           
            var formData = new FormData();
            
            var file = new File([files[0].file], files[0].filename);
            

            if(file.name === 'undefined'){
                console.log('Oops');
                file = prev_file;
            }else{
                console.log(file.name);
                prev_file = file;
            }
            

            formData.append('fName', capitalizeFirstLetter(values.fullname.split(' ')[0]))
            var last_name=''; if(values.fullname.split(' ')[1]) {last_name = capitalizeFirstLetter(values.fullname.split(' ')[1])}
            formData.append('lName', last_name)
            formData.append('email', values.email)
            formData.append('telephone', values.tel1)
            formData.append('mobile', values.tel2)
            formData.append('address', values.address)
            formData.append('username', values.username)
            formData.append('dob', birthDate)
            formData.append('file', file)

            
            
             instance().post('/admin/profile/update', formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{
                 
                if(response.data.already){
                    setNotify({isOpen: true, message:'Given email has an account already', type:'error'})
                }else{

                    setToggleState(!toggleState);
                    setNotify({isOpen: true, message:'Profile updated', type:'success'})
                } 
            }).catch((err)=>{
                console.log(err);
            })    
              
              //alert(JSON.stringify(values, null, 2));
              //setSubmitting(false);
            
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
                    
                        <img src={ProfileData.img} className="admin-show-img" alt="profile images"/>

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
                            <i className="fa fa-podcast"></i>
                            <span className="admin-show-info-title">{ProfileData.fullName}</span>
                        </div>
                        <div className="admin-show-info">
                            <i className="fa fa-birthday-cake"></i>
                            <span className="admin-show-info-title">{ProfileData.birthDate.getFullYear()+'-'+ProfileData.month +'-'+ProfileData.birthDate.getDate()}</span>
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
                    
                    <Form className="admin-update-form">
                        <div className="admin-update-left">
                            <div className="admin-update-item">
                                <label htmlFor='User name'>User Name</label>
                                <Field className="admin-update-input" name='username' type="text" />
                                <ErrorMessage name='username'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            
                            <div className="admin-update-item">
                                <label htmlFor='Full Name'>Full Name</label>
                                <Field className="admin-update-input" name='fullname' type="text" />
                                <ErrorMessage name='fullname'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className="admin-update-item">
                                <label htmlFor='Birth Day'>Birth Day</label>
                               {/** <Field className="admin-update-input" name='birthday' type="date"/> */}
                                <DatePicker name='birthday' className="admin-update-input" selected={birthDate} onChange={(date) => setBirthDate(date)} required maxDate={new Date()}/>
                                <ErrorMessage name='birthday'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className="admin-update-item">
                                <label htmlFor='Email'>Email</label>
                                <Field className="admin-update-input" name='email' type="email" />
                                <ErrorMessage name='email'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className="admin-update-item">
                                <label htmlFor='Address'>Address</label>
                                <Field className="admin-update-input" name='address' type="address" />
                                <ErrorMessage name='address'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className="admin-update-item">
                                <label>Phone Number</label>
                                <Field className="admin-update-input" name='tel1' type="text" />
                                <ErrorMessage name='tel1'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className="admin-update-item">
                                <label>Phone Number (Optional)</label>
                                <Field className="admin-update-input" name='tel2' type="text" />
                                <ErrorMessage name='tel2'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                        </div>
                        <div className="admin-update-right">
                            <div className="admin-update-upload">

                                <div className="admin-update-img">
                                <FilePond
                                    required
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    maxFileSize={'5MB'}
                                    name="files"
                                    className='custom-file-pond'
                                    acceptedFileTypes={['image/*']}
                                    labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                                </div>
                                <ErrorMessage name='files'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <button type='submit' className="user-update-button">Update User</button>
                        </div>
                    </Form>
                </div>
                </div>
            </div>
        </div>

        <div className='admin-password-change'>
            <PasswordChange pwdRegex ={pwdRegex} password ={ProfileData.password}/>
            
        </div>
        <Notification notify={notify} setNotify={setNotify}/>
        <Footer/>
        
        </main>
        </Formik>
    )
}

export default Profile
