const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 CREATE Task
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status, priority } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }

  try {
    const task = await Task.create({
      userId: req.user._id, // Ensure correct user ID reference
      title,
      description,
      status: status || "Pending",
      priority: priority || "Low",
    });
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// 🔹 GET Tasks (Fix: Ensure correct user ID reference)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({
      createdAt: -1,
    }); // `_id` instead of `id`
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// 🔹 UPDATE Task (Fix: `_id` reference and validation)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== req.user._id.toString()) {
      // Ensure string comparison
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// 🔹 DELETE Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
