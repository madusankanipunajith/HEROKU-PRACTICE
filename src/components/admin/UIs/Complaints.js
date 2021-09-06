import React,{useState, useEffect} from 'react'
import Footer from '../../layout/Footer'
import style from './css/Complaints.module.css'
import instance from '../../../axios/axios-config'
import Notification from '../../layout/Notification';

const complaints_init=[];
var mycolor ='';
var message = '';

function Card(props){
    const [notify, setNotify] = useState({isOpen: false, message:'', type:''})

    if(props.complaint.status === 0){
        mycolor = 'green';
        message = ' I will take into account (Reply back)'
    }else{
        mycolor = 'orange';
        message = 'Already taked into an account'
    }

    const buttonHandler = (status,id)=>{
        if(status === 0){
            instance().patch(`/admin/editcomplaint/${id}`, {status: 1}).then((response)=>{

                setNotify({isOpen: true, message:'Complaint is taked into an account. Email is sent to the customer', type:'success'})
                props.setToggler(!props.toggler);
            }).catch((e)=>{
                console.log(e);
            })

        }else{
            setNotify({isOpen: true, message:'Complaint is already considered into an account', type:'error'})
        }
    }

    return(
        <div className={style['card']}>
            <div className={style['card-topic']}>
                <div className={style['personal-info']}>
                    <h2>{props.complaint.subject}</h2>
                    <h3>{props.complaint.name}</h3>
                    <p>{props.complaint.email}</p>
                </div>
                
                <div className={style['date-time']}>
                     <h3>{props.complaint.date}</h3>
                     <p>{props.complaint.time}</p>
                </div>
            </div>
            <div className={style['card-body']}>
                <p>{props.complaint.body}</p>
            </div>
            <div className={style['card-action']}>
                <button  onClick={()=> buttonHandler(props.complaint.status, props.complaint._id)} style={{backgroundColor:`${mycolor}`}} className={style['button']}>
                   {message}
                </button>
            </div>
            <Notification notify={notify} setNotify={setNotify}/>
        </div>
    )
}

function Complaints(props) {
    const [year, setYear] = useState('');
    const [complaints, setComplaints] = useState(complaints_init)
    const [toggler, setToggler] = useState(false);

    const reloading = ()=>{
        window.location.href = window.location.origin+'/admin/complaints';
    }

    useEffect(()=>{
        instance().get('/admin/viewcomplaints').then((response)=>{
            setComplaints(response.data)
        }).catch((e)=>{
            console.log(e);
        })

    },[toggler]);
    return (
        <div className={style['complaints-main']}>
            <div className={style['complaints-main-container']}>
            <div className="main-title">
                    <img src={props.logo} alt="hello"/>
                    <div className="main-greeting">
                        <h1>Customer Complaints</h1>
                        <p>All negative comments are listed here</p>
                    </div>
            </div>
            <div className={style['search-bar']}>
                <span>🔍📆</span>
                <span className={style['search-msg']}> Filter your complaints according to the date</span>
                <input type="text" onFocus={
                    (e)=> {
                        e.currentTarget.type = "date";
                        e.currentTarget.focus();
                    }
                } placeholder=" Select a date......" onChange={(e)=>{setYear(e.target.value)}}
                />
                <button onClick={reloading} className={style['button2']}>All Comments</button>
            </div>
            <div className={style['complaints-card-content']}>
                {complaints.filter((val)=>{
                    if(year === ''){
                        return val;
                    }else if(val.date.includes(year)){
                        return val;
                    }
                    return false
                }).map((complaint) =>{
                    return <Card toggler={toggler} setToggler={setToggler} key={complaint._id} complaint={complaint}/>
                })}
                
            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Complaints
