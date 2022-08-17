import React, { useState, useEffect } from "react";
import axios from "axios";
 import {url} from "../slices/api"
 import './PayButton.css'
 import {Link} from "react-router-dom"
 


const PayButton =({cart, currentCustomerId, isLoggedIn, token})=> {
const [userID, setUserID]= useState("")

  useEffect(() => {
   
       
            const fetchCustomerData = async () => {
                const settings = {
                    credentials: "include"
                }    
                const response = await fetch(process.env.REACT_APP_SERVER_URL + `/customers/${currentCustomerId}`, settings);
                const parsedRes = await response.json();            
                try {
                    if (response.ok) {
                        setUserID(currentCustomerId)
                    } else {
                        throw new Error(parsedRes.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }
    
            fetchCustomerData();
       
 
}, [currentCustomerId])



     
    const handleCheckout=()=>{
      console.log('currentCustomerId', currentCustomerId)
      console.log('userID', userID)
        axios.post(`${url}/stripe/create-checkout-session`, {
            cart,
            userId: userID

        }).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=>{
            console.log(err.message)

        })
        const now = new Date();
        const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);

       
        localStorage.setItem("cartData", JSON.stringify({ cart, expiry: tokenExpiry.toISOString() }));
       

    }
  return (
    <div>
    { isLoggedIn ? (
        <button className="pay payButton-item"  onClick={handleCheckout}> Check Out     <i class="fa-brands pay-icon fa-cc-amazon-pay"></i></button>)
       : (
        <button className="pay1 payButton-item1"><Link className="pay2"  to="/login"> Login First<i class="fa-solid fa-user-lock"></i></Link></button>
       )

       }
    </div>
  )
}

export default PayButton
