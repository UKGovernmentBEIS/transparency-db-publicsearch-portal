// ********************************************************************
// Gov.UK public user search subsidy awards beneficiary name routing
// ********************************************************************
const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const utils = require("../utils");

router.post("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

  var { homepage_button } = req.body;

  if (homepage_button == "start_now") {
    radio_beneficiaryname = "";
    text_beneficiaryname = "";
    subsidy_objective_isfirst = "Yes";
    spending_sector_isfirst = "Yes";
    subsidy_instrument_isfirst = "Yes";
    res.render("publicusersearch/beneficiaryname");
  }
});

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  res.render("publicusersearch/beneficiaryname");
});

module.exports = router;
