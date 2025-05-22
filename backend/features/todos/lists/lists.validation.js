import Joi from "joi";

export const createSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().max(1024).optional().allow(""),
});

export const updateSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().max(1024).optional().allow(""),
}).min(1);