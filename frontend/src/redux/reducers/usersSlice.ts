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
  loading: boolean;
  error: null | string;
}

const initialState: InitialState = {
  users: [],
  loading: false,
  error: null,
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
        if (action.payload) {
          console.log(action.payload);
        }
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

    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsersAsync.fulfilled,
        (state, action: PayloadAction<UserData[]>) => {
          state.users = action.payload;
          state.loading = false;
        }
      )
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
