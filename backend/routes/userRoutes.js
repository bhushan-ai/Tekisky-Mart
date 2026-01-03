import express from "express";
import {
  createUser,
  findUserByEmail,
  getProfile,
  login,
} from "../controller/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", createUser);
userRoutes.get("/find-user", findUserByEmail);
userRoutes.post("/login", login);
userRoutes.get("/profile/:email", getProfile);

// userRoutes.post("/updateUser/:id", updateUser);
// userRoutes.get("/getUser", getUser);
// userRoutes.delete("/deleteAll", deleteAllUser);

export default userRoutes;
