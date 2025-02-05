import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard"; // Your TaskCard component
import TaskForm from "./TaskForm"; // Import TaskForm
import API from "../utils/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null); // State for current task being edited

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data); // Assuming the tasks are in response.data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const editTask = (task) => {
    setEditingTask(task); // Set task to be edited
  };

  const closeEditForm = () => {
    setEditingTask(null); // Close the task edit form
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Group tasks based on their status
  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Task Dashboard</h1>

      {/* Conditionally render TaskForm when editing a task */}
      {editingTask && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <TaskForm
              fetchTasks={fetchTasks}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              closeEditForm={closeEditForm}
            />
            <button
              onClick={closeEditForm}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
            >
              Close Edit Form
            </button>
          </div>
        </div>
      )}

      {/* Task columns */}
      <div className="flex space-x-4">
        <div className="w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Pending</h2>
          {pendingTasks.length === 0 ? (
            <p>No tasks pending.</p>
          ) : (
            pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={editTask} // Pass edit function
                onDelete={deleteTask} // Pass delete function
              />
            ))
          )}
        </div>

        <div className="w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">In Progress</h2>
          {inProgressTasks.length === 0 ? (
            <p>No tasks in progress.</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

        <div className="w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Completed</h2>
          {completedTasks.length === 0 ? (
            <p>No tasks completed.</p>
          ) : (
            completedTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={editTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
