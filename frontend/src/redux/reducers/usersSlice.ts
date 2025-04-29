import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addUserAsync,
  deleteUserAsync,
  getUsersAsync,
} from "../thunks/usersThunks";

export interface UserData {
  _id: string;
  name: string;
  password: string;
  passwordConfirmed: string;
}

interface InitialState {
  users: UserData[];
}

const initialState: InitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addUserAsync.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          usersSlice.caseReducers.addUser(state, action);
        }
      )
      .addCase(addUserAsync.rejected, (_, action) => {
        console.log(action.payload);
      });

    builder
      .addCase(
        deleteUserAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          usersSlice.caseReducers.deleteUser(state, action);
        }
      )
      .addCase(deleteUserAsync.rejected, (_, action) => {
        console.log(action.payload);
      });

    builder.addCase(
      getUsersAsync.fulfilled,
      (state, action: PayloadAction<UserData[]>) => {
        state.users = action.payload;
      }
    );
  },
});

export const { addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
