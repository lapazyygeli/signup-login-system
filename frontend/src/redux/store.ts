import { combineReducers, configureStore } from "@reduxjs/toolkit";
import signupFormSlice from "./reducers/signupFormSlice";
import loginFormSlice from "./reducers/loginFormSlice";
import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";
import listsSlice from "./reducers/listsSlice";
import tasksSlice from "./reducers/tasksSlice";

const store = configureStore({
  reducer: {
    signupForm: signupFormSlice,
    loginForm: loginFormSlice,
    user: userSlice,
    users: usersSlice,
    todos: combineReducers({
      lists: listsSlice,
      tasks: tasksSlice
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
