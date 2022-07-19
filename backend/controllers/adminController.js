import createError from "http-errors";
import Customer from "../models/customer.js";

export const countUsers = async (req, res, next) => {
    let numOfDocuments;
    try {
        numOfDocuments = await Customer.countDocuments({});
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numOfDocuments });
}