import { Outlet } from "react-router";
import PublicNavBar from "./PublicNavBar";

const AuthLayout = () => {
  return (
    <>
      <PublicNavBar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
