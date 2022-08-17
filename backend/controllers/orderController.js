import createErr from "http-errors";
import jwt  from "jsonwebtoken";
import Order from "../models/order.js";



export const getOrder = async (req, res, next) => {
    let foundProduct; 
    try {
        // foundProduct = await Order.findLast({});
        foundProduct = await Order.find().sort({_id:-1}).limit(1)
        console.log('fetchShipping : ', foundProduct)
    } catch {
        return next(createErr(500, "Couldn't query database. Please try again"));
    }
    if (foundProduct) {
        
        res.json(foundProduct);
     } else {
        next(createErr(404, "User could not be found"));
    }
}

