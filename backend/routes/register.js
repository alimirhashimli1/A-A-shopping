import express from "express";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js"
import registerValidator from "../validators/registerValidators.js"
import { registerCustomer } from "../controllers/registerController.js"


const router = express.Router()

router.post("/", requiredValues(["userName", "password", "emailAddress"]), registerValidator(), checkValidation, registerCustomer);

export default router;