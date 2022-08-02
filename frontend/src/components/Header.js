
import React from 'react'
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import './Header.css'

function Header({setShow, cart}) {
    const totalAmount = cart.map(item => item.quantity)
 const totalQuantity = totalAmount.reduce(function(totalAmount, b){
return totalAmount+b
 }, 0)
  return (
    
      <nav className="nav-bar">
          <div className='nav-box'>
          <span className="my_shop"><Link className='item-link' to="/">A&A Shopping</Link></span>
          <ul className='navbar-items'>
                    <li><Link className='item-link' onClick={()=> setShow(true)} to="/products">Products</Link></li>
                    <li><Link className='item-link' to="/contact">Contact</Link></li>
                    <li><Link className='item-link' to="/about">About</Link></li>
                    <li><Link className='item-link' to="/login">Login</Link></li>
                    <li><Link className='item-link' to="/logout">Logout</Link></li>
                   
         </ul>
        <div className='cart' onClick={()=> setShow(false)}>    
                <span><Link  to="/products"><i className="fas header-cart-icon fa-cart-plus"></i></Link>
                
                </span>
                <span >
                  {cart.length === 0 ? 0 : totalQuantity }
                </span>
            </div>
        </div>
         
      </nav>
   
  )
}

export default Header



