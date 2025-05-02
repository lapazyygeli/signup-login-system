import * as usersService from "./users.service.js";

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "A Request without request body." });
  }
  try {
    const existingUser = await usersService.findUserByName(req.body.name);
    if (existingUser) {
      return res.status(409).json({
        error:
          "This username is already in use. Please create one that doesn't already exist.",
      });
    }

    const user = {
      name: req.body.name,
      password: req.body.password,
      passwordConfirmed: req.body.passwordConfirmed,
    };

    const newUser = await usersService.add(user);
    res.json({
      message: "User added to database",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
  }
};

const unregisterUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "A Request without request body." });
  }
  try {
    const query = await usersService.remove(req.body.id);
    res.json({
      message: "User deleted succesfully!",
      data: query,
    });
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  try {
    const user = await usersService.findUserByName(name);
    const isUserInvalid = !user || user.password !== password;
    // TODO: I should compare hashed passwords and make this better

    if (isUserInvalid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Session data is not saved in the cookie itself,
    // just the session ID (not user id).
    req.session.userId = user._id.toString();

    // Save session before fetching its expiration
    req.session.save(async () => {
      const expiresAt = await usersService.getSessionExpiration(req.sessionID);
      if (!expiresAt) {
        return res
          .status(500)
          .json({ error: "Could not retrieve session expiration" });
      }

      res.json({
        message: "Login successful!",
        name: user.name,
        role: user.role,
        expiresAt,
      });
    });
  } catch (err) {
    console.error(err); // TODO: Not necessary here
    res.status(500).json({ error: err });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }

    // TODO: extract string, make it const
    res.clearCookie("connect.sid");
    res.status(200).end();
  });
};

const isUserLoggedIn = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).end();
  }

  try {
    const user = await usersService.findUserById(req.session.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getUsers,
  registerUser,
  unregisterUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
};
