const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.get("/", (req, res) => {
  ssn = req.session;
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/privacy-notice");
});

module.exports = router;
