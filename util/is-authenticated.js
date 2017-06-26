/**
 * isAuthenticated middleware
 */
module.exports = (req, res, next) => {
  if (req.session.auth || req.path === "/login") {
    next();
  } else {
    res.redirect("/login");
  }
};
