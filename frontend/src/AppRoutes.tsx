import { Routes, Route, Navigate } from "react-router";
import AuthLayout from "./components/AuthLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import About from "./components/About";
import ProtectedRoute from "./components/ProtectedRoute";
import LoggedInLayout from "./components/LoggedInLayout";
import Dashboard from "./components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import {  AppDispatch, RootState } from "./redux/store";
import Profile from "./components/Profile";
import { useEffect } from "react";
import { checkSessionAsync } from "./redux/thunks/authThunks";


const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isUserLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isSessionChecked = useSelector((state: RootState) => state.auth.isSessionChecked);

  useEffect(() => {
    dispatch(checkSessionAsync());
  }, [dispatch]);

  // Don't show anything until session check is complete.
  // It checks if user has logged in based on (saved) session.
  if (!isSessionChecked) return null;

  return (
    <Routes>
      <Route element={isUserLoggedIn ? <Navigate to="/dashboard" /> : <AuthLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<LoggedInLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* + Some other routes. Consider checking out if it possible to reuse
              about and home pages in logged in mode (personalized) */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
