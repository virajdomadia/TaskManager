import { useState } from "react";
import { useTasks } from "../context/TaskContext";

const TaskForm = ({ existingTask, onClose }) => {
  const { addTask, editTask } = useTasks();
  const [task, setTask] = useState(
    existingTask || {
      title: "",
      description: "",
      status: "pending",
      priority: "low",
    }
  );
  const [error, setError] = useState(""); // 🔹 Store validation errors

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔹 Validate input
    if (!task.title.trim() || !task.description.trim()) {
      setError("Title and Description are required.");
      return;
    }

    try {
      if (existingTask) {
        await editTask(existingTask._id, task);
      } else {
        await addTask(task);
      }
      onClose();
    } catch (err) {
      setError("Failed to save task. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4">
        {existingTask ? "Edit Task" : "New Task"}
      </h2>

      {/* 🔹 Show Error Messages */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
      />
      <select
        name="status"
        value={task.status}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="w-full p-2 mb-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* 🔹 Action Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {existingTask ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-400 text-white py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
