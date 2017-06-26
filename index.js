require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const app = express();

const isAuthenticated = (req, res, next) => {
  if (req.session.auth || req.path === "/login") {
    next();
  } else {
    res.redirect("/login");
  }
};

app.use(
  cookieSession({
    name: "ac-light-session",
    keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2],
    httpOnly: true,
    // Cookie Options
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
  })
);
app.use(helmet());
app.use(isAuthenticated);

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Hey", message: "Hello there!" });
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
