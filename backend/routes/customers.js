import express from "express";
import { getCustomerData, updateProducts } from "../controllers/productOperation.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import authorizeCustomer from "../middleware/authorizeCustomer.js";

const router = express.Router();


// router.use(authorizeCustomer);

router.get("/:id", getCustomerData);    
router.patch("/:id/products", requiredValues(["id"]), checkValidation, updateProducts);  

export default router;