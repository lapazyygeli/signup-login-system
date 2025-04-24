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
    <div className="bg-indigo-500">
      <nav className="max-w-5xl mx-auto sm:px-16">
        <ul className="flex justify-center sm:justify-end py-4">
          <div className="flex flex-wrap gap-6 text-white font-medium">
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
    </div>
  );
};

export default LoggedInNavBar;
