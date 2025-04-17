import { NavLink } from "react-router";
type NavItem = { label: string; path: string };
type Props = {
  navLinks: NavItem[];
};

const NavLinks = ({ navLinks }: Props) => {
  return (
    <>
      {navLinks.map(({ label, path }) => (
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
    </>
  );
};

export default NavLinks;
