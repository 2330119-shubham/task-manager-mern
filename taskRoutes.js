import express from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from './taskController.js'; // Removed ../controllers/
import { protect } from './authMiddleware.js'; // Removed ../middleware/

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;
