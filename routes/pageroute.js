// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");

router.get("/", async (req, res) => {
  console.log("req.query.page: " + req.query.page);
  console.log("beneficiary_sorting_order :" + beneficiary_sorting_order);
  //  frontend_totalRecordsPerPage = 3;
  routing_pagenumber = req.query.page;

  if (routing_pagenumber == 999997) {
    current_page = 1;
    fetch_pagenumber = 1;
    if (beneficiary_sorting_order == "asc") {
      sorting_column =
        "[" + '"' + "beneficiary.beneficiaryName,desc" + '"' + "]";
      beneficiary_arrow = "updecending";
      subsidyamount_arrow = "upanddown";
      legalgrantingdate_arrow = "upanddown";
      beneficiary_sorting_order = "desc";
    } else {
      sorting_column =
        "[" + '"' + "beneficiary.beneficiaryName,asc" + '"' + "]";
      beneficiary_arrow = "downacending";
      subsidyamount_arrow = "upanddown";
      legalgrantingdate_arrow = "upanddown";
      beneficiary_sorting_order = "asc";
    }

    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    sorting_order_pass = JSON.parse(sorting_order_interium);
    console.log("sorting_order_interium" + sorting_order_interium);
  } else if (routing_pagenumber == 999998) {
    current_page = 1;
    fetch_pagenumber = 1;
    if (legalgrantingdate_sorting_order == "asc") {
      sorting_column = "[" + '"' + "legalGrantingDate,desc" + '"' + "]";
      beneficiary_arrow = "upanddown";
      subsidyamount_arrow = "upanddown";
      legalgrantingdate_arrow = "updecending";
      legalgrantingdate_sorting_order = "desc";
    } else {
      sorting_column = "[" + '"' + "legalGrantingDate,asc" + '"' + "]";
      beneficiary_arrow = "upanddown";
      subsidyamount_arrow = "upanddown";
      legalgrantingdate_arrow = "downacending";
      legalgrantingdate_sorting_order = "asc";
    }

    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    sorting_order_pass = JSON.parse(sorting_order_interium);
    console.log("sorting_order_interium :" + sorting_order_interium);
  } else if (routing_pagenumber == 999999) {
    // frontend_totalRecordsPerPage = 10;
    current_page = 1;
    fetch_pagenumber = 1;
    if (subsidyamount_sorting_order == "asc") {
      sorting_column = "[" + '"' + "subsidyFullAmountExact,desc" + '"' + "]";
      beneficiary_arrow = "upanddown";
      subsidyamount_arrow = "updecending";
      legalgrantingdate_arrow = "upanddown";
      subsidyamount_sorting_order = "desc";
    } else {
      sorting_column = "[" + '"' + "subsidyFullAmountExact,asc" + '"' + "]";
      beneficiary_arrow = "upanddown";
      subsidyamount_arrow = "downacending";
      legalgrantingdate_arrow = "upanddown";
      subsidyamount_sorting_order = "asc";
    }

    sorting_order_interium = sorting_column.replace(/^"(.*)"$/, "$1");
    sorting_order_pass = JSON.parse(sorting_order_interium);
    console.log("sorting_order_interium :" + sorting_order_interium);
  } else {
    fetch_pagenumber = routing_pagenumber;
    current_page = parseInt(routing_pagenumber);
    //  sorting_order_pass = JSON.parse("[]");
    console.log("sorting_order_pass : " + sorting_order_pass);
    console.log("current_page pageroute : " + current_page);
  }

  current_page_active = current_page;

  if (current_page == 1) {
    previous_page = 1;
    next_page = 2;
  } else if (current_page == pageCount) {
    previous_page = pageCount - 1;
    next_page = pageCount;
  } else {
    previous_page = current_page - 1;
    next_page = current_page + 1;
  }

  start_index = current_page;

  console.log("routing current page :" + current_page);
  console.log("routing prev page :" + previous_page);
  console.log("routing next page :" + next_page);

  const data_request_all = {
    beneficiaryName: text_beneficiaryname,
    subsidyMeasureTitle: "",
    subsidyObjective: actual_subsidy_objective_pass1,
    spendingRegion: [],
    subsidyInstrument: actual_subsidy_instrument_pass1,
    spendingSector: actual_spending_sector_pass1,
    legalGrantingFromDate: legal_granting_from_date,
    legalGrantingToDate: legal_granting_to_date,
    pageNumber: 1,
    totalRecordsPerPage: 500000,
    sortBy: sorting_order_pass,
  };
  data_request_clientside = JSON.stringify(data_request_all);

  const data_request = {
    beneficiaryName: text_beneficiaryname,
    subsidyMeasureTitle: "",
    subsidyObjective: actual_subsidy_objective_pass1,
    spendingRegion: [],
    subsidyInstrument: actual_subsidy_instrument_pass1,
    spendingSector: actual_spending_sector_pass1,
    legalGrantingFromDate: legal_granting_from_date,
    legalGrantingToDate: legal_granting_to_date,
    pageNumber: fetch_pagenumber,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: sorting_order_pass,
  };

  var data = JSON.parse(JSON.stringify(data_request));
  console.log("request data : " + data);

  try {
    const apidata = await axios.post(
      beis_url_publicsearch + "/searchResults",
      data
    );
    console.log(`Status: ${apidata.status}`);
    console.log("Body: ", apidata.data);
    searchawards = apidata.data;
    var searchawards_api = apidata.data;
    console.log("searchawards" + searchawards_api);
    const seachawardstring = JSON.stringify(searchawards_api);
    // console.log('seachawardstring' + seachawardstring );
    const seachawardJSON = JSON.parse(seachawardstring);
    // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
    totalrows = parseInt(searchawards.totalSearchResults);
    console.log(searchawards.awards[0].beneficiary.beneficiaryType);
    console.log(searchawards.awards[0].subsidyFullAmountExact);
    console.log("req.query.page: " + req.query.page);

    if (current_page == 1) {
      start_record = 1;
      end_record = frontend_totalRecordsPerPage;
    } else if (current_page == pageCount) {
      start_record = (current_page - 1) * frontend_totalRecordsPerPage + 1;
      end_record = totalrows;
    } else {
      start_record =
        current_page * frontend_totalRecordsPerPage -
        frontend_totalRecordsPerPage +
        1;
      end_record = current_page * frontend_totalRecordsPerPage;
    }

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);

    // this is for page management section

    if (current_page < 5 && pageCount > 9) {
      start_page = 1;
      end_page = 9;
    } else if (current_page < 5 && pageCount <= 9) {
      start_page = 1;
      end_page = pageCount;
    } else if (current_page >= 5 && pageCount <= 9) {
      start_page = 1;
      end_page = pageCount;
    }
    if (current_page >= 5 && pageCount > 9) {
      start_page = current_page - 4;
      end_page = current_page + 4;
      nearby_last_page = pageCount - 4;
      if (current_page >= nearby_last_page) {
        end_page = pageCount;
        start_page = pageCount - 9;
      }
    }

    // if ( pageCount < 11) { start_page = 1; end_page = pageCount }
    // if ( pageCount > 10  )
    // {
    //     if (current_page == 1) {  start_page = 1; end_page = 10    }
    //     else if (current_page % 10 == 1 && current_page != 1 )
    //       { start_page = current_page - 10; end_page = current_page - 1  }
    //     else if (current_page % 10 == 0 && current_page != pageCount)

    //       {
    //          start_page = current_page + 1;
    //          end_page = current_page + 10

    //          check_nearby_last_page = pageCount - start_page;

    //          if (check_nearby_last_page < 9) {
    //           end_page = pageCount
    //           start_page = pageCount -9

    //          }

    //         else if (end_page > pageCount)
    //           {
    //             console.log("last pagination")
    //             end_page = pageCount
    //             start_page = pageCount -9
    //           }

    //         else if (end_page == pageCount)
    //         {
    //           console.log("eactly last pagecount")
    //           end_page = pageCount;
    //           start_page = pageCount -9
    //              }

    //        }
    //   else if(current_page == pageCount) {

    //     console.log("eactly last pagecount out")
    //     end_page = pageCount;
    //     start_page = pageCount -9
    //   }

    //   else if(current_page % 10 != 0 && current_page % 10 != 1) {
    //     console.log("ordinary")
    //     round_value = Math.floor(current_page /10);
    //     start_page = round_value * 10 + 1;
    //     end_page   = start_page + 9;
    //   }

    // }

    console.log("Start Page :" + start_page);
    console.log("end page :" + end_page);
    console.log("page count: " + pageCount);

    res.set("X-Frame-Options", "DENY");
    res.set("X-Content-Type-Options", "nosniff");
    res.set("Content-Security-Policy", 'frame-ancestors "self"');
    res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
    res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

    res.render("publicusersearch/searchresults", {
      pageCount,
      previous_page,
      next_page,
      current_page_active,
      start_record,
      end_record,
      totalrows,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  legalgrantingdate_arrow = "downacending";
  res.render("publicusersearch/searchresults");
});

module.exports = router;
