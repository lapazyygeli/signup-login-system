import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loginAsync from "../thunks/authThunks";

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
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
      state.error = null;
      // This maybe should be made as a thunk too?
      // So that in session based approach session id would be destroyed?
      // Maybe not needed when using jwt.
    },
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
        state.isLoggedIn = false;
        state.userName = null;
        state.error = (action.payload as string) ?? "Unknown login error";
      });
  },
});

export const { logout, setError } = authSlice.actions;
export default authSlice.reducer;
