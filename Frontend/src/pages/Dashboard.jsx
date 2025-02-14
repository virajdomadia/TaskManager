import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { tasks } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { user, logout } = useContext(AuthContext);

  const groupedTasks = {
    pending: tasks.filter((task) => task.status === "pending"),
    inProgress: tasks.filter((task) => task.status === "in progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  return (
    <div className="p-10 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">
      {/* Header */}
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

      {/* Add Task Button */}
      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        + Add Task
      </button>

      {/* Task Form Modal */}
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

      {/* Task Columns */}
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
              {status.replace("-", " ")}
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
                <p className="text-gray-500 text-center italic">No tasks yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
