import { Outlet } from "react-router";

const LoggedInLayout = () => {
  return (
    // Navbar. Should be made as own component.
    <>
      <nav className="w-screen bg-indigo-500 h-fit overflow-hidden">
        <ul className="flex flex-row justify-end px-16 py-4">
          <div className="flex flex-row gap-6 text-white font-medium">
            <li className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:ease-in-out after:duration-500">
              Link1
            </li>
            <li className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:ease-in-out after:duration-500">
              Link2
            </li>
            <li className="cursor-pointer relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white after:transition-all after:ease-in-out after:duration-500">
              Link3
            </li>
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default LoggedInLayout;
