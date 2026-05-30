import Task from '../models/taskModel.js';

// @desc    Get all tasks for logged in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }); // Filters by owner [cite: 31, 43]
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    const task = await Task.create({ 
      user: req.user._id, // Assigns current user as owner [cite: 9, 35]
      title, 
      description, 
      priority, 
      dueDate 
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add similar ownership checks to updateTask and deleteTask [cite: 33, 47]