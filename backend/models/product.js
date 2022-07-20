import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    productDescription: { type: String, required: true}
});

const Product = mongoose.model("Product", productSchema);

export default Product;