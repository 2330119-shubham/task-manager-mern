import express from 'express';
import { registerUser, authUser } from './authController.js';
import User from './User.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);

export default router;
