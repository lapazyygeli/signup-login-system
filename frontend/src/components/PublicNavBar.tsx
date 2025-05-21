import NavLinks from "./NavLinks";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Login", path: "/login" },
  { label: "Sign up", path: "/signup" },
];

const PublicNavBar = () => {
  return (
    <div className="bg-indigo-500">
      <nav className="max-w-5xl mx-auto sm:px-16">
        <ul className="flex justify-center sm:justify-between py-4">
          <div className="hidden sm:flex items-center">
            <span className="ml-3 text-white font-semibold text-xl">Signup/Login System</span>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-6 text-white font-medium">
            <NavLinks navLinks={navLinks} />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default PublicNavBar;
