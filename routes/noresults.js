// *********************************************************
// Gov.UK public user search subsidy awards noresults routing
// *********************************************************

const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.post("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/noresults");
});

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/noresults");
});

module.exports = router;
