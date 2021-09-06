import React,{useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import hello from '../../assets/logo.jpeg';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Home from './UIs/home/Home';
import './SupplierMainComponent.css';

function SupplierMainComponent() {
    const [sidebarOpen, setsidebarOpen] = useState(false);

    const openSidebar = ()=>{
        setsidebarOpen(true)
    }
    const closeSidebar = ()=>{
        setsidebarOpen(false)
    }
    return (
        <Router>
            <div className="container">
                <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar}/>
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar}/>
            <Switch>
                <Route exact path="/supplier/home">
                    <Home img={hello} />
                </Route>
            </Switch>
            </div>
        </Router>
    )
}

export default SupplierMainComponent
