import * as authService from "./../services/auth.service.js";

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  try {
    const user = await authService.findUserByName(name);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // TODO: I should compare hashed passwords and make this better
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // TODO: use of sessions or JWT.

    res.json({
      message: "Login successful!",
      name: user.name,
    });
  } catch (err) {
    console.error(err); // Not necessary here
    res.status(500).json({ error: err });
  }
};

export { loginUser };