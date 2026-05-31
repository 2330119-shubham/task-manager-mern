import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// 1. Load Environment Variables
dotenv.config();

// 2. Import Routes (Ensure these file names match your GitHub files exactly)
import authRoutes from './authRoutes.js';
import taskRoutes from './taskRoutes.js';
import userRoutes from './userRoutes.js';

const app = express();

// 3. Middleware
app.use(express.json());
app.use(cors());

// 4. Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1); // Stop the server if DB fails
    });

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// 6. Basic Health Check (Helps Render see the app is alive)
app.get('/', (req, res) => {
    res.send('Task Manager API is running...');
});

// 7. Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
});
