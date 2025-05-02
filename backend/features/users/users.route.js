import express from "express";
import { requireAdmin } from "../../utils/middlewares.js";
import * as usersController from "./users.controller.js";

const usersRouter = express.Router();
usersRouter.get("/", requireAdmin, usersController.getUsers);
usersRouter.post("/register", usersController.registerUser);
usersRouter.delete("/unregister", requireAdmin, usersController.unregisterUser);
usersRouter.post("/login", usersController.loginUser);
usersRouter.post("/logout", usersController.logoutUser);
usersRouter.get("/session", usersController.isUserLoggedIn);

export default usersRouter;