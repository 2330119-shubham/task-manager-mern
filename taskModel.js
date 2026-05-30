import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, default: "medium" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;