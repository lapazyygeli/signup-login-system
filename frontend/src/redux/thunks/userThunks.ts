import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormData } from "../reducers/loginFormSlice";
import { setupAutoLogout } from "../../utils/session";
import { AppDispatch } from "../store";
import { API_URLS } from "../../constants/apiRoutes";

const ACTION_TYPES = {
  loginAsync: "user/loginAsync",
  logoutAsync: "user/logoutAsync",
  checkSessionAsync: "user/checkSessionAsync",
};

const loginAsync = createAsyncThunk(
  ACTION_TYPES.loginAsync,
  async (formData: LoginFormData, thunkAPI) => {
    try {
      const response = await fetch(API_URLS.users.login, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) return thunkAPI.rejectWithValue("Invalid credentials");

      const data = await response.json();
      const { name, role, expiresAt } = data;

      localStorage.setItem("sessionExpiresAt", expiresAt.toString());
      setupAutoLogout(thunkAPI.dispatch as AppDispatch, expiresAt);

      return { name, role };
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
      const response = await fetch(API_URLS.users.logout, {
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
      const response = await fetch(API_URLS.users.session, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.clear();
        return thunkAPI.rejectWithValue("User doesn't own a session");
      }
      return await response.json() as { name: string; role: "admin" | "user" };
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export { loginAsync, logoutAsync, checkSessionAsync };
