import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormData } from "../reducers/loginSlice";

const ACTION_TYPES = {
  loginAsync: "auth/loginAsync",
  logoutAsync: "auth/logoutAsync",
  checkSessionAsync: "auth/checkSessionAsync",
};

const URLS = {
  loginAsync: "http://localhost:9000/auth/login",
  logoutAsync: "http://localhost:9000/auth/logout",
  checkSessionAsync: "http://localhost:9000/auth/session",
};

const loginAsync = createAsyncThunk(
  ACTION_TYPES.loginAsync,
  async (formData: LoginFormData, thunkAPI) => {
    try {
      const response = await fetch(URLS.loginAsync, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue("Invalid credentials");
      }

      const json = await response.json();
      return json.name as string;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const logoutAsync = createAsyncThunk(
  ACTION_TYPES.logoutAsync,
  async (_, thunkAPI) => {
    try {
      const response = await fetch(URLS.logoutAsync, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        return thunkAPI.rejectWithValue("Logout failed!");
      }

      return;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const checkSessionAsync = createAsyncThunk(
  ACTION_TYPES.checkSessionAsync,
  async (_, thunkAPI) => {
    try {
      const response = await fetch(URLS.checkSessionAsync, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.clear();
        return thunkAPI.rejectWithValue("User doesn't own a session");
      }
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export { loginAsync, logoutAsync, checkSessionAsync };
