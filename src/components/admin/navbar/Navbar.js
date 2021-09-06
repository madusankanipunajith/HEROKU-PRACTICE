import React from 'react'
import './Navbar.css'
import Avatar from '../../../assets/my-profile.jpg'
import {Link} from 'react-router-dom'
import Alert from '../messages/Alert'


function Navbar({sidebarOpen, openSidebar, data}) {
    
    return (
        <div className="navbar">
            <div className="nav-icon" onClick={()=> openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar-left">
                
            </div>
            <div className="navbar-right"> 
            
               
                {/**<Link to="/admin/calendar">
                    
                <span className="fa-stack" data-count="1">
                   
                    <i className="fa fa-bell fa-stack-2x fa-inverse"></i>
                </span>
                    
                </Link> */}
                <Alert data={data}/>

                <Link to="/admin/profile/2">
                    <img width="40" className="nav-img" src={Avatar} alt="logo-admin"></img>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
