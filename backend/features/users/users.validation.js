export const registerSchema = Joi.object({
  name: Joi.string().min(1).max(45).required(),
  password: Joi.string().min(1).max(45).required(),
  passwordConfirmed: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords do not match" }),
});

export const loginSchema = Joi.object({
  name: Joi.string().min(1).max(45).required(),
  password: Joi.string().min(1).max(45).required(),
});

export const unregisterSchema = Joi.object({
  id: Joi.string().required(),
});
