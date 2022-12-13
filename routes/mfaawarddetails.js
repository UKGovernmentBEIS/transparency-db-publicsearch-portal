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

  mfaAwardNumber = req.query.id;
  var endpoint =
    beis_url_publicsearch + "/searchResults/mfa/" + mfaAwardNumber;

  try {
    const response = await axios.get(endpoint);

    var mfaAward = response.data;
    if(response.data.status.toLowerCase() == "rejected" || response.data.status.toLowerCase() == "awaiting approval"){
      res.render("publicusersearch/noresults");
    }else{
      res.render("publicusersearch/mfaawarddetails",{
        mfaAward,
      });;
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
