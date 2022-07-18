import express from "express";
import { countApplicants } from "../controllers/adminController.js";
import isAdmin from "../middleware/checkIsAdmin.js";

const router = express.Router();
router.use(isAdmin);
router.get("/:id/doc", countApplicants)  
export default router;