import { useTasks } from "../context/TaskContext";
import {
  PencilSquareIcon,
  TrashIcon,
  FlagIcon,
} from "@heroicons/react/24/solid";

const TaskCard = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  // Confirm before deleting
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      removeTask(task._id);
    }
  };

  // Status badge styling
  const getStatusStyles = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-500 text-white";
      case "in progress":
        return "bg-blue-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  // Priority badge styling
  const getPriorityStyles = () => {
    switch (task.priority) {
      case "high":
        return "border-red-500 text-red-600";
      case "medium":
        return "border-blue-500 text-blue-600";
      case "low":
        return "border-gray-400 text-gray-500";
      default:
        return "border-gray-300 text-gray-700";
    }
  };

  // Progress Bar Width Based on Status
  const getProgressWidth = () => {
    switch (task.status) {
      case "completed":
        return "w-full bg-green-500";
      case "in progress":
        return "w-2/3 bg-blue-500";
      case "pending":
        return "w-1/3 bg-yellow-500";
      default:
        return "w-0 bg-gray-300";
    }
  };

  return (
    <div
      className="bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-200 
      hover:shadow-2xl transition-all transform hover:scale-105 duration-200 flex flex-col space-y-3"
    >
      {/* Task Title & Description */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="flex space-x-3">
          {/* Edit Button */}
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all"
            title="Edit Task"
          >
            <PencilSquareIcon className="h-5 w-5 text-blue-600" />
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDelete}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-all"
            title="Delete Task"
          >
            <TrashIcon className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Status & Priority Badges */}
      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles()}`}
        >
          {task.status}
        </span>

        <span
          className={`flex items-center space-x-1 px-3 py-1 text-xs font-semibold border rounded-full ${getPriorityStyles()}`}
        >
          <FlagIcon className="h-4 w-4" />
          <span>{task.priority} Priority</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className={`h-2 rounded-full ${getProgressWidth()}`}></div>
      </div>
    </div>
  );
};

export default TaskCard;
