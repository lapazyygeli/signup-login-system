import express from "express";
import * as usersController from "./users.controller.js";

const usersRouter = express.Router();
usersRouter.post("/register", usersController.registerUser);
usersRouter.delete("/unregister", usersController.unregisterUser);
usersRouter.post("/login", usersController.loginUser);
usersRouter.post("/logout", usersController.logoutUser);
usersRouter.get("/session", usersController.isUserLoggedIn);

export default usersRouter;