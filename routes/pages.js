const express = require("express");
const router = express.Router();
const ac = require("activecollabjs")();

router.get("/", (req, res) => {
  const options = {
    json: true,
    method: "GET"
  };

  ac.api("/projects/", options, (err, response) => {
    err ? console.error(err) : console.log(response);
  });

  res.render("pages/home", { title: "Hey", message: "Hello there!" });
});

module.exports = router;
