import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import Logo from '../../../assets/logo.jpeg'
import instance from '../../../axios/axios-config';

function Sidebar({sidebarOpen, closeSidebar}) {

    function LogOut(){
        instance().post('/auth/logout').then((response)=>{
            window.location="/";

        }).catch((e)=>{
            console.log(e);
        })

    }


    return (
        <div onClick={()=>closeSidebar()}  className={sidebarOpen? "sidebar-responsive" : ''} id="sidebar">
            <div className="sidebar-title">
                <div className="sidebar-img">
                    <img src={Logo} alt="product-logo"/>
                    <h1>Stitches & Curves</h1>
                </div>
                <i className="fa fa-times" id="sidebar-icon" onClick={()=>closeSidebar()}></i>
            </div>

            <div className="sidebar-menu">
               
                <NavLink exact to="/" className="sidebar-link" activeClassName="active-menu-link">
                        
                        <i className="fa fa-home"></i>
                            <span>Dashboard</span>
                   
                </NavLink>
               

                <h2>MANAGE &nbsp;USERS</h2>
                <NavLink exact to="/admin/supervisorForm" className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-user-secret"></i>
                    <span>Add Supervisors</span>
                
                </NavLink>
                
                <NavLink exact to="/admin/quriorForm" className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-motorcycle"></i>
                    <span>Add Couriers</span>
                
                </NavLink>

                <NavLink exact to="/admin/supplierForm" className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-truck"></i>
                    <span>Add Supplier</span>
                
                </NavLink>

                <h2>WAREHOUSE</h2>
                <NavLink exact to='/admin/warehouse' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-archive"></i>
                    <span>Raw Materials</span>
               
                </NavLink>
                <NavLink exact to='/admin/warehouse/enditems' className="sidebar-link" activeClassName="active-menu-link">
               
                    <i className="fa fa-shopping-basket"></i>
                    <span>Products</span>
                
                </NavLink>

                <h2>REPORTS</h2>
                <NavLink exact to='/admin/report-1' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-bar-chart"></i>
                    <span>Customer Report</span>
               
                </NavLink>
                <NavLink exact to='/admin/report-2' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-line-chart"></i>
                    <span>Income Report</span>
               
                </NavLink>
                <NavLink exact to='/admin/report-3' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-pie-chart"></i>
                    <span>Material Report</span>
                
                </NavLink>

                {/**<h2>PRODUCTION &nbsp;LINE</h2> */}
                {/** <NavLink exact to='/admin/addproduct' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-black-tie"></i>
                    <span>Add Productions</span>
               
                </NavLink> */}
                <h2>ORDERS</h2>
                <NavLink exact to='/admin/orders' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-black-tie"></i>
                    <span>View Orders</span>
               
                </NavLink>
                <NavLink exact to='/admin/accept' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-check-square"></i>
                    <span>Accept Orders</span>
               
                </NavLink>

                <h2>COMPLAINTS</h2>
                <NavLink exact to='/admin/complaints' className="sidebar-link" activeClassName="active-menu-link">
                
                    <i className="fa fa-search"></i>
                    <span>View Complaints</span>
               
                </NavLink>
                
                
                    <NavLink  to="#" style={{marginTop:'50px'}} className="sidebar-link" onClick={LogOut}>
                    
                        <i className='fa fa-sign-out'></i>
                        <span>Log Out</span> 
                        
                    </NavLink>
               
            </div>
            
        </div>
    )
}

export default Sidebar
