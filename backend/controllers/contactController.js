import Contact from "../models/contact.js"
import createError from "http-errors";

export const contactPost = async(req, res, next) => {
    
    let newMessage

    try {
        newMessage = new Contact(req.body)
        await newMessage.save()
    } catch {
        return next(createError(500, "Could not send the message. Please try again!"))
    }

    res.status(201).json({id: newMessage._id})
}