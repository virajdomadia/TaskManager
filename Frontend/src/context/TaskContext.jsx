import { createContext, useContext, useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";
import { useAuth } from "./AuthContext"; // ✅ Use `useAuth` instead of direct import

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useAuth(); // ✅ Correct way to access token
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (!token) return; // ✅ Prevents making API calls if token is missing
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]); // ✅ Will refetch when token changes

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const editTask = async (id, updatedData) => {
    try {
      const updatedTask = await updateTask(id, updatedData, token);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
