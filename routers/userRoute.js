import express from "express";
const userRouter = express.Router();
import userController from "../controllers/userController.js";

userRouter.get("/", userController.findAll);

export default userRouter;
