
import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom
import Classnames from "classnames"
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


       
   


function Header({setShow, cart, isLoggedIn, currentCustomerId, logout}) {
    const totalAmount = cart.map(item => item.quantity)
 const totalQuantity = totalAmount.reduce(function(totalAmount, b){
return totalAmount+b
 }, 0)

 const [userName, setUserName] = useState("");


 useEffect(() => {
 
          const fetchCustomerData = async () => {
              const settings = {
                  credentials: "include"
              }    
              const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${currentCustomerId}`, settings);
              const parsedRes = await response.json();            
              try {
                  if (response.ok) {
                     
                      setUserName(parsedRes.userName);
                  } else {
                      throw new Error(parsedRes.message);
                  }
              } catch (err) {
                  alert(err.message);
              }
          }
          fetchCustomerData();
}, [currentCustomerId])

  return (
    <section className='main-navbar'>
<nav className="nav-bar">
          
         <ul className='navbar-right-items'>
            <li className='drop-down'>
           
             {isLoggedIn
            ? (
              <>
              <Link className='item-link' to="/login"><i className="fa-solid fa-circle-user"></i> My account  <i className={ Classnames('fas down-arrow  fa-caret-down',{'down-arrow-active': isLoggedIn})}></i></Link>
            
            <div className='drop-down-menu'>
                      <ul>
                      <li><Link className='drop-item' to="#">Hi {userName}</Link></li>
                      <li><Link className='drop-item' to="#">About</Link></li>
                      <li><Link className='drop-item' to="#">Contact</Link></li>
                      <li><Link className='drop-item' onClick={logout} to="/logout">Logout</Link></li>
                      </ul>
                    </div>
            
                    </>
            )
            : (<Link className='item-link' to="/login"><i className="fa-solid fa-circle-user"></i>  Login  <i className={ Classnames('fas down-arrow  fa-caret-down',{'down-arrow-active': isLoggedIn})}></i></Link>)
            
            }
                  
            </li>
            <li className='cart' onClick={()=> setShow(false)}>    
                <span className='cart-shopping-icon'><Link  to="/products"><i className="fas header-cart-icon fa-basket-shopping"></i></Link>
                
                </span>
             
                <span className={ Classnames('cart-quantity',{'cart-quantity-hidden': cart.length === 0 } )}>
                  {cart.length === 0 ? '' : totalQuantity }
                </span>
            </li>

</ul>
           
        </div>
         
      </nav>
    </section>
    
      
   
  )
}

export default Header


