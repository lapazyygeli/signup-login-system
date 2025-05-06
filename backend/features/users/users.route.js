import express from "express";
import * as usersController from "./users.controller.js";
import {
  getUsersMiddlewares,
  registerMiddlewares,
  unregisterMiddlewares,
  loginMiddlewares,
  logoutMiddlewares,
  sessionMiddlewares,
} from "./users.middlwares.js";

const usersRouter = express.Router();
usersRouter.get("/", getUsersMiddlewares, usersController.getUsers);
usersRouter.post("/register", registerMiddlewares, usersController.registerUser);
usersRouter.delete("/unregister", unregisterMiddlewares, usersController.unregisterUser);
usersRouter.post("/login", loginMiddlewares, usersController.loginUser);
usersRouter.post("/logout", logoutMiddlewares, usersController.logoutUser);
usersRouter.get("/session", sessionMiddlewares, usersController.isUserLoggedIn);

export default usersRouter;
