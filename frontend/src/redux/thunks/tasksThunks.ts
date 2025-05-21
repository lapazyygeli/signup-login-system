import { createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "../../components/TodoList";

const ACTION_TYPES = {
  getAllTasksAsync: "tasks/getAllTasksAsync",
  getAllTasksByListAsync: "tasks/getAllTasksByListAsync",
  getTaskAsync: "tasks/getAllTaskAsync",
  createTaskAsync: "tasks/createTaskAsync",
  updateTaskStatusAsync: "tasks/updateTaskStatusAsync",
  updateTaskTitleAsync: "tasks/updateTaskCompletedAsync",
  removeTaskAsync: "tasks/removeTaskAsync",
};

const getAllTasksAsync = createAsyncThunk(
  ACTION_TYPES.getAllTasksAsync,
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:9000/todos/tasks/", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch tasks.");

      return (await res.json()) as Task[];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const getAllTasksByListAsync = createAsyncThunk(
  ACTION_TYPES.getAllTasksByListAsync,
  async (listId: string, thunkAPI) => {
    try {
      const res = await fetch(
        `http://localhost:9000/todos/tasks/list/${listId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to fetch tasks.");

      return (await res.json()) as Task[];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const getTaskAsync = createAsyncThunk(
  ACTION_TYPES.getTaskAsync,
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/tasks/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch task.");

      return (await res.json()) as Task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const createTaskAsync = createAsyncThunk(
  ACTION_TYPES.createTaskAsync,
  async ({ title, list_id }: { title: string; list_id: string }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, list_id }),
      });

      if (!res.ok) throw new Error("Failed to add task.");

      return (await res.json()) as Task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const updateTaskStatusAsync = createAsyncThunk(
  ACTION_TYPES.updateTaskStatusAsync,
  async (task: Task, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!res.ok) throw new Error("Failed to update task status.");

      return (await res.json()) as Task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const updateTaskTitleAsync = createAsyncThunk(
  ACTION_TYPES.updateTaskTitleAsync,
  async (
    { taskId, newTitle }: { taskId: string; newTitle: string },
    thunkAPI
  ) => {
    try {
      // TODO: Debouncing should be used at least
      const res = await fetch(`http://localhost:9000/todos/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) throw new Error("Failed to update task title.");

      return (await res.json()) as Task;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const removeTaskAsync = createAsyncThunk(
  ACTION_TYPES.removeTaskAsync,
  async (taskId: string, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete task.");

      return taskId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

export {
  getAllTasksAsync,
  getAllTasksByListAsync,
  getTaskAsync,
  createTaskAsync,
  updateTaskStatusAsync,
  updateTaskTitleAsync,
  removeTaskAsync,
};
