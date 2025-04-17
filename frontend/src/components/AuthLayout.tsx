import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { publicNavLinks } from "../constants/navLinks";

const AuthLayout = () => {
  return (
    <>
      <NavBar navLinks={publicNavLinks} />
      <Outlet />
    </>
  );
};

export default AuthLayout;
