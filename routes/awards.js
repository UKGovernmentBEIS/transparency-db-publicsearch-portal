// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const { debug } = require("request");

router.get("/", async (req, res) => {
    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    var recordsPerPage = 10; // get from request and default to 10
    var currentPage = 1; // will get from request and default to 1
    var startRecord;
    var endRecord;

    const data_request = {
        beneficiaryName: "",
        subsidyMeasureTitle: "",
        subsidyObjective: [],
        spendingRegion: [],
        subsidyInstrument: [],
        spendingSector: [],
        legalGrantingFromDate: "",
        legalGrantingToDate: "",
        pageNumber: 1,
        totalRecordsPerPage: recordsPerPage,
        sortBy: [""],
      };
  
    var data = JSON.parse(JSON.stringify(data_request));

    try {
        const apidata = await axios.post(
            beis_url_publicsearch + "/searchResults",
            data,
            {
            headers: {
              "X-Frame-Options": "DENY",
              "Content-Security-Policy": "frame-ancestors 'self'",
            },
            }
        );

        const results = apidata.data;
        const totalrows = results.totalSearchResults;
        const pageCount = Math.ceil(totalrows / recordsPerPage);

        if (currentPage == 1) {
            startRecord = 1;
            endRecord = recordsPerPage;
          } else if (currentPage == pageCount) {
            startRecord = (currentPage - 1) * recordsPerPage + 1;
            endRecord = totalrows;
          } else {
            startRecord = currentPage * recordsPerPage - recordsPerPage + 1;
            endRecord = currentPage * recordsPerPage;
          }

        res.render("publicusersearch/awards", {
            req,
            results,
            pageCount,
            currentPage,
            startRecord,
            endRecord,
            recordsPerPage
        });
    } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
        res.render("publicusersearch/noresults");
      }
  });
  
  module.exports = router;