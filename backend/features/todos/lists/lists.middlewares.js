import {
  requireAuth,
  validate,
} from "./../../../utils/middlewares.js";
import {
  createSchema,
  updateSchema,
} from "./lists.validation.js";

export const getAllMiddlewares = [requireAuth];
export const getMiddlewares = [requireAuth];
export const createMiddlewares = [requireAuth, validate(createSchema)];
export const updateMiddlewares = [requireAuth, validate(updateSchema)];
export const removeMiddlewares = [requireAuth];
