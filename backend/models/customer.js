import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;
const customerSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { timestamps: true });
customerSchema.pre("save", async function(next) {
    const securePassword = await bcrypt.hash(this.password, 12);
    this.password = securePassword;
    next();
})

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;