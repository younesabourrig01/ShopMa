const role = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: `Forbidden: You need ${requiredRole} privileges`,
      });
    }

    next();
  };
};

module.exports = role;
