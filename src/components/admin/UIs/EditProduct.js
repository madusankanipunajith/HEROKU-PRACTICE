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
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginImageValidateSize)

const pnoRegex = /^[a-zA-Z]{3}[ ][0-9]{3,5}$/

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

function EditProduct() {
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})
    let { id } = useParams();
    const [colors, setColors] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [data, setData] = useState({});
    const [terms, setTerms] = useState([]);
    const [toggler, setToggler] = useState(false);

    const [files, setFiles] = useState([{
            source: 'http://localhost:5000/files/logo.png',
        },
    ])

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

        instance().get('/admin/materials').then((response)=>{
            const tempArray = [];
            response.data.forEach(element =>{
                tempArray.push(element.name);
            })
            setMaterials(tempArray);
        }).catch((e)=>{
            console.log(e);
        })

        instance().get(`/admin/viewproduct/${id}`).then((response)=>{

            if(response.data.notFound){
                console.log("Sorry you can't update");
                setNotify({isOpen: true, message:'Sorry there is no product available with this identity', type:'error'})
                setTimeout(() => {
                  window.location.href = window.location.origin+'/admin/warehouse/enditems';
                }, 2000);
            }else{
                var product ={
                    name: String,
                    colors:Array,
                    category:String,
                    material:String,
                    price:Number,
                    description:String,
                    len: Number,
                    pno:String,
                    img:String,
                    prevArray:Array,
                    sm:Array,
                    m:Array,
                    l:Array,
                    xl:Array,
                    xxl:Array
                   
                }

                // price convirting
               
                var nprice = 0;
                if(response.data.price < 1000){
                    nprice = parseFloat(formatter.format(response.data.price.toString()).replace('$','')).toFixed(2);
                }else{
                    nprice = parseFloat(formatter.format(response.data.price.toString()).replace('$','').replace(',','')).toFixed(2);
                }
               

                product.name = response.data.name;
                product.pno = response.data.pno;
                product.category = response.data.category;
                product.material = response.data.material;
                product.price = nprice;
                product.description = response.data.description;
                product.len = response.data.colors.length;
                product.prevArray = [];
                for(let i=0; i< product.len; i++){
                    product.prevArray.push(response.data.colors[i])
                }
                product.img = window.image_path_product+response.data.img;
                product.colors = [];
                 
                for(let i=0; i< response.data.colors.length; i++){
                    product.colors[i] = response.data.colors[i];
                }

                // get previous sizes to arrays
                product.sm = [];
                product.m = [];
                product.l = [];
                product.xl = [];
                product.xxl = [];

                for(let i=0; i < response.data.sm.length; i++){
                    product.sm.push({color: response.data.sm[i].color, qty: response.data.sm[i].qty})
                    product.m.push({color: response.data.m[i].color, qty: response.data.m[i].qty})
                    product.l.push({color: response.data.l[i].color, qty: response.data.l[i].qty})
                    product.xl.push({color: response.data.xl[i].color, qty: response.data.xl[i].qty})
                    product.xxl.push({color: response.data.xxl[i].color, qty: response.data.xxl[i].qty})
                }

                setData(product);
                setFiles(product.img);
            }

        }).catch((e)=>{
            console.log(e);
            setNotify({isOpen: true, message:'You cannot change ID format', type:'error'})
            setTimeout(() => {
                window.location.href = window.location.origin+'/admin/warehouse/enditems';
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
   
    //console.log(otherColors);
    console.log(data);
    return (
        <main>
            <div className={style['content']}>
            <div style={{ backgroundImage: `url(${data.img})`, width:'100%', height:'100%', backgroundPosition:'center'}}>
        <Dialog className={style['form-position']} open={true} fullWidth maxWidth="md" PaperProps={{
            style: {
                backgroundColor: 'rgba(255,255,255,0.6)',
                boxShadow: '1px',
                width:'800px',
                marginLeft:'50px',
                marginTop: '75px',

              
                },
            }}>
            <DialogTitle>
                <div className={style['d-title']} >
                    <h2>Edit Product</h2>
                    <div>
                       <Link to="/admin/warehouse/enditems"><p style={{fontSize:'14px', fontWeight:'bold', cursor:'pointer'}}>Back to Products <i className="fa fa-google-wallet"></i> </p></Link>
                    </div>
                </div>
               
            </DialogTitle>
            <DialogContent style={{  padding:'8px 0px'}}>
                
                <Formik
                    enableReinitialize
                    initialValues={{
                    name: data.name || '',
                    pno: data.pno || '',
                    description: data.description || '',
                    category: data.category || '',
                    material: data.material || '',
                    price: data.price || '',
                    colors: terms || [],
                    files: files || null
                   
                    }}

                    validationSchema={Yup.object({
                        name: Yup.string().trim().required('Required'),
                        pno: Yup.string().trim().required('Required').matches(pnoRegex,'Invalid Product Number'),
                        description: Yup.string().trim().required('Required'),
                        category: Yup.string().required('Required'),
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
                                data.prevArray= data.prevArray.concat(values.colors[i])
                            }

                            for(let i=0; i < values.colors.length; i++){
                                data.sm = data.sm.concat({color: values.colors[i], qty: 0})
                                data.m = data.m.concat({color: values.colors[i], qty: 0})
                                data.l = data.l.concat({color: values.colors[i], qty: 0})
                                data.xl = data.xl.concat({color: values.colors[i], qty: 0})
                                data.xxl = data.xxl.concat({color: values.colors[i], qty: 0})
                            }
                        }

                        var formData = new FormData();
                        var file = new File([files[0].file], files[0].filename);
                        const size = ['S ', 'M ', 'L ', 'XL ', 'XXL ']

                        if(file.name === 'undefined'){
                            file = prev_file;
                        }else{
                            prev_file = file;
                        }

                        formData.append('name',capitalizeTheFirstLetterOfEachWord(values.name))
                        formData.append('pno', values.pno.toUpperCase())
                        formData.append('price',values.price)
                        formData.append('description',values.description)
                        formData.append('size', JSON.stringify(size))
                        formData.append('colors', JSON.stringify(data.prevArray))
                        formData.append('category',values.category)
                        formData.append('material', values.material)
                        formData.append('file',file)

                        // sizes updates
                        formData.append('sm', JSON.stringify(data.sm))
                        formData.append('m', JSON.stringify(data.m))
                        formData.append('l', JSON.stringify(data.l))
                        formData.append('xl', JSON.stringify(data.xl))
                        formData.append('xxl', JSON.stringify(data.xxl))

                        for (var pair of formData.entries()) {
                            console.log(pair[0] + " - " + pair[1]);
                        }

                        instance().patch(`/admin/editproduct/${id}`, formData,{headers:{'Content-Type': 'multipart/form-data'}}).then((response)=>{
                            
                            if(!response.data.already){
                                if(response.data.success){
                                    setNotify({isOpen: true, message:'Updated successfully', type:'success'})
                                    setToggler(!toggler);
                                }else{
                                    setNotify({isOpen: true, message:'Sorry! cannot update the product', type:'error'})
                                }
                            }else{
                                setNotify({isOpen: true, message:'Sorry! already there is product with this Product Number', type:'error'})
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
                                <label>Product No</label>
                                <Field name="pno" type='text' className={style['add-input']}/>
                                <ErrorMessage name='pno'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Description</label>
                                <Field name="description" className={style['product-add-textarea']} as="textarea"/>
                                <ErrorMessage name='description'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Category</label>
                                <Field className={style['add-input']} style={{width:'73%'}} name="category" as="select">
                                    <option value={`${data.category}`}>{data.category}</option>    
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </Field>
                                <ErrorMessage name='category'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
                            </div>
                            <div className={style['add-item']}>
                                <label>Product Material</label>
                                <Field className={style['add-input']} style={{width:'73%'}} name="material" as="select">
                                    <option value={`${data.material}`}>{data.material}</option>    
                                    {materials.length > 0 && materials.map((material)=>{
                                        return <option key={material} value={material}>{material}</option>
                                    })}
                                </Field>
                                <ErrorMessage name='material'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>
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
                                
                                <div className={style['colors']}>
                                    {otherColors.map((color)=>{
                                        return <Checkbox name="colors" key={color} style={{color:`${color}`, border:'1px solid black'}} value={color} onChange={(e) => getValue(e)}/>
                                    })}
                                </div>
                                <ErrorMessage name='colors'>{ msg => <div style={{ color: 'red' }}>{msg}</div> }</ErrorMessage>    
                            
                                
                            </div>
                        </div>
                        <div style={{textAlign:'center'}} className={style['photo-content']}>
                            <label style={{fontWeight:'600', fontSize:'14px'}}>Product Image</label>
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

export default EditProduct
