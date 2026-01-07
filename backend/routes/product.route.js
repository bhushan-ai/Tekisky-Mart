import express from "express";
import {
  addProduct,
  handleImage,
  updateProductDetail,
} from "../controller/Admin/product.controller.js";
import { upload } from "../middleware/cloudinary.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const productRoute = express.Router();

productRoute.post("/upload-image", upload.single("product-img"), handleImage);

productRoute.post("/add-product", jwtAuth, addProduct);
productRoute.post("/edit-product/:id", jwtAuth, updateProductDetail);

export default productRoute;
