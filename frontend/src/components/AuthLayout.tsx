import { Outlet } from "react-router";
import NavBar from "./NavBar";

const AuthLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AuthLayout;
