// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
var utils = require("../utils");

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
    beis_url_publicsearch + "/schemes/scheme/withawards/" + scheme;

  currentPage = 1;
  if (req.query.hasOwnProperty("page")) {
    var pageParse = parseInt(req.query.page);
    if (!isNaN(pageParse)) {
      if(typeof totalPages === "undefined")
        totalPages = 1;
      currentPage = Math.max(1, Math.min(pageParse, totalPages));
    }
  }
  prevPage = Math.max(1, currentPage - 1);
  perPage = 10;
  if (req.query.hasOwnProperty("perPage")) {
    var perPageParse = parseInt(req.query.perPage);
    if (!isNaN(perPageParse)) {
      perPage = perPageParse;
    }
  }
  try {
    const awardRequest = {
      scNumber: scheme,
      pageNumber: currentPage,
      totalRecordsPerPage: perPage,
      sortBy: ["awardNumber,desc"],
    };
    await axios.post(
      measureendpoint,
      awardRequest
    ).then((response) => {
      console.log(`Status: ${response.status}`);
      console.log("Body: ", response.data);
      searchmeasuredetails = response.data;
      schemeVersions = searchmeasuredetails.schemeVersions;
      
      if(typeof response.awardSearchResults != 'undefined')
        totalSearchResults = response.data.awardSearchResults.totalSearchResults;
      else
        totalSearchResults = 0;

      if(totalSearchResults > 0){      
        totalPages = response.data.awardSearchResults.totalPages;
        hasAwards = true;
        console.log(hasAwards);
        console.log(totalSearchResults)
        startRecord = ((currentPage - 1) * perPage) + 1;
        endRecord = Math.min((currentPage * perPage), totalSearchResults);

        searchawards = response.data.awardSearchResults.awards;
        nextPage = Math.min(totalPages, currentPage + 1);
        pagingStart = Math.max(1, currentPage - 5);
        pagingEnd = Math.min(totalPages, currentPage + 5);
      }
      else
        hasAwards = false;

      var spendingSectorArray = new Array();
      if(typeof searchmeasuredetails.spendingSectors !== 'undefined'){
        var spendingSectorArray = JSON.parse(searchmeasuredetails.spendingSectors);
      }

      if(response.data.status == "Deleted")
      {
        res.render("publicusersearch/noresults");
      }
      else
      {
        res.render("publicusersearch/schemedetails",
        {
          currentURI: req.protocol + '://' + req.get('host') + req.originalUrl,
          spendingSectorArray,

        });
      }
    });
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults");
      console.warn("No results found for scheme number " + scheme);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
