import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.js"


dotenv.config();

const stripe = Stripe(process.env.STRIPE__SECRET_KEY)

const router = express.Router()
  router.post('/create-checkout-session', async (req, res) => {
    console.log("req.body.userId", req.body.userId)
const customer = await stripe.customers.create({
  // email:'sssss@yahoo.com',
  metadata:{
    userId: req.body.userId,
    
  },
  })




console.log('customer =: ', customer.metadata.userId)

const customerMetaId = customer.metadata.userId;

const line_items = req.body.cart.map(item =>{
  return{
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.productName,
        images: [item.productImage.avatar],
        description: item.productDescription,
        metadata:{
          id: item._id
        }
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }
})


    const session = await stripe.checkout.sessions.create({


      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'DE'],
      },
     
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'usd',
            },
            display_name: 'Free shipping',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            }
          }
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 1500,
              currency: 'usd',
            },
            display_name: 'Next day air',
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 1,
              },
            }
          }
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
        customer: customer.id,
      // customer: 

      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/card`,
    });
  
    res.send({url: session.url});
  });

// Create Order


const createOrder = async(customer, data, lineItems)=>{
  console.log('createOrderlineItems', lineItems)
  console.log('createOrdercustomer', customer)
  console.log('createOrderdata', data)
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    name: data.shipping.name,
    email: data.customer_details.email,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
    // created_at: Date,

  })
  console.log('newOrder', newOrder)
  try{
    const savedOrder = await newOrder.save()
    console.log("order Saved : ", savedOrder)

  }catch(err){
console.log(err)
  }
}




  //webhook


 let endpointSecret ;
// endpointSecret = "whsec_7a70d7ec478f5c26321913f7258e65915ff8471742aec78fcf4a7dbae1fbb6a4";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
let data;
let eventType;

  if(endpointSecret){
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("WebHook Succeed", event)
  } catch (err) {
    console.log(`WebHook Error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

data = event.data.object;
eventType = event.type;

}else{
data = req.body.data.object;
eventType = req.body.type;
console.log('webHookData', data)
}


if(eventType === "checkout.session.completed"){
stripe.customers.retrieve(data.customer)
.then((customer)=>{
  // console.log('lineItems', lineItems)
  // console.log('customer', customer)
  // console.log('data', data)
     stripe.checkout.sessions.listLineItems(
      data.id,
      {  },
      function(err, lineItems) {
     
      createOrder(customer, data, lineItems )
      console.log('lineItems', lineItems)
      console.log('customer', customer)
      console.log('data', data)
      }
    );




// createOrder(customer, data)

  }
).catch(err => console.log(err.message))
}




  res.send().end();
});





  export default router