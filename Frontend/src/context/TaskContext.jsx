import { createContext, useContext, useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";
import AuthContext from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = AuthContext;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const addTask = async (taskData) => {
    const newTask = await createTask(taskData, token);
    setTasks([...tasks, newTask]);
  };

  const editTask = async (id, updatedData) => {
    const updatedTask = await updateTask(id, updatedData, token);
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const removeTask = async (id) => {
    await deleteTask(id, token);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
