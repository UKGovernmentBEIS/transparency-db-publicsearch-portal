// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("req.query.scnumber: " + req.query.scheme);
  scheme = req.query.scheme;
  console.log("scnumber : " + scheme);
  var measureendpoint =
    beis_url_publicsearch + "/schemes/scheme/" + scheme;

  try {
    const measureapidata =await axios.get(measureendpoint);
    console.log(`Status: ${measureapidata.status}`);
    console.log("Body: ", measureapidata.data);
    searchmeasuredetails = measureapidata.data;
    if(typeof searchmeasuredetails.spendingSectors !== 'undefined'){
      var spendingSectorArray = JSON.parse(searchmeasuredetails.spendingSectors);
    }
    if(measureapidata.data.status == "Deleted"){
      res.render("publicusersearch/noresults");
    }else{
      res.render("publicusersearch/schemedetails",{
        spendingSectorArray,
      });
    }
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults");
      console.warn("No results found for award number " + scheme);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
