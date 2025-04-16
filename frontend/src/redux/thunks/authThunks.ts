import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginFormData } from "../reducers/loginSlice";

const ACTION_TYPES = {
  loginAsync: "auth/loginAsync",
};

const URLS = {
  loginAsync: "http://localhost:9000/auth",
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
      return  json.name as string;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export default loginAsync;
