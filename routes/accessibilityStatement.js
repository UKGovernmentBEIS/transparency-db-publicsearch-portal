const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res);
  res.render("partials/accessibilityStatement");
});

module.exports = router;
