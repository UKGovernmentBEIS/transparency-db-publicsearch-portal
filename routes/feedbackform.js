const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/feedbackform");
});

module.exports = router;
