import express from "express";
import { requireAuth } from "../../utils/middlewares.js";
import listsRouter from "./lists/lists.route.js";
import tasksRouter from "./tasks/tasks.route.js";

const todosRouter = express.Router();

todosRouter.use("/lists", requireAuth, listsRouter);
todosRouter.use("/tasks", requireAuth, tasksRouter);

export default todosRouter;
