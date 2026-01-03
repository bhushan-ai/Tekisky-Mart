import express from "express";
import {
  login,
  logout,
  register,
  updateUser,
} from "../controller/user.controller.js";
import { jwtAuth } from "../middleware/jwtAuth.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);
userRoute.post("/update-user", jwtAuth, updateUser);

userRoute.get("/profile", jwtAuth, (req, res) => {
  res.status(200).json({
    message: "Profile",
    user: req.user,
  });
});

export default userRoute;
