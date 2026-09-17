// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
const utils = require("../utils");

router.get("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  const defaultReturnUrl = '/awards';
  var returnUrl = req.query.returnUrl || defaultReturnUrl;
  const awardnumber = req.query.award || '0';

  var awardendpoint =
    beis_url_publicsearch + "/searchResults/award/" + awardnumber;

  try {
    const awardapidata = await axios.get(awardendpoint);
    var searchawarddetails = awardapidata.data;
    var backButton_href = returnUrl;
    if(searchawarddetails.subsidyObjective != null){
      searchawarddetails.objectiveArray = JSON.parse(searchawarddetails.subsidyObjective);
    }

    searchawarddetails.spendingRegionArray = new Array();

    if (searchawarddetails.spendingRegion){
      searchawarddetails.spendingRegionArray = JSON.parse(searchawarddetails.spendingRegion);
    }

    if(returnUrl && returnUrl.includes('/scheme') && typeof searchmeasuredetails !== 'undefined')
    {      
      backButton_href = returnUrl;
      backButton_text = "Back to scheme details";
    }
    else
    {
      backButton_href = returnUrl; 
      backButton_text = "Back to search results";
    }

    if (searchawarddetails.subsidyMeasure.status === "Deleted" || searchawarddetails.status === "Rejected") {
      res.render("publicusersearch/noresults",{
        backButton_href
      });
    } else {
      res.render("publicusersearch/searchresultsawarddetail", {
        searchawarddetails,
        backButton_href
      });
    }
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults",{
        backButton_href
      });
      console.warn("No results found for award number " + awardnumber);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
