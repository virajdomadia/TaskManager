const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="mt-2 text-sm">
        <span
          className={`inline-block py-1 px-3 rounded-full ${
            task.status === "Pending"
              ? "bg-yellow-300"
              : task.status === "In Progress"
              ? "bg-blue-300"
              : "bg-green-300"
          }`}
        >
          {task.status}
        </span>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => onEdit(task)} className="text-blue-600">
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="text-red-600">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
