import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { username, email, mobileNo, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if (!username || !email || !mobileNo || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      mobileNo,
      password: hashPass,
    });
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error in creating User", error: error.message });
  }
};

export const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    return res.status(201).json({
      success: true,
      message: "User fetched successful",
      user: user,
    });
  } catch (error) {
    console.log("Error in finding user by Email!", error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) {
      res.status(401).json({
        success: true,
        message: "password incorrect",
      });
    }

    const token = jwt.sign(
      { email: user.email, password: user.password },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "Login successful",
      user: user,
      token,
    });
  } catch (error) {
    console.log("Error in login user!", error);
  }
};

//authenticate user

export const getProfile = async (req, res) => {
  try {
    const { email } = req.params;

    const bearerTokenHeader = req.headers.authorization;

    if (!bearerTokenHeader) {
      console.log(`bearer not found`);
    }
    const token = bearerTokenHeader.split(" ")[1];
    console.log("token", token);

    const decodeUser = jwt.verify(token, process.env.SECRET);

    if (decodeUser.email === email) {
      const user = await User.findOne({ email: email });

      req.user = decodeUser;
      return res.status(200).json({
        success: true,
        message: "profile fetched successful",
        user: user,
        token: token,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Unauthorized User",
      });
    }
  } catch (error) {
    console.log("Error in login user!", error);
  }
};
