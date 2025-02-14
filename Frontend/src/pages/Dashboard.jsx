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
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}!
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-all"
        >
          Logout
        </button>
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="mb-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-md transition-all"
      >
        + Add Task
      </button>

      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
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

      <div className="grid grid-cols-3 gap-6">
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <div key={status} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 capitalize text-center">
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
                <p className="text-gray-500 text-center">No tasks</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
