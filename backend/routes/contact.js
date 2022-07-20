import express from "express";
import { contactPost } from "../controllers/contactController.js";
import requiredValues from "../validators/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import contactValidator from "../validators/contactValidator.js";


const router = express.Router();

router.post("/", requiredValues(["emailAddress", "phoneNumber", "yourMessage"]), contactValidator(), checkValidation, contactPost)

export default router