const express = require("express");
const router = express.Router();
const getActiveCollab = require("../util/activecollab");

router.get("/", (req, res, next) => {
  const ac = getActiveCollab(req);
  ac.api(
    "/projects/",
    { json: true, method: "GET" },
    (err, response) =>
      err ? next(err) : res.render("projects/index", { projects: response })
  );
});

router.get("/:projectId", (req, res, next) => {
  const ac = getActiveCollab(req);
  ac.api(
    `/projects/${req.params.projectId}`,
    { json: true, method: "GET" },
    (err, response) =>
      err ? next(err) : res.render("projects/single", { project: response })
  );
});

module.exports = router;
