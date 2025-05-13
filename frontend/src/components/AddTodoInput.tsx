interface Props {
  taskText: string;
  onTaskTextChange: (value: string) => void;
  onAddTask: () => void;
}

const AddTodoInput = ({ taskText, onTaskTextChange, onAddTask }: Props) => {
  return (
    <div className="mb-4">
      <hr />
      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => onTaskTextChange(e.target.value)}
          className="flex-1 px-2 py-1 border border-gray-300 rounded-md"
          placeholder="New task..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onAddTask();
          }}
        />
        <button
          onClick={onAddTask}
          className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodoInput;
