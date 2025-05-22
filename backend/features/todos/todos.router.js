import express from "express";
import listsRouter from "./lists/lists.route.js";
import tasksRouter from "./tasks/tasks.route.js";

const todosRouter = express.Router();

todosRouter.use("/lists", listsRouter);
todosRouter.use("/tasks", tasksRouter);

export default todosRouter;
