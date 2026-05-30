import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 1. REGISTER A NEW USER (POST /api/auth/register)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Step A.1: Validate that all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Step A.2: Check if the user email already exists in the database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Step A.3: Securely hash the plain-text password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step A.4: Save the new user into MongoDB with the hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Step A.5: Sign a JSON Web Token (JWT) using your secret key
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Step A.6: Return user info and the token to the client
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 2. LOGIN USER (POST /api/auth/login)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step A.7: Validate inputs
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Step A.8: Find user by email in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step A.9: Compare the incoming plain-text password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step A.10: Generate and return JWT Token if credentials match
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;