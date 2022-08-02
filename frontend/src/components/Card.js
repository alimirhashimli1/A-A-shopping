
import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import './Card.css'
const Card = ({ cart, setCart, handelAddProduct, handleDeleteProduct, clearCard }) => {


  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
  };


const totalPrice = cart.reduce((price, item)=> price + item.quantity * item.price, 0)
  return (
    <article>

    <h2 className="shopping-cart-header">Shopping Cart</h2>
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
           <p>{item.productName}</p>
           <p className="img-desc">{item.productDescription}</p>
           </div>
            
          </div>
          <div>{item.price}</div>
          <div className="cart-quantity">
            <span onClick={() => handelAddProduct(item)}>+</span>
            <span>{item.quantity}</span>
            <span onClick={() => handleDeleteProduct(item)}>-</span>
          </div>
         
          <div className="total-price">
            <span>$ {item.quantity * item.price}</span>
            <button onClick={() => handleDeleteProduct(item)}><FontAwesomeIcon icon={faTrashArrowUp} /> </button>
          </div>
        </div>
      ))}
      <div className="sub-total">
        <span className="sub-total-title">Sub Total Price of your Cart</span>
        <span className="sub-total-price">$  {totalPrice}</span>
      </div>




<div className="clear-card">
  {cart.length >=1 &&(
    <button className="clear-cart-button" onClick={clearCard}>Clear Card</button>
  )}
</div>
    </article>
  );
};

export default Card;