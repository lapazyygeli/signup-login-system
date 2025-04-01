import { NavLink } from "react-router";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Sign up" },
];

const NavBar = () => {
  return (
    <nav className="w-screen bg-indigo-500 h-fit overflow-hidden">
      <ul className="flex flex-row justify-end px-16 py-4">
        <div className="flex flex-row gap-6 text-white font-medium">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:ease-in-out after:duration-500 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
