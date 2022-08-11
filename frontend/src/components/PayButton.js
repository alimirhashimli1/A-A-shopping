import React, { useState } from "react";
import axios from "axios";
 import {url} from "../slices/api"
 import './PayButton.css'
 


const PayButton =({cart, currentCustomerId, token})=> {
     
    const handleCheckout=()=>{
        axios.post(`${url}/stripe/create-checkout-session`, {
            cart,
            userId: currentCustomerId

        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=>{
            console.log(err.message)

        })
        const now = new Date();
        const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);

       
        localStorage.setItem("data", JSON.stringify({ cart, expiry: tokenExpiry.toISOString() }));
       

    }
  return (
    <div>
      <button className="pay" onClick={handleCheckout}> Check Out     <i class="fa-brands pay-icon fa-cc-amazon-pay"></i></button>
    </div>
  )
}

export default PayButton
