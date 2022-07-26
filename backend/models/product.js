import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productDescription: { type: String, required: true},
    brand: { type: String, required: true },
    productImage: {
        avatar: String,
        cloudinary_id: String,
        
      },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;