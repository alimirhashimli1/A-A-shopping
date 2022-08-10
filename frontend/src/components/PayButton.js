import React, { useState } from "react";
import axios from "axios";
 import {url} from "../slices/api"
 import './PayButton.css'
 


const PayButton =({cart, currentCustomerId})=> {
     
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
        localStorage.setItem('data', JSON.stringify(cart))

    }
  return (
    <div>
      <button className="pay" onClick={handleCheckout}> Check Out     <i class="fa-brands pay-icon fa-cc-amazon-pay"></i></button>
    </div>
  )
}

export default PayButton
