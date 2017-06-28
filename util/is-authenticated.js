/**
 * isAuthenticated middleware
 */
module.exports = (req, res, next) => {
  if (req.session.auth || req.path === "/auth/login") {
    next();
  } else {
    res.redirect("/auth/login");
  }
};
