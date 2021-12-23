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

  check_subsidyobjective0 = "";
  check_subsidyobjective1 = "";
  check_subsidyobjective2 = "";
  check_subsidyobjective3 = "";
  check_subsidyobjective4 = "";
  check_subsidyobjective5 = "";
  check_subsidyobjective6 = "";
  check_subsidyobjective7 = "";
  check_subsidyobjective8 = "";
  check_subsidyobjective8a = "";
  check_subsidyobjective9 = "";
  check_subsidyobjective10 = "";
  check_subsidyobjective11 = "";
  check_subsidyobjective11_pass = "";
  check_subsidyobjective12 = "";
  check_subsidyobjective12_pass = "";

  check_spendingsector0 = "";
  check_spendingsector1 = "";
  check_spendingsector2 = "";
  check_spendingsector3 = "";
  check_spendingsector4 = "";
  check_spendingsector5 = "";
  check_spendingsector6 = "";
  check_spendingsector7 = "";
  check_spendingsector8 = "";
  check_spendingsector9 = "";
  check_spendingsector10 = "";
  check_spendingsector11 = "";
  check_spendingsector12 = "";
  check_spendingsector13 = "";
  check_spendingsector13a = "";
  check_spendingsector14 = "";
  check_spendingsector15 = "";
  check_spendingsector16 = "";
  check_spendingsector17 = "";
  check_spendingsector18 = "";
  check_spendingsector19 = "";
  check_spendingsector20 = "";

  check_subsidyinstrument0 = "";
  check_subsidyinstrument1 = "";
  check_subsidyinstrument2 = "";
  check_subsidyinstrument3 = "";
  check_subsidyinstrument4 = "";
  check_subsidyinstrument5 = "";
  check_subsidyinstrument6 = "";
  check_subsidyinstrument7 = "";
  check_subsidyinstrument8 = "";
  check_subsidyinstrument8_pass = "";
  check_subsidyinstrument9 = "";
  check_subsidyinstrument9_pass = "";

  legal_granting_from_date = "";
  legal_granting_to_date = "";
  date_legal_granting_date_day = "";
  date_legal_granting_date_month = "";
  date_legal_granting_date_year = "";
  date_legal_granting_date_day1 = "";
  date_legal_granting_date_month1 = "";
  date_legal_granting_date_year1 = "";
  date_legal_granting_date_day_Error = false;
  date_legal_granting_date_month_Error = false;
  date_legal_granting_date_year_Error = false;
  date_legal_granting_date_day1_Error = false;
  date_legal_granting_date_month1_Error = false;
  date_legal_granting_date_year1_Error = false;

  actual_spending_sector = "";
  actual_subsidy_instrument = "";
  actual_subsidy_objective = "";

  sortBy = ["startDate,desc"]

  actual_subsidy_objective_trim = actual_subsidy_objective.replace(
    /^"(.+)"$/,
    "$1"
  );
  actual_subsidy_objective_brace = "[" + actual_subsidy_objective + "]";
  actual_subsidy_objective_pass = actual_subsidy_objective_brace.replace(
    /^"(.*)"$/,
    "$1"
  );

  actual_subsidy_objective_pass1 = JSON.parse(actual_subsidy_objective_pass);
  console.log("OBJECTIVE:----", actual_subsidy_objective_pass1);
  actual_subsidy_instrument_trim = actual_subsidy_instrument.replace(
    /^"(.+)"$/,
    "$1"
  );
  actual_subsidy_instrument_brace = "[" + actual_subsidy_instrument + "]";
  actual_subsidy_instrument_pass = actual_subsidy_instrument_brace.replace(
    /^"(.*)"$/,
    "$1"
  );
  actual_subsidy_instrument_pass1 = JSON.parse(
    actual_subsidy_instrument_pass
  );

  actual_spending_sector_trim = actual_spending_sector.replace(
    /^"(.+)"$/,
    "$1"
  );
  actual_spending_sector_brace = "[" + actual_spending_sector + "]";
  actual_spending_sector_pass = actual_spending_sector_brace.replace(
    /^"(.*)"$/,
    "$1"
  );
  actual_spending_sector_pass1 = JSON.parse(actual_spending_sector_pass);

  console.log("actual_spending_sector_pass :" + actual_spending_sector_pass);

  radio_beneficiaryname = "";
  text_beneficiaryname = "";
  subsidy_objective_isfirst = "Yes";
  spending_sector_isfirst = "Yes";
  subsidy_instrument_isfirst = "Yes";
  console.log("subsidy_objective_isfirst bene :" + subsidy_objective_isfirst);
  frontend_totalRecordsPerPage = 10;
  const data_request_all = {
    beneficiaryName: "",
    subsidyMeasureTitle: "",
    subsidyObjective: [],
    spendingRegion: [],
    subsidyInstrument: [],
    spendingSector: [],
    legalGrantingFromDate: "",
    legalGrantingToDate: "",
    pageNumber: 1,
    totalRecordsPerPage: 500000,
    sortBy: sortBy,
  };

  data_request_clientside = JSON.stringify(data_request_all);

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
    totalRecordsPerPage: 10,
    sortBy: sortBy,
  };

  var data = JSON.parse(JSON.stringify(data_request));

  console.log("request :" + JSON.stringify(data));

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
    legalgrantingdate_sorting_order = "desc";
    beneficiary_sorting_order = "desc";
    subsidyamount_sorting_order = "desc";
    sorting_order_pass = JSON.parse("[]");
    scnumber_arrow = "upanddown";


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
