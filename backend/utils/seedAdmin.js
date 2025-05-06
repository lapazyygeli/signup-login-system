import * as usersService from "./../features/users/users.service.js";
import { UserModel } from "../features/users/users.model.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await usersService.findUserByName("admin");
    if (!existingAdmin) {
      // TODO: shouldn't really be done like this. Hardcoded admin is 
      // not a good thing and not even hashed, but it's okay here. 
      // For example, it could be done so that users with 
      // admin credentials could be seeded via the command line or
      // some other way to make it more secure.
      const admin = new UserModel({
        name: "admin",
        password: "admin",
        passwordConfirmed: "admin",
        role: "admin",
      });
      await admin.save();
    }
  } catch (err) {
    console.error("Error creating admin:", err);
  }
};
