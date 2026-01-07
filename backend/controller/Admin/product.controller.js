import { imageUploadToCloudinary } from "../../middleware/cloudinary.js";
import Product from "../../model/product.model.js";
import User from "../../model/user.model.js";

//Taking Image
export const handleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    const bufferFile = req.file;
    const b64 = Buffer.from(bufferFile.buffer).toString("base64");
    const url = `data:${bufferFile.mimetype};base64,${b64}`;
    const imgUrl = await imageUploadToCloudinary(url);

    if (imgUrl === null) {
      return res
        .status(404)
        .json({ success: false, message: "Image url not created" });
    }
    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      url: imgUrl.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error occur while uploading image",
      error: error.message,
    });
  }
};

//Adding Product
export const addProduct = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User Id not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "Admin") {
      return res
        .status(404)
        .json({ success: false, message: "User is not Admin" });
    }

    //product add
    const {
      name,
      description,
      image,
      price,
      salePrice,
      rating,
      stock,
      category,
    } = req.body;

    if (!name || !description || !image || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All info required",
      });
    }

    const productAdded = await Product.create({
      name,
      description,
      image,
      price,
      salePrice,
      rating,
      stock,
      category,
    });
    res
      .status(201)
      .json({ success: true, message: "Product added", data: productAdded });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error occur while uploading product",
      error: error.message,
    });
  }
};


//Updating Product Details
export const updateProductDetail = async (req, res) => {
  try {
    //Getting User
    const userId = req.user?._id;
    if (!userId) {
      res.status(404).json({ success: false, message: "User Id not found" });
    }
    //Checking User Exist or not
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    //Checking the user is ADMIN or not
    if (user.role !== "Admin") {
      res.status(404).json({ success: false, message: "User is not Admin" });
    }

    //getting product id from params for updating the product
    const { productId } = req.params;

    //Checking product Id is available or not
    if (productId) {
      res.status(404).json({ success: false, message: "Product Id not found" });
    }

    const updatedProduct = await Product.findById(productId);

    //Checking product is available or not
    if (!updatedProduct) {
      res.status(404).json({ success: false, message: "Product not found" });
    }

    //Getting product Details from body
    const {
      name,
      description,
      image,
      price,
      salePrice,
      rating,
      stock,
      category,
    } = req.body;

    //Checking the product details
    if (!name || !description || !image || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All info required",
      });
    }

    //updating product Details
    updatedProduct.name = name ? name : updatedProduct.name;
    updatedProduct.description = description
      ? description
      : updatedProduct.description;
    updatedProduct.image = image ? image : updatedProduct.image;
    updatedProduct.price = price ? price : updatedProduct.price;
    updatedProduct.salePrice = salePrice ? salePrice : updatedProduct.salePrice;
    updatedProduct.rating = rating ? rating : updatedProduct.rating;
    updatedProduct.stock = stock ? stock : updatedProduct.stock;
    updatedProduct.category = category ? category : updatedProduct.category;

    await updatedProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server side error occur while Updating product",
      error: error.message,
    });
  }
};
