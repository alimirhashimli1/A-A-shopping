import React, { useEffect, useState }  from 'react'

import './CheckoutSuccess.css'

const CheckoutSuccess = ({cart, currentCustomerId }) => {
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
       
    // } 
}, [currentCustomerId])

 
  
const totalPrice = cart.reduce((price, item)=> price + item.quantity * item.price, 0)

  return (
    <div>
      <h2 className='checkout-order'>Thank you {userName} for your order  ! <i class="fa-solid checkout-icon fa-circle-check"></i></h2>
      <h3 className='order-detail-title'> Order Detail:</h3>
      <div>
      {cart.map((item) => (

  <div className="cart_box-checkout" key={item._id} id={item._id}>
  <div className="cart_img-checkout">
    <img className='checkout-img' src={item.productImage.avatar} alt="productPhoto" />
   <div> 
   <p className="cart-product-name-checkout">{item.productName}</p>
   
   </div>
    
  </div>
  
  <div className="cart-quantity-checkout">
  
    
    <span>{item.quantity}</span>
   
  </div>
 
  <div className="total-price-checkout">
    <span>$ {item.quantity * item.price}</span>
    
  </div>
</div>
))}

<div className="sub-total-checkout">
        <span className="sub-total-title-checkout">SubTotal: </span>
        <span className="sub-total-price-checkout">$  {totalPrice}</span>
      </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
