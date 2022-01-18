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
    console.log("API_response_code: try " + API_response_code);
    //console.log("Body: ", apidata.data);
    searchschemes = apidata.data;

    var searchschemes_api = apidata.data;
    totalrows = searchschemes.totalResults;

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
      scnumber:"",
      name:"",
      ga:"",
      startFromDay:"",
      startFromMonth:"",
      startFromYear:"",
      startToDay:"",
      startToMonth:"",
      startToYear:"",
      endFromDay:"",
      endFromMonth:"",
      endFromYear:"",
      endToDay:"",
      endToMonth:"",
      endToYear:"",
      status: "",
      budgetFrom: "",
      budgetTo: "",
    }

    filterString = "";

    // Granting authority filter

    if(req.query["ga"] != null){
      filters.ga = req.query["ga"];
      filterString += "&ga=" + filters.ga
    }

    // SC number filter

    if(req.query["scnumber"] != null){
      filters.scnumber = req.query["scnumber"];
      filterString += "&scnumber=" + filters.scnumber
    }

    // name filter

    if(req.query["name"] != null){
      filters.name = req.query["name"];
      filterString += "&name=" + filters.name
    }

    // filter start date

    if(req.query["start-day-from"] != null){
      filters.startFromDay = req.query["start-day-from"];
      filterString += "&start-day-from=" + filters.startFromDay
    }
    
    if(req.query["start-month-from"] != null){
      filters.startFromMonth = req.query["start-month-from"];
      filterString += "&start-month-from=" + filters.startFromMonth
    }
    
    if(req.query["start-year-from"] != null){
      filters.startFromYear = req.query["start-year-from"];
      filterString += "&start-year-from=" + filters.startFromYear
    }
    
    if(req.query["start-day-to"] != null){
      filters.startToDay = req.query["start-day-to"];
      filterString += "&start-day-to=" + filters.startToDay
    }
    
    if(req.query["start-month-to"] != null){
      filters.startToMonth = req.query["start-month-to"];
      filterString += "&start-month-to=" + filters.startToMonth
    }
    
    if(req.query["start-year-to"] != null){
      filters.startToYear = req.query["start-year-to"];
      filterString += "&start-year-to=" + filters.startToYear
    }

    // filter end date

    if(req.query["end-day-from"] != null){
      filters.endFromDay = req.query["end-day-from"];
      filterString += "&end-day-from=" + filters.endFromDay
    }
    
    if(req.query["end-month-from"] != null){
      filters.endFromMonth = req.query["end-month-from"];
      filterString += "&end-month-from=" + filters.endFromMonth
    }
    
    if(req.query["end-year-from"] != null){
      filters.endFromYear = req.query["end-year-from"];
      filterString += "&end-year-from=" + filters.endFromYear
    }
    
    if(req.query["end-day-to"] != null){
      filters.endToDay = req.query["end-day-to"];
      filterString += "&end-day-to=" + filters.endToDay
    }
    
    if(req.query["end-month-to"] != null){
      filters.endToMonth = req.query["end-month-to"];
      filterString += "&end-month-to=" + filters.endToMonth
    }
    
    if(req.query["end-year-to"] != null){
      filters.endToYear = req.query["end-year-to"];
      filterString += "&end-year-to=" + filters.endToYear
    }

    // status filter

    if(req.query["status"] != null){
      filters.status = req.query["status"];
      filterString += "&status=" + filters.status
    }

    if(req.query["adhoc"] != null){
      filters.adhoc = req.query["adhoc"];
      filterString += "&adhoc=" + filters.adhoc
    }

    if(req.query["budget-from"] != null){
      filters.budgetFrom = req.query["budget-from"];
      filterString += "&budget-from=" + filters.budgetFrom
    }

    if(req.query["budget-to"] != null){
      filters.budgetTo = req.query["budget-to"];
      filterString += "&budget-to=" + filters.budgetTo
    }

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 10;
    }
    res.render(render, {
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
