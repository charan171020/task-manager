const express = require("express");
const router = express.Router();
const Task = require("../models/Task"); // ✅ CORRECT IMPORT
const authMiddleware = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);

    const { title, description, status, priority, dueDate } = req.body;

    const task = new Task({
      title,
      description: description || "",
      status: status || "pending",
      priority: priority || "medium",
      dueDate,
      userId: req.user.id || req.user._id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: "Error creating task" });
  }
});

// GET TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id || req.user._id,
    }).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id || req.user._id,
      },
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
});

// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id || req.user._id,
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;