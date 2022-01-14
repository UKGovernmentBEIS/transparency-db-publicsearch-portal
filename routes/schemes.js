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
    console.log("All GAs API_response_code: try" + API_response_code);
    gaList = gaListRequest.data.gaList;
  }catch(err){
    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    res.render("publicusersearch/noresults");
  }

  // need to get this from the URL (where possible)
  frontend_totalRecordsPerPage = 10;

  if(req.query.limit != "" && req.query.limit != null){
    frontend_totalRecordsPerPage = req.query.limit;
  }

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

    if(req.query["filter-ga"] != null){
      filters.ga = req.query["filter-ga"];
      filterString += "&filter-ga=" + filters.ga
    }

    // SC number filter

    if(req.query["filter-scnumber"] != null){
      filters.scnumber = req.query["filter-scnumber"];
      filterString += "&filter-scnumber=" + filters.scnumber
    }

    // name filter

    if(req.query["filter-name"] != null){
      filters.name = req.query["filter-name"];
      filterString += "&filter-name=" + filters.name
    }

    // filter start date

    if(req.query["filter-start-day-from"] != null){
      filters.startFromDay = req.query["filter-start-day-from"];
      filterString += "&filter-start-day-from=" + filters.startFromDay
    }
    
    if(req.query["filter-start-month-from"] != null){
      filters.startFromMonth = req.query["filter-start-month-from"];
      filterString += "&filter-start-month-from=" + filters.startFromMonth
    }
    
    if(req.query["filter-start-year-from"] != null){
      filters.startFromYear = req.query["filter-start-year-from"];
      filterString += "&filter-start-year-from=" + filters.startFromYear
    }
    
    if(req.query["filter-start-day-to"] != null){
      filters.startToDay = req.query["filter-start-day-to"];
      filterString += "&filter-start-day-to=" + filters.startToDay
    }
    
    if(req.query["filter-start-month-to"] != null){
      filters.startToMonth = req.query["filter-start-month-to"];
      filterString += "&filter-start-month-to=" + filters.startToMonth
    }
    
    if(req.query["filter-start-year-to"] != null){
      filters.startToYear = req.query["filter-start-year-to"];
      filterString += "&filter-start-year-to=" + filters.startToYear
    }

    // filter end date

    if(req.query["filter-end-day-from"] != null){
      filters.endFromDay = req.query["filter-end-day-from"];
      filterString += "&filter-end-day-from=" + filters.endFromDay
    }
    
    if(req.query["filter-end-month-from"] != null){
      filters.endFromMonth = req.query["filter-end-month-from"];
      filterString += "&filter-end-month-from=" + filters.endFromMonth
    }
    
    if(req.query["filter-end-year-from"] != null){
      filters.endFromYear = req.query["filter-end-year-from"];
      filterString += "&filter-end-year-from=" + filters.endFromYear
    }
    
    if(req.query["filter-end-day-to"] != null){
      filters.endToDay = req.query["filter-end-day-to"];
      filterString += "&filter-end-day-to=" + filters.endToDay
    }
    
    if(req.query["filter-end-month-to"] != null){
      filters.endToMonth = req.query["filter-end-month-to"];
      filterString += "&filter-end-month-to=" + filters.endToMonth
    }
    
    if(req.query["filter-end-year-to"] != null){
      filters.endToYear = req.query["filter-end-year-to"];
      filterString += "&filter-end-year-to=" + filters.endToYear
    }

    // status filter

    if(req.query["filter-status"] != null){
      filters.status = req.query["filter-status"];
      filterString += "&filter-status=" + filters.status
    }

    if(req.query["filter-adhoc"] != null){
      filters.adhoc = req.query["filter-adhoc"];
      filterString += "&filter-adhoc=" + filters.adhoc
    }

    if(req.query["filter-budget-from"] != null){
      filters.budgetFrom = req.query["filter-budget-from"];
      filterString += "&filter-budget-from=" + filters.budgetFrom
    }

    if(req.query["filter-budget-to"] != null){
      filters.budgetTo = req.query["filter-budget-to"];
      filterString += "&filter-budget-to=" + filters.budgetTo
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
