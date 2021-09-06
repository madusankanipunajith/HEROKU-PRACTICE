import React,{useState} from 'react'
import style from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo.jpeg'

function Sidebar({sidebarOpen, closeSidebar}) {

    const [toggle1, setToggle1] = useState(false);
    
    const toggle1Handler =()=>{
        setToggle1(!toggle1);
    }

    return (
        <div className={sidebarOpen? style['sidebar-responsive'] : ''} id={style['sidebar']}>
            <div className={style['sidebar-title']}>
                <div className={style["sidebar-img"]}>
                    <img src={Logo} alt="product-logo"/>
                    <h1>Stitches & Curves</h1>
                </div>
                <i className="fa fa-times" id={style["sidebar-icon"]} onClick={()=>closeSidebar()}></i>
            </div>

            <div className={style["sidebar-menu"]}>
                <Link to="/admin/home">
                    <div className={`${style['sidebar-link']} ${style['active-menu-link']}`}>
                        <i className="fa fa-home"></i>
                            <span>Dashboard</span>
                    </div>
                </Link>

                <h2 onClick={toggle1Handler}>
                    ORDERS {toggle1? 
                    <i style={{marginLeft:'30px'}} className="fa fa-caret-up"></i> :
                    <i style={{marginLeft:'30px'}} className="fa fa-caret-down"></i>}
                </h2>

                <div className={toggle1? style['toggle-1-responsive']: ''} id={style['toggle-1']}>
                <Link to="/admin/supervisorForm">
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-user-secret"></i>
                    <span>New Orders</span>
                </div>
                </Link>
                
                <Link to="/admin/quiriorForm">
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-bus"></i>
                    <span>Previous Orders</span>
                </div>
                </Link>
                <Link to="/admin/adminForm">
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-user-plus"></i>
                    <span>Order Complaints</span>
                </div>
                </Link>
                </div>

                <h2>WAREHOUSE</h2>
                <Link to='/admin/warehouse'>
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-archive"></i>
                    <span>Your Shop Materials</span>
                </div>
                </Link>
                <Link to='/admin/warehouse/enditems'>
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-archive"></i>
                    <span>Add New Materials</span>
                </div>
                </Link>

                

                <h2>REPORTS</h2>
                <Link to='/admin/report-1'>
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-archive"></i>
                    <span>Customer Report</span>
                </div>
                </Link>
                <Link to='/admin/warehouse/report-2'>
                <div className={style["sidebar-link"]}>
                    <i className="fa fa-archive"></i>
                    <span>Income Report</span>
                </div>
                </Link>
                
                    <Link to="/admin/logout">
                    <div className={style["sidebar-logout"]}>
                        <i className='fa fa-sign-out'></i>
                        <span>Log Out</span> 
                    </div>    
                    </Link>
               
            </div>
            
        </div>
    )
}

export default Sidebar