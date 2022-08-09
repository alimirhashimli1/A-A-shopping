//require('dotenv').config();
import Product from "../models/product.js";
import createError from "http-errors";
import cloudinary from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"



export const productsPost = async (req, res, next) => {
    
    const {productName, price, productDescription, brand } = req.body;
    
        
            const fileStr = req.body.data;
            const uplodResponse = await cloudinary.uploader.upload(fileStr, { upload_preset: 'aashopping' } )
      
        
        let newProduct = new Product({
            productName: productName,
            price: price,
            productDescription: productDescription,
            brand: brand,
            productImage:
            {avatar: uplodResponse.secure_url,
            cloudinary_id: uplodResponse.public_id,}
           });
           try {
           await newProduct.save();
            //res.json(newProduct);
 
    
        } catch (error) {
           
            return next(createError(500, "Something went wrong"));
        }


        let newToken;

        try {
            newToken = jwt.sign({ id: newProduct.id }, process.env.SECRET_KEY, { expiresIn: "1h" } )
            res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" });
    //         res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" });
        } catch  {
            return next(createError(500, "Signup could not be completed. Please try again"));

        }


    res.status(201).json({id: newProduct._id, token: newToken})  
}




export const getProductData = async (req, res, next) => {
    let foundProduct; 
    // const { resources } = await cloudinary.search
    // .expression('folder:aashopping')
    // .sort_by('public_id', 'desc')
    // .max_results(30)
    // .execute();

    // const publicIds = resources.map((file) => file.public_id);
    // res.send(publicIds);

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


