import * as authService from "./../services/auth.service.js";

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  try {
    const user = await authService.findUserByName(name);
    const isUserInvalid = !user || user.password !== password;
    // TODO: I should compare hashed passwords and make this better

    if (isUserInvalid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Session data is not saved in the cookie itself, 
    // just the session ID (not user id).
    // Modifying req.session saves the session
    req.session.userId = user._id.toString();

    res.json({
      message: "Login successful!",
      name: user.name,
    });
  } catch (err) {
    console.error(err); // TODO: Not necessary here
    res.status(500).json({ error: err });
  }
};

export { loginUser };