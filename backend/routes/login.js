import express from "express";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js"
import { loginCustomer } from "../controllers/loginController.js"

const router = express.Router();
router.post("/", requiredValues(["emailAddress", "password"]), checkValidation, loginCustomer)    
export default router;