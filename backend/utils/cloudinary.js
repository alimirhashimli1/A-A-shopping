
import dotenv from "dotenv";
dotenv.config();
import {v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: 'dnuo2xdss',
   api_key: '599315957325637',
   api_secret: 'Tg7aTcmvuEMgj-p1QfGcDcHR3ec',
});

export default cloudinary; 

