import React, { useEffect, useState }  from 'react'
import Classnames from "classnames"
import './CheckoutSuccess.css'

const CheckoutSuccess = ({cart, open, setOpen, currentCustomerId,setCart }) => {
  const [userName, setUserName] = useState("");
  const [shipping, setShipping] = useState("");
  const [orderNumber, setOrderNumber]= useState("");
  const [address, setAddress]= useState("");
  const [shippingName, setShippingName] = useState("");

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


useEffect(() => {
   
  const getShipping = async () => {
      const settings = {
          credentials: "include"
      }    
      const response = await fetch(process.env.REACT_APP_SERVER_URL + `/order`, settings);
      const parsedRes = await response.json();            
      try {
          if (response.ok) {
           
            console.log("shipping parsedRes", parsedRes)
             const shipping = parsedRes[0].shipping
            const orderNumber = parsedRes[0].paymentIntentId
            const address = parsedRes[0].shipping.address
            const shippingName = parsedRes[0]

            console.log("setShipping", shipping)
            console.log("orderNumber", orderNumber)
            console.log("Address", address)
             setShipping(shipping)
             setOrderNumber(orderNumber)
             setAddress(address)
             localStorage.removeItem("cart");
            setCart([])
            
            
console.log('shipping1', shipping)
console.log("setShipping", shipping)
            console.log("orderNumber", orderNumber)
            console.log("Address", address)
            console.log('shippingName', shippingName)
            
             
          } else {
              throw new Error(parsedRes.message);
          }
      } catch (err) {
          alert(err.message);
      }
  }

  getShipping();

// } 
}, [])



const cartShopping = JSON.parse(localStorage.getItem("cartData"));
const cartInformation = cartShopping.cart
console.log('cartShopping', cartShopping)
  console.log('cart', cart)

const totalPrice = cartInformation.reduce((price, item)=> price + item.quantity * item.price, 0)

  return (
    <div>
       <h2 className={ Classnames('checkout-order',{'checkout-order-hide': open } )}  onClick={()=> setOpen(!open)}>Thank you <span className='login-name-checkout'>{userName}</span> for your order  ! <i class="fa-solid checkout-icon fa-circle-check"></i></h2>
       <h3 className='order-detail-title'> Order Detail:</h3>
       <p className='shipping-info1 '>Order Number: {orderNumber}</p>

       <div className='payment-detail'>  
       <div className='products-detail-checkout'>
           {cartInformation.map((item) => (

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

      <div className='shipping-detail'>
      <h2 className='shipping-tital'>Shipping Detail:</h2>
      {
              
                  <div  className='shipping-detail-border'>
                      <p className='shipping-info'>Name: <span className='shipping-details-info'>{shipping.name}</span></p>
                      <p className='shipping-info'>Email: <span className='shipping-details-info'>{shipping.email}</span></p>
                      <p className='shipping-info'>Phone: <span className='shipping-details-info'>{shipping.phone}</span></p>
                      <p className='shipping-info'>State: <span className='shipping-details-info'>{address.line1}</span></p>
                      <p className='shipping-info'>City: <span className='shipping-details-info'>{address.city}</span></p>
                      <p className='shipping-info'>Street Number: <span className='shipping-details-info'>{address.line2}</span></p>
                      <p className='shipping-info'>Postal Code: <span className='shipping-details-info'>{address.postal_code}</span></p>



                      {/* <p>State: {shipping.address.line1}</p>
                      <p>City: {shipping.address.city}</p>
                      <p>Street Number: {shipping.address.line2}</p>
                      <p>Postal Code: {shipping.address.postal_code}</p> */}
                      
                    
                      
                    </div>
      }
      </div>
             
      </div>
    </div>
  )
}

export default CheckoutSuccess
