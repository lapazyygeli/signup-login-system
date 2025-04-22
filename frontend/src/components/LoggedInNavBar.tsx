import { useDispatch } from "react-redux";
import NavLinks from "./NavLinks";
import { AppDispatch } from "../redux/store";
import { logoutAsync } from "../redux/thunks/authThunks";

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
];

const LoggedInNavBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav className="w-screen bg-indigo-500 h-fit overflow-hidden">
      <ul className="flex flex-row justify-end px-16 py-4">
        <div className="flex flex-row gap-6 text-white font-medium">
          <NavLinks navLinks={navLinks} />
          <button
            onClick={() => dispatch(logoutAsync())}
            className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:ease-in-out after:duration-500 after:w-0 hover:after:w-full"
          >
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default LoggedInNavBar;
