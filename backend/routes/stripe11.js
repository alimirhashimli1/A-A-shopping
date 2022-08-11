import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";


dotenv.config();

const stripe = Stripe(process.env.STRIPE__SECRET_KEY)

const router = express.Router()

// router.post('/create-checkout-session', async (req, res) => {
  router.post('/create-checkout-session', async (req, res) => {
    // const userLoginId = req.params.id;
const customer = await stripe.customer.create({
  metadata:{
    userId: req.body.currentCustomerId,
    cart: JSON.stringify(req.body.cart)
  }
})

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
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/card`,
    });
  
    res.send({url: session.url});
  });




  //webhook



// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret

// endpointSecret = "whsec_7a70d7ec478f5c26321913f7258e65915ff8471742aec78fcf4a7dbae1fbb6a4";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = request.headers['stripe-signature'];

let data;
let eventType;

  if(endpointSecret){

  
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log('check WebHook')
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  data = event.data.object;
  eventType = event.type;
}else{
 data = req.body.data.object;
 eventType = req.body.type;
}

  // Handle the event
  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntent = event.data.object;
      
  //     break;
   
  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // Return a 200 response to acknowledge receipt of the event




if(eventType === 'checkout.session.completed'){
stripe.customer.retrieve(data.customer).then(
  (customer)=>{
console.log(customer)
console.log('data: ', data)
  }
).catch(err => console.log(err.message))
}


  response.send().end();
});



  export default router