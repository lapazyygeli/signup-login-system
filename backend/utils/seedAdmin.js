import * as usersService from "./../features/users/users.service.js";
import { UserModel } from "../features/users/users.model.js";

export const seedAdmin = async () => {
  try {
    const existingAdmin = await usersService.findUserByName("admin");
    if (!existingAdmin) {
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
