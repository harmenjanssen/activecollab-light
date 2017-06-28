require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const isAuthenticated = require("./util/is-authenticated");

const routes = ["auth", "projects"].reduce(
  (routes, id) =>
    Object.assign(routes, { [`/${id}`]: require(`./routes/${id}`) }),
  {}
);

const app = express();

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "pug");

/**
 * Init routes
 */
app.use("/", require("./routes/pages"));
Object.keys(routes).map(baseUrl => app.use(baseUrl, routes[baseUrl]));

app.use((err, res, req, next) => {
  console.error(err);
  res.status(500).render("errors/error");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
