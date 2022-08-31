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


    //res.status(201).json({id: newProduct._id, token: newToken})  
    // res.json({id: newProduct._id, token: newToken}) 
    res.json({product: newProduct, token: newToken})  
    
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



// export const deleteProduct = async (req, res, next) => {
//     const userId = req.params.id;
//     const albumId = req.params.albumId;

//     let updatedUser;

//     try {
//         // findByIdAndUpdate = change part of the document
//         // findByIdAndRemove = delete the full document!
//         // * Task 15 update: now we want to pull the item from the user's "albums" array which is EQUAL TO the albumId received in the request URL's params
//         updatedUser = await User.findByIdAndUpdate(userId, { $pull: { albums: albumId }}, { new: true, runValidators: true })
//     } catch {
//         return next(createError(500, "User could not be updated. Please try again"));
//     }

//     await updatedUser.populate("albums"); 

//     res.json({ albums: updatedUser.albums });
// }



export const deleteSelectedProduct = async (req, res, next) => {
    const customerId = req.params.id;
    const productId = req.params.productId;
  
    console.log('customerId', customerId)
    console.log('productId', productId)

    let productDeleted;

    try {
        // updatedCustomer = await Product.findByIdAndUpdate(productId, { $pull: { id: productId }}, { new: true, runValidators: true })
        productDeleted =  await Product.findByIdAndRemove(productId)
    } catch {
        return next(createError(500, "Product Could not be Deleted"));
    }
 console.log('productDeleted', productDeleted)
    //await updatedCustomer.populate("products"); 
    // await productDeleted.populate("products")
    //console.log('updatedCustomer55 :', updatedCustomer._id.toString())
    // res.json({ message: "Your Product has been successfully deleted!" });
    //res.json({ id: updatedCustomer._id.toString() });
   // updatedCustomer55 : new ObjectId("6308b4cb73f0e1c54792edc3")
   res.json({ product: productDeleted });
}


