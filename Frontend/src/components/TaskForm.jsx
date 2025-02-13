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

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      editTask(existingTask._id, task);
    } else {
      addTask(task);
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4">
        {existingTask ? "Edit Task" : "New Task"}
      </h2>
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
        <option value="in-progress">In Progress</option>
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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        {existingTask ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default TaskForm;
