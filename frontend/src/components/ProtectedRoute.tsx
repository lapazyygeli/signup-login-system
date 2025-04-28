import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../redux/store";


const ProtectedRoute = () => {
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
