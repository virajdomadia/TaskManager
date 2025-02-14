import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  // 🔹 Function to confirm deletion
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(task._id);
    }
  };

  // 🔹 Status badge styling
  const getStatusStyles = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-500 text-white";
      case "in-progress":
        return "bg-yellow-500 text-white";
      case "pending":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <span
          className={`px-2 py-1 text-xs font-bold rounded ${getStatusStyles()}`}
        >
          {task.status}
        </span>
      </div>
      <div className="space-x-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
