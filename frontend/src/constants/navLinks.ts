export const publicNavLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Login", path: "/login" },
  { label: "Sign up", path: "/signup" },
];

export const loggedInNavLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
  //{ label: "Logout", path: "/" }, // isLoggedIn still true
  // --> doesn't go to "/". Also cookie should be handled
];
