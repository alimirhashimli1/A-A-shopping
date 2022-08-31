import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: { type: String },
    customerId: { type: String },
    name: { type: String },
    email: { type: String },
    paymentIntentId: { type: String },
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    // delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
    // created_at: { Date }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;