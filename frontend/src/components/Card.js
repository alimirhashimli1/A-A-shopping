
import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import './Card.css'
import PayButton from "./PayButton";
import Classnames from "classnames"
const Card = ({ cart, open, setOpen, currentCustomerId, setCart, handelAddProduct, handleDeleteProduct, clearCard, isLoggedIn }) => {


   const cartShopping = JSON.parse(localStorage.getItem("cartData") || "[]");

   const cartInformation = cartShopping.cart
  // console.log('cartShopping', cartShopping)
  //   console.log('cart', cart)

  // const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]")
  // const [ cart, setCart]= useState(cartFromLocalStorage);




  const handleRemove = (product) => {
    const cartDelete = cart.filter((item) => item._id !== product._id);
    setCart(cartDelete);
  };


const totalPrice = cart.reduce((price, item)=> price + item.quantity * item.price, 0)
  return (
    <article>

    <h2 className={ Classnames('shopping-cart-header',{'shopping-cart-header-hide': open } )}  onClick={()=> setOpen(!open)}>Shopping Cart</h2>
    
    <div className="cart-title">
      <h3 >PRODUCT</h3>
      <h3 className="cart-title-price">PRICE</h3>
      <h3 className="cart-title-quantity">QUANTITY</h3>
      <h3>TOTAL PRICE</h3>
    </div>
   
      {cart.map((item) => (

        <div className="cart_box" key={item._id} id={item._id}>
          <div className="cart_img">
            <img src={item.productImage.avatar} alt="productPhoto" />
           <div> 
           <p className="cart-product-name">{item.productName}</p>
           <p className="img-desc">{item.productDescription}</p>
           </div>
            
          </div>
          <div className="cart-product-price">${item.price}</div>
          <div className="cart-quantity">
          <span className="dec-quantity" onClick={() => handleDeleteProduct(item)}>  -   </span>
            
            <span>{item.quantity}</span>
            <span  onClick={() => handelAddProduct(item)}>  +</span>
          </div>
         
          <div className="total-price">
            <span className="total-price-span">$ {item.quantity * item.price}</span>
            <button onClick={() => handleRemove(item)}><FontAwesomeIcon className="trash-icon" icon={faTrashCan} /> </button>
          </div>
        </div>
      ))}
      <div className="sub-total">
        <span className="sub-total-title">SubTotal: </span>
        <span className="sub-total-price">$  {totalPrice}</span>
      </div>
      
        <PayButton cart ={cart} isLoggedIn = {isLoggedIn} currentCustomerId={currentCustomerId} />
      




<div className="clear-card">
  {cart.length >=1 &&(
    <button className="clear-cart-button" onClick={clearCard}>Clear Cart <i class="fa-solid fa-trash"></i></button>
  )}
</div>
    </article>
  );
};

export default Card;