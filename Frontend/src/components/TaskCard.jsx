import { useTasks } from "../context/TaskContext";

const TaskCard = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <span
          className={`px-2 py-1 text-xs font-bold rounded ${
            task.status === "completed"
              ? "bg-green-500 text-white"
              : "bg-gray-300"
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="space-x-2">
        <button onClick={() => onEdit(task)} className="text-blue-500">
          Edit
        </button>
        <button onClick={() => removeTask(task._id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
