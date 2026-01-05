import express from "express";
import { handleImage } from "../controller/Admin/product.controller.js";
import { upload } from "../middleware/cloudinary.js";

const productRoute = express.Router();

productRoute.post("/upload-image", upload.single("product-img"), handleImage);

export default productRoute;
