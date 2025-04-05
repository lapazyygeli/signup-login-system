import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./reducers/signupSlice";
import usersSlice from "./reducers/usersSlice";
import loginSlice from "./reducers/loginSlice";
import authSlice from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    auth: authSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
