import express from "express";
import {
  addProduct,
  deleteAllProducts,
  deleteProduct,
  fetchAllProduct,
  handleImage,
  updateProductDetail,
} from "../controller/Admin/product.controller.js";
import { upload } from "../middleware/cloudinary.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const productRoute = express.Router();

productRoute.post("/upload-image", upload.single("product-img"), handleImage);

productRoute.post("/add-product", jwtAuth, addProduct);
productRoute.post("/edit-product/:id", jwtAuth, updateProductDetail);
productRoute.delete("/delete-one/:id", jwtAuth, deleteProduct);
productRoute.delete("/delete-all", jwtAuth, deleteAllProducts);
productRoute.get("/all", fetchAllProduct);

export default productRoute;
