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

  console.log("req.query.page: " + req.query.page);
  scnumber = req.query.page;
  console.log("scnumber : " + scnumber);
  var measureendpoint =
    beis_url_publicsearch + "/searchResults/award/" + scnumber;

  try {
    const measureapidata = await axios.get(measureendpoint);
    console.log(`Status: ${measureapidata.status}`);
    console.log("Body: ", measureapidata.data);
    searchmeasuredetails = measureapidata.data;
    if (searchmeasuredetails.subsidyMeasure.status == "Deleted"){
      res.render("publicusersearch/noresults");
    }else{
      res.render("publicusersearch/searchresultsmeasuredetail");
    }    
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
