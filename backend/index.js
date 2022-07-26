import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload"
import cloudinary  from './utils/cloudinary.js'

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import adminRouter from "./routes/admin.js";
import registerRouter from "./routes/register.js"
import loginRouter from "./routes/login.js"
import customersRouter from "./routes/customers.js";
import productsRouter from "./routes/products.js";
import multer from "multer";
import upload from "./utils/multer.js";
//import path from "path";

import dotenv from "dotenv";

const app = express();
dotenv.config();

//aashopping.dci@gmail.com
//gmailpassword: Yx111222!
//MondoDBAcountPassword: YX111222!
//DataBasePassword:aashopping1234
//mongodb+srv://bava:<password>@cluster0.tedzt.mongodb.net/?retryWrites=true&w=majority

//mongodb+srv://aashopping:<password>@cluster0.bzvfds3.mongodb.net/?retryWrites=true&w=majority
//cloudinaryPassword: Yx111222!


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bzvfds3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//app.use(cors())
app.use(cookieParser());

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({extended: true, limit: '50mb'}))


app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({extended: true, limit: "250mb"}))
app.use(morgan("tiny"));
//app.use(fileUpload({useTempFiles: true}))

app.use("/admin", adminRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/customers", customersRouter);
app.use("/products", productsRouter);







app.use(globalErrorHandler);
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})