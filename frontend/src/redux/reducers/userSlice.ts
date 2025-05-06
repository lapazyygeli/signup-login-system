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

const setLoggedOutState = (state: UserState, error: string | null = null) => {
  state.isLoggedIn = false;
  state.userName = null;
  state.role = null;
  state.error = error;
};

const setLoggedInState = (
  state: UserState,
  payload: { name: string; role: "admin" | "user" }
) => {
  state.isLoggedIn = true;
  state.userName = payload.name;
  state.role = payload.role;
  state.error = null;
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
        setLoggedInState(state, action.payload);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        setLoggedOutState(state, action.payload as string);
      });

    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        setLoggedOutState(state);
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        setLoggedOutState(state, action.payload as string);
      });

    builder
      .addCase(checkSessionAsync.fulfilled, (state, action: PayloadAction<{ name: string; role: "admin" | "user" }>) => {
        setLoggedInState(state, action.payload);
        state.isSessionChecked = true;
      })
      .addCase(checkSessionAsync.rejected, (state) => {
        setLoggedOutState(state);
        state.isSessionChecked = true;
      });
  },
});

export const { setError } = userSlice.actions;
export default userSlice.reducer;
