const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res);
  res.render("publicusersearch/cookies-help");
});

module.exports = router;
