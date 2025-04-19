import express from "express";
import * as authController from "./../controllers/auth.controller.js";

// TODO: pitäis varmaan muuttaa siten, että
// paths: /login, /register
const authRouter = express.Router();
authRouter.post("/login", authController.loginUser);
authRouter.post("/logout", authController.logoutUser);

export default authRouter;