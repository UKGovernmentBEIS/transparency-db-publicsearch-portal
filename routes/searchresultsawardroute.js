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

  console.log("req.query.page: " + req.query.page);
  awardnumber = req.query.page;

  console.log("awardnumber : " + awardnumber);

  var awardendpoint =
    beis_url_publicsearch + "/searchResults/award/" + awardnumber;

  try {
    const awardapidata = await axios.get(awardendpoint);
    console.log(`Status: ${awardapidata.status}`);
    console.log("Body: ", awardapidata.data);
    searchawarddetails = awardapidata.data;
    res.render("publicusersearch/searchresultsawarddetail");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
