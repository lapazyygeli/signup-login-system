import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SignUpFormData {
  name: string;
  password: string;
  passwordConfirmed: string;
}

interface SignUpFormState {
  signUpFormData: SignUpFormData;
  error: string | null;
}

const initialState: SignUpFormState = {
  signUpFormData: {
    name: "",
    password: "",
    passwordConfirmed: "",
  },
  error: null,
};

const signupFormSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setSignUpFormData: (state, action: PayloadAction<SignUpFormData>) => {
      state.signUpFormData = action.payload;
    },
    resetForm: (state) => {
      state.signUpFormData = initialState.signUpFormData;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string|null>) => {
      state.error = action.payload;
    },
  },
});

// Behinde the scenes:
/*const setSignUpFormData = (signUpFormData) => {
  return {
    type: "SET_SIGN_UP_FORM_DATA",
    payload: signUpFormData,
  };
};*/

export const { setSignUpFormData, resetForm, setError } = signupFormSlice.actions;
export default signupFormSlice.reducer; // export slice as a reducer
