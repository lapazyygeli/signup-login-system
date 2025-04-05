import express from "express";
import * as userController from "./../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.delete("/delete", userController.deleteUser);
userRouter.post("/add", userController.addUser);

export default userRouter;