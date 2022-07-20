import createError from "http-errors";
import Customer from "../models/customer.js";

export const getCustomerData = async (req, res, next) => {
    const customerId = req.params.id;
    let foundCustomer; 
    
    try {
        foundCustomer = await Customer.findById(customerId);
    } catch {
        return next(createError(500, "Couldn't query database. Please try again"));
    }
    if (foundCustomer) {
        // await foundCustomer.populate("products", {
        //     _id: 1,
        //     productName: 1,
        //     price: 1,
        //     productDescription: 1
        // });
        const customerData = {
            userName: foundCustomer.userName,
           // products: foundCustomer.products,
            isAdmin: foundCustomer.isAdmin
        }

        res.json(customerData);
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


export const deleteProduct = async (req, res, next) => {
    const customerId = req.params.id;
    const productId = req.params.productId;

    let updatedCustomer;

    try {
        updatedCustomer = await Customer.findByIdAndUpdate(customerId, { $pull: { products: productId }}, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "Product Could not be Deleted"));
    }

    await updatedCustomer.populate("products"); 

    res.json({ products: updatedCustomer.products });
}




export const deleteProducts = async (req, res, next) => {
    const customerId = req.params.id;
    let updatedCustomer;
    try {
        updatedCustomer = await Customer.findByIdAndUpdate(customerId, { products: [] }, { new: true, runValidators: true })
    } catch {
        return next(createError(500, "Could delete the products"));
    }
    res.json(updatedCustomer.products);
}
