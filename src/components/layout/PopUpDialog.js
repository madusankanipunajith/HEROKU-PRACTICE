import React,{useEffect, useState} from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import instance from '../../axios/axios-config';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import style from './PopUpDialog.module.css';
import ConfirmDialog from './ConfirmDialog';
import Circle from './Circle';

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})

const PopUpDialog =React.memo((props) =>{
    
    const {popUp, setPopUp} = props;
    const [products, setProducts] = useState({});
    const [materials, setMaterials] = useState([]);
    const [confirmDialog, setConfirmDialog]= useState({isOpen: false, title: '', subTitle: ''})
    var p_id ='';
    if(popUp.id){
        p_id = popUp.id;
    }else{
        p_id = '60ec6ee1f8c73e4d3493120f';
    }


    useEffect(()=>{
        const fetchData = async() =>{

            const response_1 = await instance().get(`admin/viewproduct/${p_id}`);
            const response_2 = await instance().get(`admin/viewmaterial/${p_id}`);

            setProducts(response_1.data);
            setMaterials(response_2.data);
            
        }

        fetchData();
        
    },[p_id])

    const deleteHandler = (id, type)=>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        if(type === 'products'){
            console.log('delete product');
            popUp.isOpen = false;

            instance().delete(`admin/deleteproduct/${id}`).then((response)=>{
                if(response.data.deleted){
                    props.setNotify({isOpen: true, message:'Deleted Product Successfully', type:'success'})
                }else{
                    props.setNotify({isOpen: true, message:'Cannot delete the product', type:'danger'}) 
                }

            }).catch((e)=>{
                props.setNotify({isOpen: true, message:'SOmething went wrong...', type:'danger'})
            })
            props.setNotify({isOpen: true, message:'Deleted Product Successfully', type:'success'})
        }else{
            console.log('delete material');
            popUp.isOpen = false;



            instance().delete(`admin/deletematerial/${id}`).then((response)=>{
                if(response.data.deleted){
                    props.setNotify({isOpen: true, message:'Deleted Product Successfully', type:'success'})
                }else{
                    props.setNotify({isOpen: true, message:'SOmething went wrong...', type:'danger'})
                }
            }).catch((e)=>{
                props.setNotify({isOpen: true, message:'SOmething went wrong...', type:'danger'})
            })
            props.setNotify({isOpen: true, message:'Deleted Material Successfully', type:'success'})
        }
    }
   

    return (

        <Dialog  open={popUp.isOpen} fullWidth maxWidth="sm">
            <DialogTitle>
                <div className={style['title']}>
                    <span>{products.name} {materials.name}</span>
                    <Link to={`/admin/warehouse/${popUp.edit}/${popUp.id}`}><EditIcon style={{color:'green'}}/></Link>  
                    {/**popUp.type === 'products'?<span>{popUp.subTitle}</span>: <span>{popUp.subTitle}</span> */}
                    <span onClick={()=>
                    setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete ?",
                        subTitle: "You can't undo this operation",
                        onConfirm: ()=> {deleteHandler(popUp.id, popUp.type)}
                    })}><DeleteIcon style={{color:'red'}}/></span>
                </div>
            </DialogTitle>
            <DialogContent>
                {popUp.type === 'products'? 
                
                <div className={style['body-container']}>
                    <div className={style['content-field']}>
                        <span>Product's Name :</span>
                        <h3 style={{marginLeft:'20px'}}>{products.name}</h3>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Number :</span>
                        <h3 style={{marginLeft:'20px'}}>{popUp.subTitle}</h3>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Category :</span>
                        <h3 style={{marginLeft:'20px'}}>{products.category}</h3>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Price :</span>
                        <h3 style={{marginLeft:'20px'}}>Rs { formatter.format(products.price).replace('$', '')}</h3>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Rating :</span>
                        <h3 style={{marginLeft:'20px'}}>{products.rating}</h3>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Colors :</span>
                        <div style={{marginLeft:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
                        {products.colors && products.colors.map((color)=>{
                            return <h3 key={color}><FiberManualRecordIcon style={{border:'1px solid black', color:`${color}`}}/></h3>
                        })}
                        </div>
                    </div>
                    <div className={style['content-field']}>
                        <span>Product's Sizes :</span>
                        <h3 style={{marginLeft:'20px'}}>{products.size}</h3>
                    </div><br/>
                    <div className={style['content-field']}>
                        <span>Category of Sizes</span>
                        <div className={style['size-category']}>
                            <div className={style['size-container']}>
                                <div className={style['size-field']}> 
                                    <h3>S</h3>
                                </div>
                                <div className={style['size-color']}>
                                    {products.sm && products.sm.map((obj)=>{
                                        return  <h3 key={obj.color}><Circle amount={obj.qty} color={obj.color}/></h3>
                                    })}
                                   
                                </div>
                            </div>
                            <div className={style['size-container']}>
                                <div className={style['size-field']}>
                                    <h3>M</h3>
                                </div>
                                <div className={style['size-color']}>
                                    {products.m && products.m.map((obj)=>{
                                        return  <h3 key={obj.color}><Circle amount={obj.qty} color={obj.color}/></h3>
                                    })}
                                </div>
                            </div>
                            <div className={style['size-container']}>
                                <div className={style['size-field']}>
                                    <h3>L</h3>
                                </div>
                                <div className={style['size-color']}>
                                    {products.l && products.l.map((obj)=>{
                                        return  <h3 key={obj.color}><Circle amount={obj.qty} color={obj.color}/></h3>
                                    })}
                                </div>
                            </div>
                            <div className={style['size-container']}>
                                <div className={style['size-field']}>
                                    <h3>XL</h3>
                                </div>
                                <div className={style['size-color']}>
                                    {products.xl && products.xl.map((obj)=>{
                                        return  <h3 key={obj.color}><Circle amount={obj.qty} color={obj.color}/></h3>
                                    })}
                                </div>
                            </div>
                            <div className={style['size-container']}>
                                <div className={style['size-field']}>
                                    <h3>XXL</h3>
                                </div>
                                <div className={style['size-color']}>
                                    {products.xxl && products.xxl.map((obj)=>{
                                        return  <h3 key={obj.color}><Circle amount={obj.qty} color={obj.color}/></h3>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div><br/>
                    
                    <div className={style['content-field']}>
                        <span>Product's Description :</span>
                        <h3 style={{marginLeft:'20px'}}>{products.description}</h3>
                    </div>
                  
                </div> :
                <div className={style['body-container']}>
                  

                        <div className={style['content-field']}>
                            <span>Material's Name :</span>
                            <h3 style={{marginLeft:'20px'}}>{materials.name}</h3>
                        </div>
                        <div className={style['content-field']}>
                            <span>Material's Status :</span>
                            <h3 style={{marginLeft:'20px'}}>{popUp.subTitle}</h3>
                        </div>
                        <div className={style['content-field']}>
                            <span>Material's Unit Price :</span>
                            <h3 style={{marginLeft:'20px'}}>RS&nbsp;{ formatter.format(materials.price).replace('$', '')}</h3>
                        </div>

                        <div className={style['content-field']}>
                            <span>Material's Units :</span>
                            <h3 style={{marginLeft:'20px'}}>{materials.units}</h3>
                        </div>

                        <div className={style['content-field']}>
                            <span>Material's Threshold :</span>
                            <h3 style={{marginLeft:'20px'}}>{materials.level}</h3>
                        </div>

                        <div className={style['content-field']}>
                            <span>Material's Colors :</span>
                            <div style={{marginLeft:'10px', display:'flex', alignItems:'center', gap:'5px'}}>
                                {materials.colors && materials.colors.map((color)=>{
                                return <h3 key={color.color} ><FiberManualRecordIcon style={{border:'1px solid black', color:`${color.color}`}}/> </h3>
                                })}
                            </div>

                        </div>

                        <div className={style['color-container']}>
                            <div className={style['topic']}>
                                <span>Color Variance :</span>
                            </div>
                            <div className={style['color-content']}>
                                {
                                    materials.colors && materials.colors.map((color)=>{
                                        return <div key={color.color} style={{display:'flex', alignItems:'center'}}>
                                                    <span><FiberManualRecordIcon style={{border:'1px solid black', color:`${color.color}`}}/></span>
                                                    <p style={{marginLeft:'5px'}}>{color.quantity}</p>
                                                </div> 
                                    })
                                }
                                
                                
                            </div>
                        </div><br/>

                        <div className={style['content-field']}>
                            <span>Material's Description :</span>
                            <h3 style={{marginLeft:'20px'}}>{materials.description}</h3>
                        </div>

                        
                    
                   
                    
                </div>}
                
            </DialogContent>
            <DialogActions> 
                <button style={
                {width:'100px', padding: '5px', border:'none', borderRadius: '5px', backgroundColor: 'lightgreen', cursor: 'pointer'}
                } onClick={()=> setPopUp({...popUp, isOpen: false})}>Okay</button>
            </DialogActions>

            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/>
        </Dialog>
    )
})

export default PopUpDialog
