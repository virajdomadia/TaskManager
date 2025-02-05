import { useState, useEffect } from "react";
import API from "../utils/api";

const TaskForm = ({
  fetchTasks,
  editingTask,
  setEditingTask,
  closeEditForm,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        // If editing, update the task
        await API.put(`/tasks/${editingTask._id}`, {
          title,
          description,
          status,
          priority,
        });
      } else {
        // If creating new task
        await API.post("/tasks", {
          title,
          description,
          status,
          priority,
        });
      }

      fetchTasks();
      closeEditForm(); // Close the form after editing or creating the task
      setTitle("");
      setDescription("");
      setStatus("Pending");
      setPriority("Low");
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded">
      <h3 className="text-lg font-bold mb-2">
        {editingTask ? "Edit Task" : "Add Task"}
      </h3>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="border p-2 w-full rounded mb-2"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        className="border p-2 w-full rounded mb-2"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
