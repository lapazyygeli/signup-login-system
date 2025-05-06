import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError, SignUpFormData } from "../reducers/signupFormSlice";
import { UserData } from "../reducers/usersSlice";
import { API_URLS } from "../../constants/apiRoutes";

const ACTION_TYPES = {
  addUserAsync: "users/addUserAsync",
  deleteUserAsync: "users/deleteUserAsync",
  getUsersAsync: "users/getUsersAsync",
};

const addUserAsync = createAsyncThunk(
  ACTION_TYPES.addUserAsync,
  async (formData: SignUpFormData, thunkAPI) => {
    // TODO: consider if there should be some kind of 
    // authentication/authorization headers when passing credentials.
    // I mean trying to pass data securely.
    try {
      const response: Response = await fetch(API_URLS.users.register, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        thunkAPI.dispatch(setError(responseJson.error));
        return thunkAPI.rejectWithValue(undefined);
      }

      console.log(responseJson.message);
      return responseJson.data as UserData;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
);

const deleteUserAsync = createAsyncThunk(
  ACTION_TYPES.deleteUserAsync,
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(API_URLS.users.unregister, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not okay (deleteUserAsync).");
      }
      const responseJson = await response.json();
      console.log(responseJson.message);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
);

const getUsersAsync = createAsyncThunk(
  ACTION_TYPES.getUsersAsync,
  async (_, thunkAPI) => {
    try {
      const response = await fetch(API_URLS.users.users, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        console.clear();
        return thunkAPI.rejectWithValue("Failed to fetch users.");
      }
      const users = await response.json();
      return users;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
);

export { addUserAsync, deleteUserAsync, getUsersAsync };
