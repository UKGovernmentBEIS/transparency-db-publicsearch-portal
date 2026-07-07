// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const utils = require("../utils");

router.get("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

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

    searchawarddetails.spendingRegionArray = new Array();

    if (searchawarddetails.spendingRegion){
      searchawarddetails.spendingRegionArray = JSON.parse(searchawarddetails.spendingRegion);
    }

    if(req.headers.referer && req.headers.referer.includes('/scheme') && typeof searchmeasuredetails !== 'undefined')
    {      
      backButton_href = "/scheme/?scheme=" + searchmeasuredetails.scNumber;
      backButton_text = "Back to scheme details";
    }
    else
    {
      if(searchawarddetails.standaloneAward == "Yes")
      {      
        backButton_href = "/awards";
        backButton_text = "Back to search results";
      }
      else
      {
        backButton_href = "/awards";
        backButton_text = "Back to search results";
      }  
    }

    if (searchawarddetails.subsidyMeasure.status === "Deleted" || searchawarddetails.status === "Rejected") {
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
