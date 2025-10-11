import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./db.js";
import authRouter from "./routers/authRoute.js";
import productRouter from "./routers/productRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/auth", authRouter);
app.use("/product", productRouter);

app.listen(port, () => {
    console.log("Listening at port: " + port);
});
