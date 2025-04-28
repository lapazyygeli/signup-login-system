import { Routes, Route, Navigate } from "react-router";
import AuthLayout from "./components/AuthLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import About from "./components/About";
import ProtectedRoute from "./components/ProtectedRoute";
import LoggedInLayout from "./components/LoggedInLayout";
import Dashboard from "./components/Dashboard";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Profile from "./components/Profile";
import useSessionAutoLogout from "./hooks/useSessionAutoLogout";


const AppRoutes = () => {
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const isSessionChecked = useSelector((state: RootState) => state.user.isSessionChecked);

  useSessionAutoLogout();

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
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
