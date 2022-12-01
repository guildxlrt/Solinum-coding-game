import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <div className="nav-container">
            <div className="logo">
                <NavLink to="/">
                    <div className="logo">
                        <img src='./images/logo.png' alt="icon" />
                    </div>
                </NavLink>
            </div>

            <ul className='change-vue'>
                
                <li>
                    <NavLink to="/">
                        <img src="./images/icons/dashboard.svg" alt="dashboard"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/map">
                        <img src="./images/icons/map.svg" alt="map"/>
                    </NavLink> 
                </li>   
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar