import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(400).json({ message: "token is not present" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password"); 

    if (!user) {
      res.status(400).json({ message: "user no longer Exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid or Expire token" });
  }
};