import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkSessionAsync,
  loginAsync,
  logoutAsync,
} from "../thunks/userThunks";

interface UserState {
  isLoggedIn: boolean;
  userName: string | null;
  role: "admin" | "user" | null;
  error: string | null;
  isSessionChecked: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  userName: null,
  role: null,
  error: null,
  isSessionChecked: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{name: string; role: "admin" | "user"}>) => {
        state.isLoggedIn = true;
        state.userName = action.payload.name;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoggedIn = false; // TODO: code duplication
        state.userName = null;
        state.error = action.payload as string;
      });

    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userName = null;
        state.role = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoggedIn = false; // TODO: code duplication
        state.userName = null;
        state.role = null;
        state.error = action.payload as string;
      });

    builder
      .addCase(checkSessionAsync.fulfilled, (state, action: PayloadAction<{ name: string; role: "admin" | "user" }>) => {
        state.isLoggedIn = true;
        state.userName = action.payload.name;
        state.role = action.payload.role;
        state.error = null;
        state.isSessionChecked = true;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.isLoggedIn = false;
        state.userName = null;
        state.role = null;
        state.isSessionChecked = true;
      });
  },
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
