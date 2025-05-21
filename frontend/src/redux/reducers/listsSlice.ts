import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllListsAsync,
  getListAsync,
  createListAsync,
  updateListAsync,
  removeListAsync,
} from "../thunks/listsThunks";
import { List } from "../../components/TodoLists";

interface ListsState {
  lists: List[];
  selectedList: List | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  lists: [],
  selectedList: null,
  isLoading: false,
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setSelectedList(state, action: PayloadAction<string | null>) {
      state.selectedList =
        state.lists.find((l) => l._id === action.payload) ?? null;
    },
    resetListsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllListsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllListsAsync.fulfilled, (state, action: PayloadAction<List[]>) => {
        state.lists = action.payload;
        state.selectedList = action.payload[0] ?? null;
        state.isLoading = false;
      })
      .addCase(getAllListsAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    builder
      .addCase(getListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListAsync.fulfilled, (state, action: PayloadAction<List>) => {
        state.selectedList = action.payload;
        state.isLoading = false;
      })
      .addCase(getListAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    builder
      .addCase(createListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createListAsync.fulfilled, (state, action: PayloadAction<List>) => {
        state.lists.push(action.payload);
        state.selectedList = action.payload;
        state.isLoading = false;
      })
      .addCase(createListAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    builder
      .addCase(updateListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateListAsync.fulfilled, (state, action: PayloadAction<List>) => {
        const index = state.lists.findIndex((l) => l._id === action.payload._id);
        if (index !== -1) {
          state.lists[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateListAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });

    builder
      .addCase(removeListAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeListAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.lists = state.lists.filter((list) => list._id !== action.payload);
        if (state.selectedList?._id === action.payload) {
          state.selectedList = state.lists[state.lists.length - 1] ?? null;
        }
        state.isLoading = false;
      })
      .addCase(removeListAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { setSelectedList, resetListsState } = listsSlice.actions;
export default listsSlice.reducer;
