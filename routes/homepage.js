// *********************************************************
// Gov.UK public user search subsidy awards homepage routing
// *********************************************************

const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.post("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/homepage");
});

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/homepage");
});

module.exports = router;
