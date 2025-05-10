import express from "express";
import * as listsController from "./lists.controller.js";

const listsRouter = express.Router();

listsRouter.get("/", listsController.getAll);
listsRouter.get("/:id", listsController.get);
listsRouter.post("/", listsController.create);
listsRouter.put("/:id", listsController.update);
listsRouter.delete("/:id", listsController.remove);

export default listsRouter;
