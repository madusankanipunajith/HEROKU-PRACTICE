import React,{useEffect} from 'react'
import style from './WareHouse.module.css'
import Card from './Card'
import { Fragment, useState } from 'react'
import PopUpDialog from '../../layout/PopUpDialog'
import MaterialForm from '../UIs/MaterialForm'
import instance from '../../../axios/axios-config'
import Loader from '../../layout/Loader'
import Notification from '../../layout/Notification'

const productRows =[]

function WareHouseHome() {
    const [searchTerm, setSearchTerm] = useState('')
    const [popUp, setPopUp]= useState({isOpen: false, title: '', subTitle: '', id: '', type: '', edit:''})
    const [popUp2, setPopUp2] = useState({isOpen: false, title: ''})
    const [materials, setMaterials] = useState(productRows);
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})

    useEffect(() => {
        instance().get('/admin/materials').then((response)=>{
            var newMaterials = [];
            var Materials = [];
            Materials = response.data;

            Materials.forEach((material)=>{
                var mat ={
                    id:String,
                    name:String,
                    stock:Number,
                    status:String,
                    price:String,
                    color:Array,
                    img:String
                }

                mat.id = material._id;
                mat.name = material.name;
                mat.stock = material.units;
                mat.status = (material.level > material.units) ? 'out of stock' :'in stock';
                mat.price = material.price;
                mat.color = [];
                for(let i=0; i< material.colors.length; i++){
                    mat.color[i] = material.colors[i].color;
                }
                mat.img = material.img;
                
                newMaterials.push(mat);
            })

            setMaterials(newMaterials)

        }).catch((e)=>{
            console.log(e);
        })
        
    },[]);
    console.log(materials);
    return (
        <Fragment>
        <div className={style['product-content']}>
            <div className={style['search-bar']}>
                <input type='text' placeholder='search bar 🔍' onChange={(e)=> {setSearchTerm(e.target.value)}}/>
            </div>
            <div className={style['add-button']}>
                <button onClick={()=> setPopUp2({isOpen: true, title:'Raw Material Form'})}>+ Add</button>
            </div> 
        </div>
        {materials.length > 0 ? <div className={style['warehouse-content']}>
            {materials.filter((val)=>{
                if(searchTerm === ""){
                    return val;
                }else if(val.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                    return val;
                }
                return false;
            }).map((item) =>{
                return <div key={item.id} onClick={()=> setPopUp({isOpen: true, title: `${item.name}`, subTitle:`${item.status}`, id: `${item.id}`, type:'materials', edit:'editmaterial'  })}>
                   <Card key={item.id} image={item.img} name={item.name} stock={item.stock} status={item.status} colors={item.color}/>
               </div>
            })}

            <PopUpDialog
                popUp={popUp}
                setPopUp={setPopUp}
                setNotify = {setNotify}
            >

            </PopUpDialog>

            <MaterialForm
            
                popUp={popUp2}
                setPopUp={setPopUp2}
            >

            </MaterialForm>
        </div> : <div style={{marginTop:'70px'}}><Loader/></div>}     
        <Notification notify={notify} setNotify={setNotify}/>
        </Fragment>
    )
}

export default WareHouseHome
