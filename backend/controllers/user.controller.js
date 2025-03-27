import * as userService from "./../services/user.service.js";

const deleteUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Something bad happened!" });
  }
  try {
    const query = await userService.remove(req.body.id);
    res.json({
      message: "Item deleted succesfully!",
      data: query,
    });
  } catch (err) {
    console.error(err);
  }
};

const addUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Something bad happened!" });
  }
  try {
    const user = {
      name: req.body.name,
      password: req.body.password,
      passwordConfirmed: req.body.passwordConfirmed,
    };
    const newUser = await userService.add(user);
    res.json({
      message: "User added to database",
      data: newUser,
    });
  } catch (err) {
    console.error(err);
  }
};

export { deleteUser, addUser };
