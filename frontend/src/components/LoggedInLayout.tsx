import { Outlet } from "react-router";
import { loggedInNavLinks } from "../constants/navLinks";
import NavBar from "./NavBar";

const LoggedInLayout = () => {
  return (
    <>
      <NavBar navLinks={loggedInNavLinks} />
      <Outlet />
    </>
  );
};

export default LoggedInLayout;
