// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const { debug } = require("request");
const render = "publicusersearch/schemes";

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // need to get this from the URL (where possible)
  frontend_totalRecordsPerPage = 10;

  try {
    const apidata = await axios.get(
      // will likely need to build this URL up from it's component parts, and add the total records per page if not included.
      // this is order to allow for the results per page to persist
      // will likely need to do the same for the filtering options - probably use ssn?
      beis_url_publicsearch + req.originalUrl,
      {
        headers: {
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "frame-ancestors 'self'",
        },
      }
    );
    console.log(`Status: ${apidata.status}`);

    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log("Body: ", apidata.data);
    searchschemes = apidata.data;

    //TODO: Refactor below to work for schemes, not awards
    var searchschemes_api = apidata.data;
    console.log("searchschemes" + searchschemes_api);
    const seachawardstring = JSON.stringify(searchschemes_api);
    const seachawardJSON = JSON.parse(seachawardstring);
    totalrows = searchschemes.totalResults;
    console.log(searchschemes.subsidySchemes[0].scNumber);

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    console.log("totalrows :" + totalrows);
    console.log("pageCount :" + pageCount);
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;
    sorting_order_pass = JSON.parse("[]");
    
    scnumber_arrow = "updecending";


    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 10;
    }
    res.render(render, {
      pageCount,
      previous_page,
      next_page,
      end_record,
      start_record,
      totalrows,
      current_page_active,
    });
  } catch (err) {
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    res.render("publicusersearch/noresults");
  }
  // end of GET call
});

module.exports = router;
