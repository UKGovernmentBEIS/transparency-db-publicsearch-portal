// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const { debug } = require("request");
const { json } = require("express");
const { data } = require("jquery");
const render = "publicusersearch/standaloneawards";

router.get("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  frontend_totalRecordsPerPage = 10;

  if (req.query.limit != "" && req.query.limit != null) {
    frontend_totalRecordsPerPage = req.query.limit;
  }

  var subsidyObjectiveArray = new Array();
  var spendingSectorArray = new Array();
  var subsidyInstrumentArray = new Array();

  if (req.query["subsidyobjective0"] != null) {
    check_subsidyobjective0 = '"' + req.query["subsidyobjective0"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective0"]);
  } else {
    check_subsidyobjective0 = "";
  }

  if (req.query["subsidyobjective1"] != null) {
    check_subsidyobjective1 = '"' + req.query["subsidyobjective1"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective1"]);
  } else {
    check_subsidyobjective1 = "";
  }

  if (req.query["subsidyobjective2"] != null) {
    check_subsidyobjective2 = '"' + req.query["subsidyobjective2"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective2"]);
  } else {
    check_subsidyobjective2 = "";
  }

  if (req.query["subsidyobjective3"] != null) {
    check_subsidyobjective3 = '"' + req.query["subsidyobjective3"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective3"]);
  } else {
    check_subsidyobjective3 = "";
  }

  if (req.query["subsidyobjective4"] != null) {
    check_subsidyobjective4 = '"' + req.query["subsidyobjective4"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective4"]);
  } else {
    check_subsidyobjective4 = "";
  }

  if (req.query["subsidyobjective5"] != null) {
    check_subsidyobjective5 = '"' + req.query["subsidyobjective5"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective5"]);
  } else {
    check_subsidyobjective5 = "";
  }

  if (req.query["subsidyobjective6"] != null) {
    check_subsidyobjective6 = '"' + req.query["subsidyobjective6"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective6"]);
  } else {
    check_subsidyobjective6 = "";
  }

  if (req.query["subsidyobjective7"] != null) {
    check_subsidyobjective7 = '"' + req.query["subsidyobjective7"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective7"]);
  } else {
    check_subsidyobjective7 = "";
  }

  if (req.query["subsidyobjective8"] != null) {
    check_subsidyobjective8 = '"' + req.query["subsidyobjective8"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective8"]);
  } else {
    check_subsidyobjective8 = "";
  }

  if (req.query["subsidyobjective8a"] != null) {
    check_subsidyobjective8a = '"' + req.query["subsidyobjective8a"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective8a"]);
  } else {
    check_subsidyobjective8a = "";
  }

  if (req.query["subsidyobjective9"] != null) {
    check_subsidyobjective9 = '"' + req.query["subsidyobjective9"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective9"]);
  } else {
    check_subsidyobjective9 = "";
  }

  if (req.query["subsidyobjective10"] != null) {
    check_subsidyobjective10 = '"' + req.query["subsidyobjective10"] + '"';
    subsidyObjectiveArray.push(req.query["subsidyobjective10"]);
  } else {
    check_subsidyobjective10 = "";
  }

  if (req.query["subsidyobjective11"] != null && req.query["subsidyobjective12"] == '') {
    check_subsidyobjective11 = '"' + req.query["subsidyobjective11"] + '"';
    check_subsidyobjective11_pass = req.query["subsidyobjective11"];
    subsidyObjectiveArray.push(req.query["subsidyobjective11"]);
  } else {
    check_subsidyobjective11 = "";
    check_subsidyobjective11_pass = "";
  }

  // **********************************************
  // the 11th element is Other, hence not considered while preparing payload
  // **********************************************

  if (req.query["subsidyobjective11"] != null && req.query["subsidyobjective12"] != '') {
    check_subsidyobjective12 = '"' + "Other-" + req.query["subsidyobjective12"] + '"';
    (check_subsidyobjective12_pass = req.query["subsidyobjective12"]),
      (subsidyobjective11 = "");
    subsidyObjectiveArray.push("Other-" + req.query["subsidyobjective12"]);
    check_subsidyobjective11_pass = req.query["subsidyobjective11"];
  } else {
    check_subsidyobjective12 = "";
    check_subsidyobjective12_pass = "";
  }


  // ***********************************************************************
  // End of - Subsidy objective read section from filter display results call
  // **********************************************************************

  // **********************************************************
  // Start of spending sector read from filter display results call
  // ************************************************************

  var count = 0;

  if (req.query["spendingsector0"] != null) {
    check_spendingsector0 = '"' + req.query["spendingsector0"] + '"';
    spendingSectorArray.push(req.query["spendingsector0"]);
  } else {
    check_spendingsector0 = "";
  }
  if (req.query["spendingsector1"] != null) {
    check_spendingsector1 = '"' + req.query["spendingsector1"] + '"';
    spendingSectorArray.push(req.query["spendingsector1"]);
  } else {
    check_spendingsector1 = "";
  }
  if (req.query["spendingsector2"] != null) {
    check_spendingsector2 = '"' + req.query["spendingsector2"] + '"';
    spendingSectorArray.push(req.query["spendingsector2"]);
  } else {
    check_spendingsector2 = "";
  }
  if (req.query["spendingsector3"] != null) {
    check_spendingsector3 = '"' + req.query["spendingsector3"] + '"';
    spendingSectorArray.push(req.query["spendingsector3"]);
  } else {
    check_spendingsector3 = "";
  }
  if (req.query["spendingsector4"] != null) {
    check_spendingsector4 = '"' + req.query["spendingsector4"] + '"';
    spendingSectorArray.push(req.query["spendingsector4"]);
  } else {
    check_spendingsector4 = "";
  }
  if (req.query["spendingsector5"] != null) {
    check_spendingsector5 = '"' + req.query["spendingsector5"] + '"';
    spendingSectorArray.push(req.query["spendingsector5"]);
  } else {
    check_spendingsector5 = "";
  }
  if (req.query["spendingsector6"] != null) {
    check_spendingsector6 = '"' + req.query["spendingsector6"] + '"';
    spendingSectorArray.push(req.query["spendingsector6"]);
  } else {
    check_spendingsector6 = "";
  }
  if (req.query["spendingsector7"] != null) {
    check_spendingsector7 = '"' + req.query["spendingsector7"] + '"';
    spendingSectorArray.push(req.query["spendingsector7"]);
  } else {
    check_spendingsector7 = "";
  }
  if (req.query["spendingsector8"] != null) {
    check_spendingsector8 = '"' + req.query["spendingsector8"] + '"';
    spendingSectorArray.push(req.query["spendingsector8"]);
  } else {
    check_spendingsector8 = "";
  }
  if (req.query["spendingsector9"] != null) {
    check_spendingsector9 = '"' + req.query["spendingsector9"] + '"';
    spendingSectorArray.push(req.query["spendingsector9"]);
  } else {
    check_spendingsector9 = "";
  }
  if (req.query["spendingsector10"] != null) {
    check_spendingsector10 = '"' + req.query["spendingsector10"] + '"';
    spendingSectorArray.push(req.query["spendingsector10"]);
  } else {
    check_spendingsector10 = "";
  }
  if (req.query["spendingsector11"] != null) {
    check_spendingsector11 = '"' + req.query["spendingsector11"] + '"';
    spendingSectorArray.push(req.query["spendingsector11"]);
  } else {
    check_spendingsector11 = "";
  }
  if (req.query["spendingsector12"] != null) {
    check_spendingsector12 = '"' + req.query["spendingsector12"] + '"';
    spendingSectorArray.push(req.query["spendingsector12"]);
  } else {
    check_spendingsector12 = "";
  }
  if (req.query["spendingsector13"] != null) {
    check_spendingsector13 = '"' + req.query["spendingsector13"] + '"';
    spendingSectorArray.push(req.query["spendingsector13"]);
  } else {
    check_spendingsector13 = "";
  }
  if (req.query["spendingsector13a"] != null) {
    check_spendingsector13a = '"' + req.query["spendingsector13a"] + '"';
    spendingSectorArray.push(req.query["spendingsector13a"]);
  } else {
    check_spendingsector13a = "";
  }
  if (req.query["spendingsector14"] != null) {
    check_spendingsector14 = '"' + req.query["spendingsector14"] + '"';
    spendingSectorArray.push(req.query["spendingsector14"]);
  } else {
    check_spendingsector14 = "";
  }
  if (req.query["spendingsector15"] != null) {
    check_spendingsector15 = '"' + req.query["spendingsector15"] + '"';
    spendingSectorArray.push(req.query["spendingsector15"]);
  } else {
    check_spendingsector15 = "";
  }
  if (req.query["spendingsector16"] != null) {
    check_spendingsector16 = '"' + req.query["spendingsector16"] + '"';
    spendingSectorArray.push(req.query["spendingsector16"]);
  } else {
    check_spendingsector16 = "";
  }
  if (req.query["spendingsector17"] != null) {
    check_spendingsector17 = '"' + req.query["spendingsector17"] + '"';
    spendingSectorArray.push(req.query["spendingsector17"]);
  } else {
    check_spendingsector17 = "";
  }
  if (req.query["spendingsector18"] != null) {
    check_spendingsector18 = '"' + req.query["spendingsector18"] + '"';
    spendingSectorArray.push(req.query["spendingsector18"]);
  } else {
    check_spendingsector18 = "";
  }
  if (req.query["spendingsector19"] != null) {
    check_spendingsector19 = '"' + req.query["spendingsector19"] + '"';
    spendingSectorArray.push(req.query["spendingsector19"]);
  } else {
    check_spendingsector19 = "";
  }
  if (req.query["spendingsector20"] != null) {
    check_spendingsector20 = '"' + req.query["spendingsector20"] + '"';
    spendingSectorArray.push(req.query["spendingsector20"]);
  } else {
    check_spendingsector20 = "";
  }

  // **********************************************************
  // End of spending sector read from filter display results call
  // ************************************************************

  // **********************************************************
  // Start of subsidy instrument read from filter display results call
  // ************************************************************

  if (req.query["subsidyinstrument0"] != null) {
    check_subsidyinstrument0 = '"' + req.query["subsidyinstrument0"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument0"]);
  } else {
    check_subsidyinstrument0 = "";
  }

  if (req.query["subsidyinstrument1"] != null) {
    check_subsidyinstrument1 = '"' + req.query["subsidyinstrument1"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument1"]);
  } else {
    check_subsidyinstrument1 = "";
  }

  if (req.query["subsidyinstrument2"] != null) {
    check_subsidyinstrument2 = '"' + req.query["subsidyinstrument2"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument2"]);
  } else {
    check_subsidyinstrument2 = "";
  }

  if (req.query["subsidyinstrument3"] != null) {
    check_subsidyinstrument3 = '"' + req.query["subsidyinstrument3"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument3"]);
  } else {
    check_subsidyinstrument3 = "";
  }

  if (req.query["subsidyinstrument4"] != null) {
    check_subsidyinstrument4 = '"' + req.query["subsidyinstrument4"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument4"]);
  } else {
    check_subsidyinstrument4 = "";
  }

  if (req.query["subsidyinstrument5"] != null) {
    check_subsidyinstrument5 = '"' + req.query["subsidyinstrument5"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument5"]);
  } else {
    check_subsidyinstrument5 = "";
  }

  if (req.query["subsidyinstrument6"] != null) {
    check_subsidyinstrument6 = '"' + req.query["subsidyinstrument6"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument6"]);
  } else {
    check_subsidyinstrument6 = "";
  }

  if (req.query["subsidyinstrument7"] != null) {
    check_subsidyinstrument7 = '"' + req.query["subsidyinstrument7"] + '"';
    subsidyInstrumentArray.push(req.query["subsidyinstrument7"]);
  } else {
    check_subsidyinstrument7 = "";
  }

  if (req.query["subsidyinstrument8"] != null && req.query["subsidyinstrument9"] == '') {
    check_subsidyinstrument8 = '"' + req.query["subsidyinstrument8"] + '"';
    check_subsidyinstrument8_pass = req.query["subsidyinstrument8"];
    subsidyInstrumentArray.push(req.query["subsidyinstrument8"]);
  } else {
    check_subsidyinstrument8 = "";
    check_subsidyinstrument8_pass = "";
  }

  if (req.query["subsidyinstrument8"] != null && req.query["subsidyinstrument9"] != '') {
    check_subsidyinstrument9 = '"' + "Other-" + req.query["subsidyinstrument9"] + '"';
    check_subsidyinstrument8_pass = req.query["subsidyinstrument8"];
    check_subsidyinstrument9_pass = req.query["subsidyinstrument9"];
    subsidyInstrumentArray.push("Other-" + req.query["subsidyinstrument9"]);
  } else {
    check_subsidyinstrument9 = "";
    check_subsidyinstrument9_pass = "";
  }

  // **********************************************************
  // End of subsidy instrument read from filter display results call
  // ************************************************************

  if (req.query.page == "" || req.query.page == null) {
    pageNumber = 1;
  } else {
    pageNumber = req.query.page;
  }

  const data_request = {
    subsidyObjective: subsidyObjectiveArray,
    spendingSector: spendingSectorArray,
    subsidyInstrument: subsidyInstrumentArray,
    pageNumber: pageNumber,
    totalRecordsPerPage: frontend_totalRecordsPerPage,
    sortBy: [""],
  };

  const data_request_export = {
    subsidyObjective: subsidyObjectiveArray,
    spendingSector: spendingSectorArray,
    subsidyInstrument: subsidyInstrumentArray,
    pageNumber: 1,
    totalRecordsPerPage: 50000,
    sortBy: [""],
  };

  data_request_clientside = JSON.stringify(data_request_export);

  try {
    const apidata = await axios.post(
      beis_url_publicsearch + '/searchResults/standaloneawards',
      data_request
    );
    console.log(`Status: ${apidata.status}`);

    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try " + API_response_code);
    //console.log("Body: ", apidata.data);
    searchawards = apidata.data;

    totalrows = searchawards.totalSearchResults;

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

    if (req.query.page != "" && req.query.page != null) {
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
      scnumber: "",
      name: "",
      ga: "",
      startFromDay: "",
      startFromMonth: "",
      startFromYear: "",
      startToDay: "",
      startToMonth: "",
      startToYear: "",
      endFromDay: "",
      endFromMonth: "",
      endFromYear: "",
      endToDay: "",
      endToMonth: "",
      endToYear: "",
      status: "",
      budgetFrom: "",
      budgetTo: "",
    }

    filterString = "";

    // Granting authority filter

    start_page = 1;
    if (pageCount < 10) {
      end_page = pageCount;
    } else {
      end_page = 10;
    }
    res.render(render, {
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
