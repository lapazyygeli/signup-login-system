import Joi from "joi";

const objectId = Joi.string().length(24).hex();

export const createSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().max(1024).optional().allow(""),
  list_id: objectId,
});

export const updateSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).optional(),
  description: Joi.string().trim().max(1024).optional().allow(""),
  completed: Joi.boolean().optional(),
}).min(1);
