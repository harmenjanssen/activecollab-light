require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const isAuthenticated = require("./util/is-authenticated");
const ac = require("activecollabjs")();

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

app.get("/", (req, res) => {
  res.render("pages/home", { title: "Hey", message: "Hello there!" });
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post("/login", (req, res) => {
  const { email, password, self_hosted } = req.body;
  const credentials = {
    username: email,
    password: password,
    client_name: "ActiveCollab Light",
    client_vendor: "Grrr",
    host: self_hosted.endsWith("/") ? self_hosted : `${self_hosted}/`
  };

  console.log(JSON.stringify(credentials));
  ac.init(credentials, (err, response) => {
    if (err) {
      console.error(err);
      console.error(err.message);
      res.render("pages/login", { error: err.message });
      return;
    }

    req.session.auth = response.token;
    res.redirect("/");
    /*
      let options = {
        json: true,
        method: "POST",
        headers: [
        ],
        body: {
          name: "Task #1",
          labels: ["New", "Deferred"]
        }
      };

      ac.api("/projects/1/tasks", options, (err, response) => {
        console.log(response);
      });
    */
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
