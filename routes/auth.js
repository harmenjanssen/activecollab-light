const express = require("express");
const router = express.Router();
const ac = require("activecollabjs")();

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const selfHostedUrl = process.env.SELF_HOSTED_URL;
  const credentials = {
    username: email,
    password: password,
    client_name: "ActiveCollab Light",
    client_vendor: "Grrr",
    host: selfHostedUrl.endsWith("/") ? selfHostedUrl : `${selfHostedUrl}/`
  };

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

module.exports = router;
