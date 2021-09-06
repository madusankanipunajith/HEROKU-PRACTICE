import React,{useState, useEffect} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import style from '../UIs/css/EditPM.module.css'
import  Checkbox from '@material-ui/core/Checkbox'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Link, useParams } from 'react-router-dom';
import {Form, ErrorMessage, Formik, Field} from 'formik'
import Notification from '../../layout/Notification'
import * as Yup from 'yup'
import instance from '../../../axios/axios-config';

import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType,FilePondPluginImageValidateSize)


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }

 var prev_file;

function EditMaterial() {
    const [files, setFiles] = useState([{
        source: 'http://localhost:5000/files/logo.png',
    },
])

    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    let { id } = useParams();
    const [colors, setColors] = useState([]);
    const [data, setData] = useState({});
    const [terms, setTerms] = useState([]);
    const [toggler, setToggler] = useState(false);

    const getValue = (e) => {
        let ndata = terms;
        let value = e.target.value;
        if (terms.find((obj) => obj === value)) {
          let index = terms.indexOf(value);
          if (index > -1) {
            terms.splice(index, 1);
          }
          console.log(terms);
        } else {
          ndata.push(value);
          setTerms(ndata);
          console.log(terms);
        }
    
        
      };

    useEffect(() => {
        instance().get('/admin/colors').then((response)=>{
            const tempArray = [];
           response.data.forEach(element => {
               tempArray.push(element.color);
           });
           setColors(tempArray);
           setTerms([]);
        }).catch((e)=>{
            console.log(e);
        })

        instance().get(`admin/viewmaterial/${id}`).then((response)=>{

            if(response.data.notFound){
                console.log("Sorry you can't update");
                setNotify({isOpen: true, message:'Sorry there is no material with this identity', type:'error'})
                setTimeout(() => {
                  window.location.href = window.location.origin+'/admin/warehouse';
                }, 2000);
            }else{
                var product ={
                    name: String,
                    colors:Array,
                    units:Number,
                    price:String,
                    description:String,
                    len: Number,
                    level:Number,
                    img:String,
                    prevArray:Array
                   
                }

                // price convirting
               
                var nprice = 0;
                if(response.data.price < 1000){
                    nprice = parseFloat(formatter.format(response.data.price.toString()).replace('$','')).toFixed(2);
                }else{
                    nprice = parseFloat(formatter.format(response.data.price.toString()).replace('$','').replace(',','')).toFixed(2);
                }

                product.name = response.data.name;
                product.level = response.data.level;
                product.units = response.data.units;
                product.price = nprice;
                product.description = response.data.description;
                product.img = window.image_path_material+response.data.img;
                product.len = response.data.colors.length;
                product.prevArray = [];
                for(let i=0; i< product.len; i++){
                    product.prevArray.push(response.data.colors[i])
                }
                product.colors = [];
                //console.log(response.data.colors); 
                for(let i=0; i< response.data.colors.length; i++){
                    product.colors[i] = response.data.colors[i].color;
                }

                setData(product);
                setFiles(product.img);
                console.log(product.img);
            }

        }).catch((e)=>{
            console.log(e);
            setNotify({isOpen: true, message:'You cannot change ID format', type:'error'})
            setTimeout(() => {
                window.location.href = window.location.origin+'/admin/warehouse';
            }, 2000);
        })

        
    }, [id, toggler]);

    var existColors=[];
    console.log(data.len);
    for (let i = 0; i < data.len; i++) {
        existColors[i]= data.colors[i];
      }

    var otherColors = [];
    otherColors = colors.filter(function (e) {
        return this.indexOf(e) < 0;
      }, existColors);
   
    //console.log(data);
   
    
    return (
        <main>
           <div className={style['content']}>
        <div style={{ backgroundImage: `url(${data.img})`, width:'100%', height:'100%', backgroundPosition:'center'}} >
        <Dialog className={style['form-position']} open={true} fullWidth maxWidth="md" PaperProps={{
            style: {
                backgroundColor: 'rgba(255,255,255,0.5)',
                boxShadow: '1px',
                width:'800px',
                marginLeft:'50px',
                marginTop: '75px',
              
                },
            }}>
            <DialogTitle>
                <div className={style['d-title']}>
                    <h2>Edit Raw Material</h2>
                    <div>
                       <Link to="/admin/warehouse"><p style={{fontSize:'14px', fontWeight:'bold', cursor:'pointer'}}>Back to Raw Materials <i className="fa fa-google-wallet"></i> </p></Link>
                    </div>
                </div>
               
            </DialogTitle>
            <DialogContent style={{  padding:'8px 0px'}}>
                <Formik
                    enableReinitialize
                    initialValues={{
                    name: data.name || '',
                    level: data.level || 0,
                    description: data.description || '',
                    units: data.units || 0,
                    price: data.price || '',
                    colors: terms || [],
                    files: files || null
                    }}

                    validationSchema={Yup.object({
                        name: Yup.string().trim().required('Required'),
                        level: Yup.number().required('Required'),
                        description: Yup.string().trim().required('Required'),
                        units: Yup.number().required('Required'),
                        price: Yup.number().typeError('Please enter a valid amount').positive('Cannot be a negative number').required('Please enter an amount').test(
                            "onlyNumbers",
                            "only numbers please",
                            (value) => /^[0-9]*$/
                        ),      
                        colors: Yup.array(),
                        files: Yup.mixed().required('Required')
                    })}

                    onSubmit={(values,{setSubmitting, resetForm })=>{
                       

                        if(values.colors.length > 0){
                            for(let i=0; i < values.colors.length; i++){
                                data.prevArray= data.prevArray.concat({color: values.colors[i], quantity: 0})
                            }
                        }

                        var formData = new FormData() // form data to be appended here
                        var file = new File([files[0].file], files[0].filename);

                        if(file.name === 'undefined'){
                           
                            file = prev_file;
                        }else{
                            
                            prev_file = file;
                        }


                        formData.append('name',capitalizeTheFirstLetterOfEachWord(values.name))
                        formData.append('price',values.price)
                        formData.append('description',values.description)
                        formData.append('level',values.level)
                        formData.append('colors', JSON.stringify(data.prevArray))
                        formData.append('units',values.units)
                        formData.append('file',file)

                        for (var pair of formData.entries()) {
                            console.log(pair[0] + " - " + pair[1]);
                        }

                        instance().patch(`/admin/editmaterial/${id}`, formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{
                            if(response.data.success){
                                setNotify({isOpen: true, message:'Updated successfully', type:'success'})
                                setToggler(!toggler);
                            }else{
                                setNotify({isOpen: true, message:'Sorry cannot update the material', type:'error'})
                            }
                        }).catch((e)=>{
                            console.log(e);
                        }) 
                    }}
                >
                <Form>
                    <div className={style['form-content']}>
                        <div className={style['left-content']}>
                            <div className={style['add-item']}>
                                <label>Product Name</label>
                                <Field name="name" type='text' className={style['add-input']}/>
                                <ErrorMessage name='name'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Description</label>
                                <Field name="description" className={style['product-add-textarea']} as='textarea'/>
                                <ErrorMessage name='description'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Level</label>
                                <Field name="level" type='text' className={style['add-input']}/>
                                <ErrorMessage name='level'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Units</label>
                                <Field name="units" type='text' className={style['add-input']} readOnly/>
                                <ErrorMessage name='units'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Price (Rs)</label>
                                <Field name="price" type='text' className={style['add-input']}/>
                                <ErrorMessage name='price'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                        </div>
                        <div className={style['right-content']}>
                            
                            <div style={{textAlign:'center'}}>
                                <label style={{fontWeight:'600', fontSize:'14px'}}>Exist Colors</label>
                                <div className={style['colors']}>
                                    {existColors.map((color)=>{
                                        return <FiberManualRecordIcon key={color} style={{color:`${color}`, border:'1px solid black'}}/>
                                    })}
                                    
                                </div><hr/>
                            </div>
                            <div style={{textAlign:'center',marginTop:'20px'}}>
                                <label style={{fontWeight:'600', fontSize:'14px'}}>(Add+) Colors</label>
                                
                                <div className={style['colors-2']}>
                                    {otherColors.map((color)=>{
                                        return <Checkbox name="colors" key={color} style={{color:`${color}`, border:'1px solid black'}} value={color} onChange={(e) => getValue(e)}/>
                                    })}
                                </div>
                                <ErrorMessage name='colors'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>    
                            
                                
                            </div>
                        </div>
                       
                            <div  style={{textAlign:'center'}} className={style['photo-content']}>
                                <label style={{fontWeight:'600', fontSize:'14px', marginBottom:'20px'}}>Product Image</label>
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
                            <ErrorMessage name='files'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                    </div>
                    <div style={{textAlign:'center'}}>
                        <button className={style['button']} type='submit'>Make Changes</button>
                    </div>
                </Form>
                </Formik>
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
        <Notification notify={notify} setNotify={setNotify}/>
        
        
        </div>
        </div> 
        </main>
    )
}

export default EditMaterial