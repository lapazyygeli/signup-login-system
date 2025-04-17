import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { RootState } from "../redux/store";

const ProtectedRoute = () => {
  // TODO: problem - after refresh not logged in
  const isUserLoggedIn = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );
  return isUserLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
