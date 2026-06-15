// ********************************************************************
// Gov.UK transparency subsidy scheme version detail page
// ********************************************************************

const express = require("express");
var session = require("express-session");
const router = express.Router();

const axios = require("axios");
var request = require("request");
const utils = require("../utils");

router.get("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

  console.log("scNumber: " + req.query.scNumber);
  console.log("version: " + req.query.version);
  const scnumber = req.query.scNumber;
  const version = req.query.version;

  const currentURI = req.protocol + '://' + req.get('host') + req.originalUrl;
  const versionEndpoint = beis_url_publicsearch + "/schemes/scheme/" + scnumber + "/version/" + version;
  const schemeEndpoint = beis_url_publicsearch + "/schemes/scheme/" + scnumber;

  try {
    var response = await axios.get(
      versionEndpoint,
    )
    schemeVersionDetails = response.data;
    
    schemeVersionDetails.spendingSectorArray = new Array();
    if(schemeVersionDetails.spendingSectors != null){
      schemeVersionDetails.spendingSectorArray = JSON.parse(schemeVersionDetails.spendingSectors);
    }

    schemeVersionDetails.purposeArray = new Array();
    if(schemeVersionDetails.purpose != null){
      schemeVersionDetails.purposeArray = JSON.parse(schemeVersionDetails.purpose);
    }

    res.render("publicusersearch/scheme-version", {
      currentURI: req.protocol + '://' + req.get('host') + req.originalUrl
    });
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults");
      console.warn("No results found for scheme number " + scnumber);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
