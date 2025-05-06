import {
  requireAuth,
  requireAdmin,
  validate,
} from "./../../utils/middlewares.js";
import {
  registerSchema,
  loginSchema,
  unregisterSchema,
} from "./users.validation.js";

export const getUsersMiddlewares = [requireAdmin];
export const registerMiddlewares = [validate(registerSchema)];
export const unregisterMiddlewares = [requireAdmin, validate(unregisterSchema)];
export const loginMiddlewares = [validate(loginSchema)];
export const logoutMiddlewares = [requireAuth];
export const sessionMiddlewares = [requireAuth];
