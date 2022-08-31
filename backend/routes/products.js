import express from "express";
import { productsPost } from "../controllers/productController.js";
import { getProductData, deleteSelectedProduct } from "../controllers/productController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import productValidator from "../validators/productValidator.js";
import authorizeCustomer from "../middleware/authorizeCustomer.js";

import upload from "../utils/multer.js";


const router = express.Router();
//router.use(authorizeCustomer);
router.get("/", getProductData);   
//router.post("/", requiredValues(["productName", "price", "productDescription", "brand"]), productValidator(), checkValidation, productsPost1);    
router.post("/", upload.single('image'), requiredValues(["productName", "price", "productDescription", "brand"]), productValidator(), checkValidation, productsPost);    
router.delete("/:productId", deleteSelectedProduct);  
export default router;