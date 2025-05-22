import express from "express";
import * as listsController from "./lists.controller.js";
import {
  createMiddlewares,
  getAllMiddlewares,
  getMiddlewares,
  removeMiddlewares,
  updateMiddlewares,
} from "./lists.middlewares.js";

const listsRouter = express.Router();

listsRouter.get("/", getAllMiddlewares, listsController.getAll);
listsRouter.get("/:id", getMiddlewares, listsController.get);
listsRouter.post("/", createMiddlewares, listsController.create);
listsRouter.put("/:id", updateMiddlewares, listsController.update);
listsRouter.delete("/:id", removeMiddlewares, listsController.remove);

export default listsRouter;
