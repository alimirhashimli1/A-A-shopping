import express from "express";
import { productsPost } from "../controllers/productController.js";
import { getProductData } from "../controllers/productOperation.js"
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import productValidator from "../validators/productValidator.js";
import authorizeCustomer from "../middleware/authorizeCustomer.js";

const router = express.Router();
router.use(authorizeCustomer);
router.get("/", getProductData);   
router.post("/", requiredValues(["productName", "productDescription"]), productValidator(), checkValidation, productsPost);    
export default router;