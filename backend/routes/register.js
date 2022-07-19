import express from "express";
import checkValidation from "../validators/checkValidation";
import requiredValues from "../validators/requiredValues.js"
import registerValidator from "../validators/registerValidators.js"
import { registerCustomer } from "../controllers/registerController.js"


const router = express.Router()

router.post("/", requiredValues(["username", "password", "emailAddress"]), registerValidator, checkValidation, registerCustomer);

export default router;