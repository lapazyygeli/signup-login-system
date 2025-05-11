import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../components/TodoList";
import {
  createTaskAsync,
  getAllTasksAsync,
  getAllTasksByListAsync,
  getTaskAsync,
  removeTaskAsync,
  updateTaskStatusAsync,
  updateTaskTitleAsync,
} from "../thunks/tasksThunks";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllTasksAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        getAllTasksAsync.rejected,
        (state, action) => {
          state.error = action.payload as string;
          state.isLoading = false;
        }
      );

    builder
      .addCase(getAllTasksByListAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllTasksByListAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.tasks = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(
        getAllTasksByListAsync.rejected,
        (state, action) => {
          state.error = action.payload as string;
          state.isLoading = false;
        }
      );

    builder
      .addCase(getTaskAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaskAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        tasksSlice.caseReducers.addTask(state, action);
        state.isLoading = false;
      })
      .addCase(
        getTaskAsync.rejected,
        (state, action) => {
          state.error = action.payload as string;
          state.isLoading = false;
        }
      );

    builder
      .addCase(createTaskAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          tasksSlice.caseReducers.addTask(state, action);
          state.isLoading = false;
        }
      )
      .addCase(
        createTaskAsync.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );

    builder
      .addCase(updateTaskStatusAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateTaskStatusAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          tasksSlice.caseReducers.updateTask(state, action);
          state.isLoading = false;
        }
      )
      .addCase(
        updateTaskStatusAsync.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );

    builder
      .addCase(updateTaskTitleAsync.fulfilled, (state, action: PayloadAction<Task>) => {
        tasksSlice.caseReducers.updateTask(state, action);
      })
      .addCase(updateTaskTitleAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    builder
      .addCase(removeTaskAsync.fulfilled, (state, action: PayloadAction<string>) => {
        tasksSlice.caseReducers.deleteTask(state, action);
      })
      .addCase(removeTaskAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default tasksSlice.reducer;
export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
