import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";


dotenv.config();

const stripe = Stripe(process.env.STRIPE__SECRET_KEY)

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
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
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/card`,
    });
  
    res.send({url: session.url});
  });


  export default router