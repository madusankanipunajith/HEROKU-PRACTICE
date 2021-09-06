import React,{useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core'
import {Form, ErrorMessage, Formik, Field} from 'formik'
import Notification from '../../layout/Notification'
import * as Yup from 'yup'
import CancelIcon from '@material-ui/icons/Cancel';
import style from '../../admin/UIs/css/ProductForm.module.css';
import instance from '../../../axios/axios-config';
import  Checkbox from '@material-ui/core/Checkbox'


import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginImageValidateSize)

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function MaterialForm(props) {

    const [notify, setNotify] = useState({isOpen: false, message:'', type:''});
    const {popUp, setPopUp} = props;
    const [colors, setColors] = useState([]);
    const [itemColor, setItemColor] =useState([]);

    const [files, setFiles] = useState([{
        source: 'http://localhost:5000/files/logo.png',
    },
    ])

    const getValue =(e)=>{
        let data = itemColor
        let value = e.target.value;
        if(itemColor.find(obj => obj === value)){
           let index = itemColor.indexOf(value)
           if(index > -1){
            itemColor.splice(index, 1)
           }
           console.log(itemColor)
        }else{
            data.push(value)
            setItemColor(data)
            console.log(itemColor)
        }

        
    }

    useEffect(() => {
        instance().get('/admin/colors').then((response)=>{

            setColors(response.data);
        }).catch((e)=>{
            console.log(e);
        })
       
    }, [])

    return (
        <Formik
        initialValues={{
            name: "",
            pno: "",
            description: "",
            price: "",
            terms: itemColor,
            level:"",
            units: 0
        
        }}


        validationSchema={Yup.object({
            
            name: Yup.string().trim().required('Required'),
            level: Yup.number().required('Required'),  
            description: Yup.string().trim().required('Required'),
            terms: Yup.array().min(1,'At least one color should be selected'),
            price: Yup.number().typeError('Please enter a valid amount').positive('Cannot be a negative number').required('Please enter an amount').test(
                "onlyNumbers",
                "only numbers please",
                (value) => /^[0-9]*$/
            ),  
            units: Yup.number()
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
           /** var materialSchema={
                name:String,
                colors:Array,
                description:String,
                type:Number,
                level:Number,
                units:Number,
                img:String,
                price:Number
            }

            materialSchema.name = capitalizeFirstLetter(values.name);
            materialSchema.level = values.level;
            materialSchema.type = 2;
            materialSchema.units = values.units;
            materialSchema.description = values.description;
            materialSchema.colors = [];
            for(let i=0; i< values.terms.length; i++){
                materialSchema.colors.push({color: values.terms[i], quantity: 0});
            }
           
            materialSchema.price = values.price; */
             
            var colorArray = [];
            for(let i=0; i< values.terms.length; i++){
                colorArray.push({color: values.terms[i], quantity: 0})
            }

            var formData = new FormData();
            var file = new File([files[0].file], files[0].filename); 
            console.log(files[0]);

            formData.append('name', capitalizeFirstLetter(values.name))
            formData.append('level', values.level)
            formData.append('units', values.units)
            formData.append('type', 2)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('colors', JSON.stringify(colorArray))
            formData.append('file', file)

            instance().post('admin/addwarehouse',formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{

                if(response.data.already){
                    setNotify({isOpen: true, message:'There is a Product with this Material name', type:'error'})   
                }else{
                    setSubmitting(false);
                    resetForm();
                    setItemColor([]);
                    setNotify({isOpen: true, message:'Raw Material Added Succesfully', type:'success'})

                    setTimeout(()=>{
                        setPopUp({...popUp, isOpen: false})
                    },2000)
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
            </div>
            </DialogTitle>
            <DialogContent>
                
                <div className={style['form-content']}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <div>
                            <label className={style['product-form-label']}>Material's Name</label>
                            <Field className={style['product-add-input']} name="name" type='text'/>
                            <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div>
                            <label className={style['product-form-label']}>Material's Price (Rs)</label>
                            <Field className={style['product-add-input']} name="price" type='text'/>
                            <ErrorMessage name='price'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                       
                        <div>
                        <label className={style['product-form-label']}>Material's Level (Min)</label>
                            <Field className={style['product-add-input']} name="level" type='number'/>
                            <ErrorMessage name='level'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        
                       
                        <div>
                        <label className={style['product-form-label']}>Material's Description</label>
                            <Field className={style['product-add-textarea']} name="description" as='textarea' />
                            <ErrorMessage name='description'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                       
                        <div style={{marginTop:'20px'}}>
                        <label  className={style['product-form-label']}>Material's Image</label><br/>
                            {/**<Field className={style['product-form-input']} name="image" type='file'/>
                            <ErrorMessage name='image'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage> */}
                                <div className={style['image-responsive']}>
                                <FilePond
                                    required
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    maxFiles={1}
                                    name="files" 
                                    maxFileSize={'5MB'}
                                    acceptedFileTypes={['image/*']}
                                    labelIdle='Drag and Drop your files or <span class="filepond--label-action">Browse</span>'
                                />  
                                </div>
                        </div>
                    </div>
                    <div className={style['product-img']}>
                    <label className={style['product-form-label']}>Matirial's Colors</label>
                        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
                            {colors.map((color)=>{
                                   return <Checkbox key={color._id} style={{color:`${color.color}`}} name='terms' value={color.color} onChange={(e)=> getValue(e)}/>
                                })}
                        </div>
                        <ErrorMessage name='terms'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                    </div>
                </div>
                
            </DialogContent>
            <DialogActions style={{display:'revert'}}>
                <center>

                <button style={
                {width:'100px', height:'50px', padding: '5px', border:'none', borderRadius: '5px', backgroundColor: 'lightgreen', cursor: 'pointer'}
                } type='submit'>Submit</button>  
                
                </center>
                
            </DialogActions>
            </Form>
            <Notification notify={notify} setNotify={setNotify}/>
        </Dialog>
        </Formik>
    )
}

export default MaterialForm
