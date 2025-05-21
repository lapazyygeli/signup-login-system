import { createAsyncThunk } from "@reduxjs/toolkit";
import { List } from "../../components/TodoLists";

const ACTION_TYPES = {
  getAllListsAsync: "lists/getAllListsAsync",
  getListAsync: "lists/getListAsync",
  createListAsync: "lists/createListAsync",
  updateListAsync: "lists/updateListAsync",
  removeListAsync: "lists/removeListAsync",
};

const getAllListsAsync = createAsyncThunk(
  ACTION_TYPES.getAllListsAsync,
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:9000/todos/lists", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch lists.");
      return (await res.json()) as List[];
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const getListAsync = createAsyncThunk(
  ACTION_TYPES.getListAsync,
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/lists/${id}`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch list.");
      return (await res.json()) as List;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const createListAsync = createAsyncThunk(
  ACTION_TYPES.createListAsync,
  async (title: string, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:9000/todos/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add list.");
      return (await res.json()) as List;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const updateListAsync = createAsyncThunk(
  ACTION_TYPES.updateListAsync,
  async ({ id, data }: { id: string; data: Partial<List> }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/lists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update list.");
      return (await res.json()) as List;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

const removeListAsync = createAsyncThunk(
  ACTION_TYPES.removeListAsync,
  async (id: string, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:9000/todos/lists/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete list.");
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : "Unknown error"
      );
    }
  }
);

export {
  getAllListsAsync,
  getListAsync,
  createListAsync,
  updateListAsync,
  removeListAsync,
};
