import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


import globalErrorHandler from "./middleware/globalErrorHandler.js";
import adminRouter from "./routes/admin.js";
import registerRouter from "./routes/register.js"
import loginRouter from "./routes/login.js"
import customersRouter from "./routes/customers.js";
import productsRouter from "./routes/products.js";

const app = express();
dotenv.config();

//bava.dci@gmail.com
//gmailpassword: Yx111222!
//MondoDBAcountPassword: YX111222!
//DataBasePassword:aashopping1234
//mongodb+srv://bava:<password>@cluster0.tedzt.mongodb.net/?retryWrites=true&w=majority


mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tedzt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/admin", adminRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/customers", customersRouter);
app.use("/products", productsRouter);


app.use(globalErrorHandler);
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server has started on port ${process.env.port || 3001}!`);
})