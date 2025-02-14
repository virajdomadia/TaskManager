import axios from "axios";

const API = "http://localhost:5000/api/tasks"; // ✅ Ensure consistency with backend

// 🔹 Helper function for headers
const getHeaders = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "", // ✅ Prevents "undefined" token
  },
});

// 🔹 GET Tasks
export const getTasks = async (token) => {
  if (!token) return []; // ✅ Avoid request if token is missing
  try {
    const res = await axios.get(API, getHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.response?.data || error);
    return []; // ✅ Return empty array instead of throwing error
  }
};

// 🔹 CREATE Task
export const createTask = async (taskData, token) => {
  if (!token) return null; // ✅ Avoid request if token is missing
  try {
    const res = await axios.post(API, taskData, getHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error);
    return null; // ✅ Prevent app crash
  }
};

// 🔹 UPDATE Task
export const updateTask = async (id, updatedData, token) => {
  if (!token) return null;
  try {
    const res = await axios.put(`${API}/${id}`, updatedData, getHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Error updating task:", error.response?.data || error);
    return null;
  }
};

// 🔹 DELETE Task
export const deleteTask = async (id, token) => {
  if (!token) return false;
  try {
    await axios.delete(`${API}/${id}`, getHeaders(token));
    return true;
  } catch (error) {
    console.error("Error deleting task:", error.response?.data || error);
    return false;
  }
};
