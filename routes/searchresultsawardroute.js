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
  awardnumber = req.query.page;

  console.log("awardnumber : " + awardnumber);

  var awardendpoint =
    beis_url_publicsearch + "/searchResults/award/" + awardnumber;

  try {
    const awardapidata = await axios.get(awardendpoint);
    console.log(`Status: ${awardapidata.status}`);
    console.log("Body: ", awardapidata.data);
    searchawarddetails = awardapidata.data;
    var objectiveArray = new Array();
    if(searchawarddetails.subsidyObjective != null){
      objectiveArray = JSON.parse(searchawarddetails.subsidyObjective);
    }
    if(req.headers.referer && req.headers.referer.includes('/scheme') && typeof searchmeasuredetails !== 'undefined')
    {
      backButton_href = "/scheme/?scheme=" + searchmeasuredetails.scNumber;
      backButton_text = "Back to scheme details";
      backButton_method = "GET";
    }
    else
    {
      if(searchawarddetails.standaloneAward == "Yes")
      {      
        backButton_href = "/standaloneawards";
        backButton_text = "Back to standalone awards";
        backButton_method = "GET";
      }
      else
      {
        backButton_href = "/searchresults";
        backButton_text = "Back to search results";
        backButton_method = "POST";
      }  
    }

    if (searchawarddetails.subsidyMeasure.status == "Deleted") {
      res.render("publicusersearch/noresults");
    } else {
      res.render("publicusersearch/searchresultsawarddetail", {
        objectiveArray
      });
    }
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults");
      console.warn("No results found for award number " + awardnumber);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
