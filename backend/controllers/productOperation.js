import createError from "http-errors";
import Customer from "../models/customer.js";
import Product from "../models/product.js";

export const getCustomerData = async (req, res, next) => {
    const customerId = req.params.id;
    let foundCustomer; 
    
    try {
        foundCustomer = await Customer.findById(customerId);
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }
    if (foundCustomer) {
        await foundCustomer.populate("products", {
            _id: 1,
            productName: 1,
            price: 1,
            productDescription: 1,
            brand: 1,
            productImage: 1
        });

        // await foundCustomer.populate("products", {
        //     _id: 1,
        //     productName: 1,
        //     price: 1,
        //     productDescription: 1
        // });
        const customerData = {
            userName: foundCustomer.userName,
           products: foundCustomer.products,
            isAdmin: foundCustomer.isAdmin
        }

        res.json(customerData);
     } else {
        next(createError(404, "User could not be found"));
    }
}




export const getProductData = async (req, res, next) => {
    let foundProduct; 
    try {
        foundProduct = await Product.find({});
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }
    if (foundProduct) {
        
        res.json(foundProduct);
     } else {
        next(createError(404, "User could not be found"));
    }
}


export const getProductData1 = async (req, res, next) => {
    let foundProduct; 
    try {
        foundProduct = await Product.find({});
        // res.status(200).send(foundProduct)
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }
    if (foundProduct) {
        
        res.json(foundProduct);
     } else {
        next(createError(404, "User could not be found"));
    }
}











export const updateProducts = async (req, res, next) => {
    const productId = req.body.id;    
    const customerId = req.params.id;   
    let foundCustomer;
    try {
        foundCustomer = await Customer.findById(customerId);
    } catch {
        return next(createError(500, "Query could not be completed. Please try again"))
    }
    const foundProduct = foundCustomer.products.find(existingId => existingId == productId);

    if (!foundProduct) {
        let updatedCustomer;
        try {
            updatedCustomer = await Customer.findByIdAndUpdate(customerId, { $push: { products: productId }}, { new: true, runValidators: true });
        } catch {
            return next(createError(500, "User could not be updated. Please try again"));
        }

        await updatedCustomer.populate("products", {
            _id: 1,
            productName: 1,
            price: 1,
            productDescription: 1,
        })

        res.json({ products: updatedCustomer.products });
    } else {
        next(createError(409, "Product is already exists"));
    }
}

