import React, { useEffect, useState } from 'react'
import './Alert.css'
import { Link } from 'react-router-dom'
//import {store} from 'react-notifications-component'
import 'react-animated-css'
import 'react-notifications-component/dist/theme.css'
import { Fragment} from 'react'
import instance from '../../../axios/axios-config'
import useSound from 'use-sound';
import Sound from './tone/pristine-609.mp3';

function CustomAlert (){
        
    return (
        <Fragment>
            {/**<button style={{background:'none', border:'none'}} onClick={handleAlertDefault}>
            <span className="fa-stack" data-count="1">
                   
                <i className="fa fa-bell fa-stack-2x fa-inverse"></i>
            </span>
            </button> */}
            <Link to="/admin/accept">
                <span className="fa-stack" data-count={window.orders}>
                   
                   <i className="fa fa-bell fa-stack-2x fa-inverse"></i>
               </span>
            </Link>
        </Fragment>
    )
}

function Alert(props) {
    const [number, setNumber] = useState(0)
    const [play, { stop }] = useSound(Sound,{ volume: 2 });

    useEffect(()=>{
        instance().get('/admin/confirmingordercount').then((response)=>{
            setNumber(response.data.count)
            
           
               /** store.addNotification({
                    title: "Material Order Request.....",
                    message: 'Please accept or reject the order',
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"],
                    
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                        showIcon: true
                    }
                    
                }) */
            
        }).catch((e)=>{
            console.log(e);
        })
    },[])

    
    const playSound =()=>{
        setTimeout(() => {
            play()
        }, 2000);
    }

    window.orders = number
    return (
            <Fragment>
              {number > 0 ? playSound(): stop()}
                <CustomAlert />
            </Fragment>
           
        
    )
}

export default Alert
