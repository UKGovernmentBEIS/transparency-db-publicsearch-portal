// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
const utils = require("../utils");

router.get("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

  console.log("req.query.scnumber: " + req.query.scheme);
  scheme = req.query.scheme;
  console.log("scnumber : " + scheme);
  var measureendpoint =
    beis_url_publicsearch + "/schemes/scheme/withawards/" + scheme;

  page = 1;
  const filters = {
    scheme: scheme
  };
  const anchor = 'searchresult-table';
  if (req.query.hasOwnProperty("page")) {
    var pageParse = parseInt(req.query.page);
    if (!isNaN(pageParse)) {
      if(typeof pageCount === "undefined")
        pageCount = 1;
      page = Math.max(1, Math.min(pageParse, pageCount));
    }
  }
  prevPage = Math.max(1, page - 1);
  size = 10;
  if (req.query.hasOwnProperty("size")) {
    var perPageParse = parseInt(req.query.size);
    if (!isNaN(perPageParse)) {
      size = perPageParse;
    }
  }
  try {
    const awardRequest = {
      scNumber: scheme,
      pageNumber: page,
      totalRecordsPerPage: size,
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
      
      if(typeof response.data.awardSearchResults != 'undefined')
        totalSearchResults = response.data.awardSearchResults.totalSearchResults;
      else
        totalSearchResults = 0;

      if(totalSearchResults > 0){      
        pageCount = response.data.awardSearchResults.totalPages;
        hasAwards = true;
        console.log(hasAwards);
        console.log(totalSearchResults)
        startRecord = ((page - 1) * size) + 1;
        endRecord = Math.min((page * size), totalSearchResults);

        results = response.data.awardSearchResults.awards;
        results.totalSearchResults = totalSearchResults;
        nextPage = Math.min(pageCount, page + 1);
        pagingStart = Math.max(1, page - 5);
        pagingEnd = Math.min(pageCount, page + 5);
      }
      else
        hasAwards = false;

      var spendingSectorArray = new Array();
      if(typeof searchmeasuredetails.spendingSectors !== 'undefined'){
        var spendingSectorArray = JSON.parse(searchmeasuredetails.spendingSectors);
      }

      var purposeArray = new Array();
      if(typeof searchmeasuredetails.purpose !== 'undefined'){
        var purposeArray = JSON.parse(searchmeasuredetails.purpose);
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
          purposeArray,
          anchor,
          filters
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
