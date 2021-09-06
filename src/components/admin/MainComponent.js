import React, { useState } from 'react'
import hello from '../../assets/logo.jpeg'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './MainComponent.css'
import Navbar from './navbar/Navbar'
import Sidebar from './sidebar/Sidebar'
import Home from './home/Home'
import Notfound from './UIs/Notfound';
import Profile from './UIs/Profile';
import CustomerList from './UIs/CustomerList';
import SupervisorForm from './UIs/SupervisorForm';
import QuriorForm from './UIs/QuriorForm';
import WareHouse from './UIs/WareHouse';
import Products from './UIs/Products';
import CustomerChart from './UIs/CustomerChart';
import IncomeChart from './UIs/IncomeChart';
import SupervisorList from './UIs/SupervisorList';
import QuriorList from './UIs/QuriorList';
import SupplierForm from './UIs/SupplierForm';
import SupplierList from './UIs/SupplierList';
import EditSupplier from './UIs/EditSupplier';
import Complaints from './UIs/Complaints';
import MaterialReport from './UIs/MaterialReport';
import EditProduct from './UIs/EditProduct';
import EditMaterial from './UIs/EditMaterial';
import ViewOrders from './UIs/ViewOrders';
import AcceptOrder from './UIs/AcceptOrder';

function MainComponent() {
    const [sidebarOpen, setsidebarOpen] = useState(false)
  
    const openSidebar = ()=>{
        setsidebarOpen(true)
    }
    const closeSidebar = ()=>{
        setsidebarOpen(false)
    }
    return (
        <Router>
            <div className="admin-container">
            <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/admin/profile/:id">
                        <Profile logo={hello}/>
                    </Route>
                    <Route exact path="/admin/customers">
                        <CustomerList logo={hello}/>
                    </Route>
                    <Route exact path="/admin/supervisors">
                        <SupervisorList logo={hello}/>
                    </Route>
                    <Route exact path="/admin/quriors">
                        <QuriorList logo={hello}/>
                    </Route>
                    <Route exact path="/admin/suppliers">
                        <SupplierList logo={hello}/>
                    </Route>
                    <Route exact path="/admin/supplier/edit/:id">
                        <EditSupplier logo={hello}/>
                    </Route>
                    <Route exact path="/admin/supervisorForm">
                        <SupervisorForm logo={hello}/>
                    </Route>
                    <Route exact path="/admin/quriorForm">
                        <QuriorForm logo={hello}/>
                    </Route>
                    <Route exact path="/admin/supplierForm">
                        <SupplierForm logo={hello}/>
                    </Route>
                    <Route exact path="/admin/warehouse">
                        <WareHouse logo={hello}/>
                    </Route>
                    <Route exact path="/admin/warehouse/enditems">
                        <Products logo={hello}/>
                    </Route>
                    <Route exact path="/admin/report-1">
                        <CustomerChart logo={hello}/>
                    </Route>
                    <Route exact path="/admin/report-2">
                        <IncomeChart logo={hello}/>
                    </Route>
                    <Route exact path="/admin/report-3">
                        <MaterialReport logo={hello}/>
                    </Route>
                    <Route exact path="/admin/complaints">
                        <Complaints logo={hello}/>
                    </Route>
                    <Route exact path="/admin/warehouse/editproduct/:id">
                        <EditProduct />
                    </Route>
                    <Route exact path="/admin/warehouse/editmaterial/:id">
                        <EditMaterial/>
                    </Route>
                    <Route exact path="/admin/orders">
                        <ViewOrders logo={hello}/>
                    </Route>
                    <Route exact path="/admin/accept">
                        <AcceptOrder logo={hello}/>
                    </Route>
                    <Route component={Notfound} />
                </Switch>    
            </div>
        </Router>
    )
}

export default MainComponent
