// ********************************************************************
// Gov.UK public user search subsidy awards beneficiary name routing
// ********************************************************************
const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const utils = require("../utils");

// ********************************************************
// Read environment property file and set the API URL end points
// ********************************************************

Environment_variable = process.argv[2];
if (Environment_variable == "env=local") {
  // beis_url_publicsearch =          PREVIOUS URL
  //   "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  
  beis_url_publicsearch =
      "http://localhost:8581"; //http://localhost:8581

  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=dev") {
  // beis_url_publicsearch =          PREVIOUS URL
  //   "https://dev-beis-tp-db-public-search-service.azurewebsites.net";
  
  // JP 10-05-21
  beis_url_publicsearch =
      "https://dev-transparency-db-public-search-service.azurewebsites.net";

  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=integ") {
  beis_url_publicsearch =
    "https://integ-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=stg") {
  beis_url_publicsearch =
    "https://stg-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=prod") {
  beis_url_publicsearch =
    "https://prod-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=preprod") {
  beis_url_publicsearch =
    "https://default-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
}

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
