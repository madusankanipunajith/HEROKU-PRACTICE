import React,{useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
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


const pnoRegex = /^[a-zA-Z]{3}[ ][0-9]{3,5}$/

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

function ProductForm(props) {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''});
    const {popUp, setPopUp} = props;
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
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

        const fetchData = async() =>{

            const response_1 = await instance().get('/admin/colors');
            const response_2 = await instance().get('/admin/materials');

            setColors(response_1.data);
            setMaterials(response_2.data);
            
        }

        fetchData();
        
       
    }, [])

   
    return (
        <Formik
        initialValues={{
            name: "",
            pno: "",
            description: "",
            price: "",
            category: "",
            terms: itemColor,
            material: ""
        }}


        validationSchema={Yup.object({
            
            name: Yup.string().trim().required('Required'),
            category: Yup.string().trim().required('Required'),
            price: Yup.number().typeError('Please enter a valid amount').positive('Cannot be a negative number').required('Please enter an amount').test(
                    "onlyNumbers",
                    "only numbers please",
                    (value) => /^[0-9]*$/
            ),
            material: Yup.string().required('Required'),  
            pno: Yup.string().trim().required('Required').matches(pnoRegex,'Invalid Product Number'),
            description: Yup.string().trim().required('Required'),
            terms: Yup.array().min(1,'At least one color should be selected')
        })}

        onSubmit={(values, { setSubmitting, resetForm }) => {
            /**var productSchema={
                name:String,
                category:String,
                rating:Number,
                price:Number,
                colors:Array,
                description:String,
                img:String,
                material:String,
                type:Number,
                pno:String,
                file:Object
            }

            productSchema.name = capitalizeTheFirstLetterOfEachWord(values.name);
            productSchema.pno = values.pno.toUpperCase();
            productSchema.type = 1;
            productSchema.rating = 0;
            productSchema.category = values.category;
            productSchema.description = values.description;
            productSchema.colors = values.terms;
            productSchema.price = values.price;
            productSchema.material = values.material;
            productSchema.file = files[0].file */

            var colorArray = [];
            var sizeArray = [];
            for(let i=0; i< values.terms.length; i++){
                colorArray.push(values.terms[i])
            }

            for(let i=0; i< values.terms.length; i++){
                var size ={
                    color: String,
                    qty: Number
                }
                size.color = values.terms[i];
                size.qty = 0;
                sizeArray.push(size)
            }

            var formData = new FormData()
            var file = new File([files[0].file], files[0].filename)
            console.log(files[0]);

            formData.append('name', capitalizeTheFirstLetterOfEachWord(values.name))
            formData.append('pno', values.pno.toUpperCase())
            formData.append('material',values.material)
            formData.append('type', 1)
            formData.append('rating', 0)
            formData.append('stock', 0)
            formData.append('description', values.description)
            formData.append('price', values.price)
            formData.append('category', values.category)
            formData.append('colors', JSON.stringify(colorArray))
            formData.append('file', file)

            formData.append('sm', JSON.stringify(sizeArray))
            formData.append('m', JSON.stringify(sizeArray))
            formData.append('l', JSON.stringify(sizeArray))
            formData.append('xl', JSON.stringify(sizeArray))
            formData.append('xxl', JSON.stringify(sizeArray))

            instance().post('admin/addwarehouse',formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{

                if(response.data.already){
                    setNotify({isOpen: true, message:'There is a Product with this Product Number', type:'error'})
                }else{
                    setSubmitting(false);
                    resetForm();
                    setNotify({isOpen: true, message:'Product Added Succesfully', type:'success'})
                    setItemColor([])
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
                            <label className={style['product-form-label']}>Product's Name</label>
                            <Field className={style['product-add-input']} name="name" type='text'/>
                            <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div>
                        <label className={style['product-form-label']}>Product's No</label>
                            <Field className={style['product-add-input']} name="pno" type='text'/>
                            <ErrorMessage name='pno'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                        <label className={style['product-form-label']}>Product's Category</label>
                            <Field style={{width:'105%', marginBottom:'10px'}} name="category" as="select">
                            <option value="">Select a category</option>    
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            </Field>
                            <ErrorMessage name='category'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div style={{display:'flex', flexDirection:'column'}}>
                        <label className={style['product-form-label']}>Product's Material</label>
                            <Field style={{width:'105%', marginBottom:'10px'}} name="material" as="select">
                            <option value="">Select a material</option>   
                                {materials.map((material)=>{
                                    return <option key={material._id} value={material.name}>{material.name}</option>
                                })}
                            </Field>
                            <ErrorMessage name='material'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div>
                        <label className={style['product-form-label']}>Product's Description</label>
                            <Field className={style['product-add-textarea']} name="description" as='textarea'/>
                            <ErrorMessage name='description'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div>
                        <label className={style['product-form-label']}>Product's Price (Rs)</label>
                            <Field className={style['product-add-input']} name="price" type='text'/>
                            <ErrorMessage name='price'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                        </div>
                        <div style={{marginTop:'20px'}}>
                        <label  className={style['product-form-label']}>Product's Image</label><br/>
                           
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
                    <label className={style['product-form-label']}>Product's Colors</label>
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

export default ProductForm
