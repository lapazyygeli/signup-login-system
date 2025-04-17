import NavLinks from "./NavLinks";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Login", path: "/login" },
  { label: "Sign up", path: "/signup" },
];

const PublicNavBar = () => {
  return (
    <nav className="w-screen bg-indigo-500 h-fit overflow-hidden">
      <ul className="flex flex-row justify-end px-16 py-4">
        <div className="flex flex-row gap-6 text-white font-medium">
          <NavLinks navLinks={navLinks} />
        </div>
      </ul>
    </nav>
  );
};

export default PublicNavBar;
