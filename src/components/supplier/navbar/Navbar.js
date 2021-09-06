import React from 'react';
import style from './Navbar.module.css';
import {Link} from 'react-router-dom';
import Avatar from '../../../assets/my-profile.jpg';

function Navbar({sidebarOpen, openSidebar}) {
    return (
        <div className={style['navbar']}>
            <div className={style['nav-icon']} onClick={()=> openSidebar()}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar-left"></div>
            <div className={style['navbar-right']}>
                <Link to="/supplier/calendar">
                    <i className="fa fa-clock-o"></i>
                </Link>
                <Link to="/supplier/calendar">
                    <i className="fa fa-clock-o"></i>
                </Link>
                <Link to="/supplier/profile/2">
                    <img width="40" className={style['nav-img']} src={Avatar} alt="logo-admin"></img>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
