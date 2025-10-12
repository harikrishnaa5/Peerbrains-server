import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/multer.js";
const productRouter = express.Router();

productRouter.get("/", productController.findAll);
productRouter.post("/", authMiddleware, roleMiddleware, upload.single("image"), productController.create);
productRouter.put("/:id", authMiddleware, roleMiddleware, upload.single("image"), productController.update);
productRouter.delete("/:id", authMiddleware, roleMiddleware, productController.delete);

export default productRouter;
