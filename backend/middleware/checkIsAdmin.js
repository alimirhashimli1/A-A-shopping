import createError from "http-errors";
import jwt from "jsonwebtoken";
import Customer from "../models/customer.js";

const isAdmin = async (req, res, next) => {
    let token;

    try {
        token = req.cookies.dataCookie;
        if (!token) {
           throw new Error("Customer unauthorized"); 
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        let currentCustomer;
        try {
            currentCustomer = await Customer.findById(decodedToken.id)
        } catch {
            return next(createError(500, "Couldn't query the database. Please try again"));
        }
        if (currentCustomer && currentCustomer.isAdmin) {
            next();
        } else {
            throw new Error("Customer unauthorized");
        }
    } catch {
        next(createError(403, "Customer could not be authorized. Please try again"));
    }
}

export default isAdmin;