// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");


const render = "publicusersearch/mfaawards";

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  try{
    const gaListRequest = await axios.get(
      beis_url_publicsearch + "/schemes/all_gas",
      {
        headers: {
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "frame-ancestors 'self'",
        },
      }
    );
    console.log(`Status: ${gaListRequest.status}`);

    API_response_code = `${gaListRequest.status}`;
    console.log("All GAs API_response_code: try " + API_response_code);
    gaList = gaListRequest.data.gaList;
  }catch(err){
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    res.render("publicusersearch/noresults");
  }

  frontend_totalRecordsPerPage = 10;

  if(req.query.limit != "" && req.query.limit != null){
    frontend_totalRecordsPerPage = req.query.limit;
  }

  try {
    const apidata = await axios.get(
      beis_url_publicsearch + "/searchResults" + req.originalUrl,
      {
        headers: {
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "frame-ancestors 'self'",
        },
      }
    );
    console.log(`Status: ${apidata.status}`);

    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try " + API_response_code);
    //console.log("Body: ", apidata.data);
    mfaResults = apidata.data;
    totalrows = mfaResults.totalSearchResults;

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

    if(req.query.page != "" && req.query.page != null){
      current_page_active = parseInt(req.query.page);
    }

    if (current_page_active == 1) {
      previous_page = 1;
      next_page = 2;
    } else if (current_page_active == pageCount) {
      previous_page = pageCount - 1;
      next_page = pageCount;
    } else {
      previous_page = current_page_active - 1;
      next_page = current_page_active + 1;
    }

    if (current_page_active == 1) {
      start_record = 1;
      end_record = frontend_totalRecordsPerPage;
    } else if (current_page_active == pageCount) {
      start_record = (current_page_active - 1) * frontend_totalRecordsPerPage + 1;
      end_record = totalrows;
    } else {
      start_record =
      current_page_active * frontend_totalRecordsPerPage -
        frontend_totalRecordsPerPage +
        1;
      end_record = current_page_active * frontend_totalRecordsPerPage;
    }

    // populate filters
    filters = {
      speia:"",
      ga:"",
      confirmationFromDay:"",
      confirmationFromMonth:"",
      confirmationFromYear:"",
      confirmationToDay:"",
      confirmationToMonth:"",
      confirmationToYear:"",
      status: "",
      amountFrom: "",
      amountTo: "",
      mfaGroupingName: "",
      recipient: "",
    }

    filterString = "";

    // SPEI assistance filter

    if(req.query["speia"] != null){
      filters.speia = req.query["speia"];
      filterString += "&speia=" + filters.speia
    }

    // Granting authority filter

    if(req.query["ga"] != null){
      filters.ga = req.query["ga"];
      filterString += "&ga=" + filters.ga
    }

    // name filter

    if(req.query["recipient"] != null){
      filters.recipient = req.query["recipient"];
      filterString += "&recipient=" + filters.recipient
    }

    // mfa grouping filter

    if(req.query["recipient"] != null){
      filters.mfaGroupingName = req.query["mfa-grouping"];
      filterString += "&mfa-grouping=" + filters.mfaGroupingName
    }

    // filter confirmation date

    if(req.query["confirmation-day-from"] != null){
      filters.confirmationFromDay = req.query["confirmation-day-from"];
      filterString += "&confirmation-day-from=" + filters.confirmationFromDay
    }
    
    if(req.query["confirmation-month-from"] != null){
      filters.confirmationFromMonth = req.query["confirmation-month-from"];
      filterString += "&confirmation-month-from=" + filters.confirmationFromMonth
    }
    
    if(req.query["confirmation-year-from"] != null){
      filters.confirmationFromYear = req.query["confirmation-year-from"];
      filterString += "&confirmation-year-from=" + filters.confirmationFromYear
    }
    
    if(req.query["confirmation-day-to"] != null){
      filters.confirmationToDay = req.query["confirmation-day-to"];
      filterString += "&confirmation-day-to=" + filters.confirmationToDay
    }
    
    if(req.query["confirmation-month-to"] != null){
      filters.confirmationToMonth = req.query["confirmation-month-to"];
      filterString += "&confirmation-month-to=" + filters.confirmationToMonth
    }
    
    if(req.query["confirmation-year-to"] != null){
      filters.confirmationToYear = req.query["confirmation-year-to"];
      filterString += "&confirmation-year-to=" + filters.confirmationToYear
    }

    // status filter

    if(req.query["status"] != null){
      filters.status = req.query["status"];
      filterString += "&status=" + filters.status
    }

    // amount filter

    if(req.query["amount-from"] != null){
      filters.amountFrom = req.query["amount-from"];
      filterString += "&amount-from=" + filters.amountFrom
    }

    if(req.query["amount-to"] != null){
      filters.amountTo = req.query["amount-to"];
      filterString += "&amount-to=" + filters.amountTo
    }

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 10;
    }
    res.render(render, {
      mfaResults,
      gaList,
      filters,
      filterString,
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
