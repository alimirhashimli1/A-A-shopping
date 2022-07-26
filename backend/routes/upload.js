import express from "express";
import cloudinary from "cloudinary"
import router from "./login";
import createError from "http-errors";
const router = express.Router();




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
 
router.post("/", (req, res)=>{


    try {
        
    } catch {
        return next(createError(500, "Could not Query Through DataBase . Please try again"));
    }

})


export default router;



