import Customer from "../models/customer.js"
import createError from "http-errors"
import jwt from "jsonwebtoken"

export const registerCustomer = async(req, res, next) => {
    const {userName, password, emailAddress} = req.body

    let foundCustomer

    try { 
        foundCustomer = await Customer.findOne({userName: userName})
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    if(foundCustomer){
        return next(createError(500, "Username has already been taken. Please try a different username"))
    }

    let foundEmail

    try {
        foundEmail = await Customer.findOne({emailAddress: emailAddress})
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"))
    }

    if(foundEmail){
        return next(createError(412, "Email address has already been used to create an account. Please try a different email address"));
    }



        const newCustomer = new Customer({
            userName:userName,
            emailAddress: emailAddress,
            password:password,
          isAdmin: false,
            products: []
        });

        try {  
            await newCustomer.save();
        } catch  {
            return next(createError(500, "User could not be created. Please try again"));
        }

        let newToken;

        try {
            newToken = jwt.sign({ id: newCustomer.id }, process.env.SECRET_KEY, { expiresIn: "1h" } )
            res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" });
        } catch  {
            return next(createError(500, "Signup could not be completed. Please try again"));

        }


    res.status(201).json({id: newCustomer._id, token: newToken})
}