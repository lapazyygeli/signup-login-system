import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./reducers/signupSlice";
import usersSlice from "./reducers/usersSlice";

const store = configureStore({
  reducer: {
    signup: signupSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
