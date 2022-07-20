import mongoose from "mongoose";

const {Schema} = mongoose;

const contactSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailAddress: {type: String, required: true},
    phoneNumber: {type: String},
    yourMessage: {type: String}
})

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;