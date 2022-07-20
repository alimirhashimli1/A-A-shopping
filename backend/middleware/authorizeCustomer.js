import createError from "http-errors";
import jwt from "jsonwebtoken";

const authorizeCustomer = (req, res, next) => {
    let token;
    try {
        token = req.cookies.dataCookie;
        if (!token) {
           throw new Error("Customer unauthorized"); 
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch {
        next(createError(403, "Customer could not be authorized. Please try again"));
    }
}

export default authorizeCustomer;