const express = require("express");
const router = express.Router();
const getActiveCollab = require("../util/activecollab");

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const credentials = {
    username: email,
    password: password,
    client_name: "ActiveCollab Light",
    client_vendor: "Grrr"
  };

  const ac = getActiveCollab(req);
  ac.init(credentials, (err, response) => {
    if (err) {
      console.error(err);
      console.error(err.message);
      res.render("pages/login", { error: err.message });
      return;
    }

    req.session.auth = response.token;
    res.redirect("/");
  });
});

module.exports = router;
