import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  createTaskAsync,
  getAllTasksByListAsync,
  removeTaskAsync,
  updateTaskStatusAsync,
  updateTaskTitleAsync,
} from "../redux/thunks/tasksThunks";
import Todo from "./Todo";
import AddTaskInput from "./AddTodoInput";
import { resetTasksState } from "../redux/reducers/tasksSlice";

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

interface Props {
  listId: string;
}

const TodoList = ({ listId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.todos.tasks.tasks);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    dispatch(getAllTasksByListAsync(listId));
    return () => {
      dispatch(resetTasksState());
    };
  }, [dispatch, listId]);

  const handleAddTodo = async () => {
    if (!taskText.trim()) return;
    dispatch(createTaskAsync({ title: taskText, list_id: listId }));
    setTaskText("");
  };

  const handleToggleStatus = (task: Task) => {
    dispatch(updateTaskStatusAsync(task));
  };

  const handleTitleChange = (taskId: string, newTitle: string) => {
    dispatch(updateTaskTitleAsync({ taskId, newTitle }));
  };

  const handleDelete = (taskId: string) => {
    dispatch(removeTaskAsync(taskId));
  };

  return (
    <div className="mb-36">
      <AddTaskInput
        taskText={taskText}
        onTaskTextChange={setTaskText}
        onAddTask={handleAddTodo}
      />
      {tasks.map((task) => (
        <Todo
          key={task._id}
          task={task}
          handleToggleStatus={handleToggleStatus}
          handleTitleChange={handleTitleChange}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
