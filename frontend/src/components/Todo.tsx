import { Task } from "./TodoList";

interface Props {
  task: Task;
  handleToggleStatus: (task: Task) => void;
  handleTitleChange: (taskId: string, newTitle: string) => void;
  handleDelete: (taskId: string) => void;
}

const Todo = ({
  task,
  handleToggleStatus,
  handleTitleChange,
  handleDelete,
}: Props) => {
  return (
    <div key={task._id} className="flex items-center mb-2 gap-2">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleToggleStatus(task)}
        className="accent-indigo-500"
      />
      <input
        type="text"
        value={task.title}
        onChange={(e) => handleTitleChange(task._id, e.target.value)}
        disabled={task.completed}
        className={`flex-1 px-2 py-1 border rounded-md ${
          task.completed ? "line-through text-gray-400" : "text-black"
        }`}
      />
      <button
        onClick={() => handleDelete(task._id)}
        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
