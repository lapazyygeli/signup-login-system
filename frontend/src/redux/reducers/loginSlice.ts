import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginFormData {
  name: string;
  password: string;
}

interface LoginFormState {
  loginFormData: LoginFormData;
  error: string | null;
}

const initialState: LoginFormState = {
  loginFormData: {
    name: "",
    password: "",
  },
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginFormData: (state, action: PayloadAction<LoginFormData>) => {
      state.loginFormData = action.payload;
    },
    resetForm: (state) => {
      state.loginFormData = initialState.loginFormData;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
    },
  },
});


export const { setLoginFormData, resetForm, setError } = loginSlice.actions;
export default loginSlice.reducer;