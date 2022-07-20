import express from "express";
import { countCustomers } from "../controllers/adminController.js";
import isAdmin from "../middleware/checkIsAdmin.js";

const router = express.Router();
router.use(isAdmin);
router.get("/:id/doc", countCustomers)  
export default router;