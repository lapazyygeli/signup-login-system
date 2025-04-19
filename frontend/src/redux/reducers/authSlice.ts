import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAsync, logoutAsync } from "../thunks/authThunks";

interface AuthState {
  isLoggedIn: boolean;
  userName: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
    }
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
      .addCase(logoutAsync.fulfilled, () => initialState)
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoggedIn = false; // TODO: code duplication
        state.userName = null;
        state.error = action.payload as string;
      });
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
