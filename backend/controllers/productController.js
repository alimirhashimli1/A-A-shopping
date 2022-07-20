import Product from "../models/product.js";
import createError from "http-errors";

export const productsPost = async (req, res, next) => {
    
    let existingProduct;
    try {
        existingProduct = await Product.findOne(req.body);
    } catch {
        return next(createError(500, "Could not Query Through DataBase . Please try again"));
    }
    if (existingProduct) {
        res.json({ id: existingProduct._id });
    } else {
        let newProduct;
        try {
            newProduct = new Product(req.body);
            await newProduct.save();
        } catch {
            return next(createError(500, "Could not Create the New Product. Please try again"));
        }
        
        res.json({ id: newProduct._id });
    }
}