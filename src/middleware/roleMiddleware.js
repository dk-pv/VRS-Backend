module.exports = (role) => {
  return (req, res, next) => {
    if (req.admin.role !== role) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};