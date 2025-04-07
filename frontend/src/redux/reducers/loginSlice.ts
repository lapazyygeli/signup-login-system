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

const loginSlice = createSlice({
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

export const { setLoginFormData, resetForm } = loginSlice.actions;
export default loginSlice.reducer;
