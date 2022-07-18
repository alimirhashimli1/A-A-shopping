import createErr from "http-errors";
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
import Customer from "../models/customer.js";

export const loginCustomer = async (req, res, next) =>{
    const { emailAddress, password} = req.body
    let customerFound
    try{
        customerFound= await Customer.findOne({ emailAddress: emailAddress });

    }catch{
        return next(createErr(500, "Email is not found in database"));
    }
    if(customerFound){
        let customerPassword;
        try{   
            customerPassword = await bcrypt.compare(password, customerFound.password);
        }catch{
            return next(createErr(500, "Password is not correct. Please try again"));
        }
        let newToken;

        try {
            newToken = jwt.sign({ id: customerFound.id }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.cookie("dataCookie", newToken, { httpOnly: true, sameSite: "Strict" } )
        } catch {
            return next(createErr(500, "Could not Sign Up. Please try again"));
        }

        res.json({ id: customerFound._id, token: newToken });
    } else {
        next(createErr(404, "Customer with this email is not exist. Please try again"));
    }
}

