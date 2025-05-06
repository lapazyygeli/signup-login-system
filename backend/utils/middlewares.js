import * as usersService from "./../features/users/users.service.js";

export const requireAdmin = (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ error: "Not authenticated" });

  usersService.findUserById(userId).then((user) => {
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }
    next();
  });
};

export const requireAuth = (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
};

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};
