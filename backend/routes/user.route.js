import express from "express";
import * as userController from "./../controllers/user.controller.js";

const router = express.Router();
router.delete("/delete", userController.deleteUser);
router.post("/add", userController.addUser);

export default router;