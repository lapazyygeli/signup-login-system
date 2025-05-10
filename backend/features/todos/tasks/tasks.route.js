import express from "express";
import * as tasksController from "./tasks.controller.js";

const tasksRouter = express.Router();

tasksRouter.get("/", tasksController.getAll);
tasksRouter.get("/:listId", tasksController.getAllByList);
tasksRouter.get("/:id", tasksController.get);
tasksRouter.post("/", tasksController.create);
tasksRouter.put("/:id", tasksController.update);
tasksRouter.delete("/:id", tasksController.remove);

export default tasksRouter;
