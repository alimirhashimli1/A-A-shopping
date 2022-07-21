import express from "express";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js"
import { loginCustomer } from "../controllers/loginController.js"
import authorizeCustomer from "../middleware/authorizeCustomer.js";
import { getLoginProductData } from "../controllers/loginController.js"

const router = express.Router();
//router.use(authorizeCustomer);
router.get("/", getLoginProductData);  
router.post("/", requiredValues(["emailAddress", "password"]), checkValidation, loginCustomer)    
export default router;