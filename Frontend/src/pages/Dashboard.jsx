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

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <button
        onClick={() => setShowForm(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + Add Task
      </button>
      {showForm && (
        <TaskForm
          existingTask={editTask}
          onClose={() => {
            setShowForm(false);
            setEditTask(null);
          }}
        />
      )}
      <div className="grid gap-4">
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
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
