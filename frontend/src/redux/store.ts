import { configureStore } from "@reduxjs/toolkit";
import signupFormSlice from "./reducers/signupFormSlice";
import usersSlice from "./reducers/usersSlice";
import loginFormSlice from "./reducers/loginFormSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    signupForm: signupFormSlice,
    loginForm: loginFormSlice,
    user: userSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
