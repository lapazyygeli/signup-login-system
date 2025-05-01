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