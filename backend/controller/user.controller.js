import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

//creating token
function createJwtToken(id) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "1d",
  });
}

//Creating user/Admin
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(400).json({
        message: "User already existed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (!user) {
      res.status(404).json({
        message: "user not created!",
      });
    }

    res.status(201).json({
      message: "Registration Successfully Done!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occur in register",
    });
    console.log(error);
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "All fields are Required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const userPassword = user.password;

    const matchPassword = await bcrypt.compare(password, userPassword);

    if (!matchPassword) {
      res.status(400).json({ message: "Password is incorrect" });
    }

    const token = createJwtToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, //1d
    });

    res.status(200).json({
      success: true,
      message: "Login done Successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

//logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(0),
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Logging out",
    });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "All fields are required",
      });
    }

    const userId = req.user._id;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        password,
      },
      {
        new: true,
      }
    );

    if (!user) {
      res.status(400).json({
        message: "User not Found",
      });
    }

    res.status(200).json({
      message: "user details are updated",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};
