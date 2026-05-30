import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Helper function to create the JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user already exists (Requirement: Email must be unique)
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 2. Create the user (Password is hashed automatically in the Model)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // 3. Return user data and the JWT token as required
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id), // Send JWT after successful registration
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};