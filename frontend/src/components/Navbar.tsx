import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <div className="navbar">
            <div className="logo">
                <NavLink to="/">
                    <div className="logo">
                        <img src='./images/logo.png' alt="icon" />
                    </div>
                </NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Navbar