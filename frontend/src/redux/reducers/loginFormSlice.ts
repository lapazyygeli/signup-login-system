import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LoginFormData {
  name: string;
  password: string;
}

interface LoginFormState {
  loginFormData: LoginFormData;
}

const initialState: LoginFormState = {
  loginFormData: {
    name: "",
    password: "",
  },
};

const loginFormSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginFormData: (state, action: PayloadAction<LoginFormData>) => {
      state.loginFormData = action.payload;
    },
    resetForm: (state) => {
      state.loginFormData = initialState.loginFormData;
    },
  },
});

export const { setLoginFormData, resetForm } = loginFormSlice.actions;
export default loginFormSlice.reducer;
