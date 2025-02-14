import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { tasks } = useTasks();
  const { user, logout } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // 🔹 Filtered Tasks Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || task.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 🔹 Group tasks by status
  const groupedTasks = {
    pending: filteredTasks.filter((task) => task.status === "pending"),
    inProgress: filteredTasks.filter((task) => task.status === "in progress"),
    completed: filteredTasks.filter((task) => task.status === "completed"),
  };

  return (
    <div className="p-10 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">
          👋 Welcome, {user?.name}!
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-3 rounded-lg shadow-md w-full md:w-1/3 border focus:ring focus:ring-blue-300"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-lg shadow-md border focus:ring focus:ring-blue-300"
        >
          <option value="all">📌 All Statuses</option>
          <option value="pending">⏳ Pending</option>
          <option value="in progress">🚀 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-3 rounded-lg shadow-md border focus:ring focus:ring-blue-300"
        >
          <option value="all">📍 All Priorities</option>
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      {/* 🔹 Add Task Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        + Add Task
      </button>

      {/* 🔹 Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <TaskForm
              existingTask={editTask}
              onClose={() => {
                setShowForm(false);
                setEditTask(null);
              }}
            />
          </div>
        </div>
      )}

      {/* 🔹 Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div
            key={status}
            className="bg-white p-6 rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] border border-gray-300"
          >
            <h2
              className={`text-xl font-bold mb-4 text-center uppercase py-2 rounded-lg text-white ${
                status === "pending"
                  ? "bg-yellow-500"
                  : status === "inProgress"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            >
              {status.replace(/\b\w/g, (char) => char.toUpperCase())}
            </h2>
            <div className="space-y-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={(t) => {
                      setEditTask(t);
                      setShowForm(true);
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center italic">
                  No tasks found
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
