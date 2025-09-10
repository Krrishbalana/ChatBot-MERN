import { hash, compare } from "bcrypt";
import User from "../models/user.model.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";
import { config } from "dotenv";
config();

/**
 * Get all users (for testing/admin)
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

/**
 * User Signup
 */
export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({
        message: "ERROR",
        cause: "User with same email already exists",
      });

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Create JWT token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set cookie
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      signed: true,
      secure: true, // must be true in production (HTTPS)
      sameSite: "None", // allows cross-domain cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

/**
 * User Login
 */
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(409).json({
        message: "ERROR",
        cause: "No account with given emailID found",
      });

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(403)
        .json({ message: "ERROR", cause: "Incorrect Password" });

    // Create JWT token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set cookie for cross-domain auth
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

/**
 * Verify User Status (Auth Check)
 */
export const verifyUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res.status(401).json({
        message: "ERROR",
        cause: "User doesn't exist or token malfunctioned",
      });

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: "ERROR", cause: "Permissions didn't match" });
    }

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};

/**
 * Logout User
 */
export const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res.status(401).json({
        message: "ERROR",
        cause: "User doesn't exist or token malfunctioned",
      });

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: "ERROR", cause: "Permissions didn't match" });
    }

    // Clear cookie
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "ERROR", cause: err.message });
  }
};
