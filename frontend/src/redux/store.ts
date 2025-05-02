import { configureStore } from "@reduxjs/toolkit";
import signupFormSlice from "./reducers/signupFormSlice";
import loginFormSlice from "./reducers/loginFormSlice";
import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";

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
