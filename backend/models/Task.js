const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "low",
  },
});

module.exports = mongoose.model("Task", TaskSchema);
