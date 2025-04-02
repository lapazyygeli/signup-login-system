import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpFormData } from "../reducers/signupSlice";
import { UserData } from "../../components/SignUp";

const ACTION_TYPES = {
  addUserAsync: "users/addUserAsync",
  deleteUserAsync: "users/deleteUserAsync",
};

const URLS = {
  addUserAsync: "http://localhost:9000/users/add",
  deleteUserAsync: "http://localhost:9000/users/delete",
};

const addUserAsync = createAsyncThunk(
  ACTION_TYPES.addUserAsync,
  async (formData: SignUpFormData, thunkAPI) => {
    try {
      const response: Response = await fetch(URLS.addUserAsync, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not okay!");
      }
      const responseJsonNewData = await response.json();
      console.log(responseJsonNewData.message);
      return responseJsonNewData.data as UserData;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export { addUserAsync };
