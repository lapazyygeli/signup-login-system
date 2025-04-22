import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  checkSessionAsync,
  loginAsync,
  logoutAsync,
} from "../thunks/authThunks";

interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  error: string | null;
  isSessionChecked: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  error: null,
  isSessionChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoggedIn = true;
        state.userName = action.payload;
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
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoggedIn = false; // TODO: code duplication
        state.userName = null;
        state.error = action.payload as string;
      });

    builder
      .addCase(checkSessionAsync.fulfilled, (state) => {
        state.isLoggedIn = true;
        state.error = null;
        state.isSessionChecked = true;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        state.isLoggedIn = false;
        state.isSessionChecked = true;
      });
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
