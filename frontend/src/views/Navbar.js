import React from 'react'
import {Link} from "react-router-dom"
import "../App.css"


const Navbar = () => {
  return (
    <>
        <nav className="navbar">
                <ul>
                    <li>
                    <Link to="/">
                        Logo
                    </Link>
                    </li>
                    <li>
                    <Link to="/products">
                        Products
                    </Link>
                    </li>
                    <li>
                    <Link to="/contact">
                        Contact
                    </Link>
                    </li>
                    <li>
                    <Link to="/about">
                        About
                    </Link>
                    </li>
                    <li>
                    <Link to="/login">
                        Login
                    </Link>
                    </li>
                    <li>
                    <Link to="/cart">
                        Cart
                    </Link>
                    </li>
                </ul>
            </nav>
    </>
  )
}


export default Navbar