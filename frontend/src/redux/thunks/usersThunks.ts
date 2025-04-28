import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignUpFormData } from "../reducers/signupFormSlice";
import { UserData } from "../reducers/usersSlice";
import { API_URLS } from "../../constants/apiRoutes";

const ACTION_TYPES = {
  addUserAsync: "users/addUserAsync",
  deleteUserAsync: "users/deleteUserAsync",
};

const addUserAsync = createAsyncThunk(
  ACTION_TYPES.addUserAsync,
  async (formData: SignUpFormData, thunkAPI) => {
    // TODO: consider if there should be some kind of authentication
    // headers when passing credentials. 
    try {
      const response: Response = await fetch(API_URLS.users.register, {
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
      console.log(responseJsonNewData.message); // TODO: Not necessary here
      return responseJsonNewData.data as UserData;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

const deleteUserAsync = createAsyncThunk(
  ACTION_TYPES.deleteUserAsync,
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(API_URLS.users.unregister, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response not okay (delete)!");
      }
      const responseJson = await response.json();
      console.log(responseJson.message);
      console.log(responseJson.data);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);

export { addUserAsync, deleteUserAsync };
