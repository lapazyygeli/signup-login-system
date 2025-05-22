import express from "express";
import * as tasksController from "./tasks.controller.js";
import {
  createMiddlewares,
  getAllByListMiddlewares,
  getAllMiddlewares,
  getMiddlewares,
  removeMiddlewares,
  updateMiddlewares,
} from "./tasks.middlewares.js";

const tasksRouter = express.Router();

tasksRouter.get("/", getAllMiddlewares, tasksController.getAll);
tasksRouter.get("/list/:listId", getAllByListMiddlewares, tasksController.getAllByList);
tasksRouter.get("/:id", getMiddlewares, tasksController.get);
tasksRouter.post("/", createMiddlewares, tasksController.create);
tasksRouter.put("/:id", updateMiddlewares, tasksController.update);
tasksRouter.delete("/:id", removeMiddlewares, tasksController.remove);

export default tasksRouter;
