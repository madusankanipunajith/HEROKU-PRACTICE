import React from 'react'
import Logo from '../../../assets/logo.jpeg'
import './css/Notfound.css'
import {Link} from 'react-router-dom'

function Notfound() {
    return (
        <div className="notfound">
            <div className="content">
                <img src={Logo} alt="logo"/>
                <h2>Oops! Page is not found</h2>
                <Link to="/admin/home">
                <div className="suggesion"><p>Back to Home page</p></div>
                </Link>
            </div>
        </div>
    )
}

export default Notfound
