
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"
// import Classnames from "classnames"
import './Header.css'

function Header({setShow, cart, isLoggedIn, currentCustomerId, logout}) {
return (
    <section className='main-navbar'>
<nav className="nav-bar">
          <div className='nav-box'>
          <span className="my_shop"><Link className='item-link my-shopping-logo' to="/"><span className='shopping-logo'>A&A</span> Shopping</Link></span>
          <ul className='navbar-items'>
                    <li><Link className='item-link' onClick={()=> setShow(true)} to="/products">Products</Link></li>
                    <li><Link className='item-link' to="/contact">Contact</Link></li>
                    <li><Link className='item-link' to="/about">About</Link></li>
                    
                    <li><Link className='item-link' to="/logout">Team</Link></li>
                   
         </ul>


         </div>
         
         </nav>
       </section>
       
         
      
     )
   }
   
   export default Header
   