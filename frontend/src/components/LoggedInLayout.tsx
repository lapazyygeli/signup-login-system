import { Outlet } from "react-router";
import LoggedInNavBar from "./LoggedInNavBar";

const LoggedInLayout = () => {
  return (
    <>
      <LoggedInNavBar />
      <Outlet />
    </>
  );
};

export default LoggedInLayout;
