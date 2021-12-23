// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
var request = require("request");
const { debug } = require("request");

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  console.log("HOMEPAGE button", req.body.homepage_button);
  if (req.body.homepage_button == "show_results") {
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
      sortBy: [""],
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
      sortBy: ["startDate,DESC"],
    };

    var data = JSON.parse(JSON.stringify(data_request));

    console.log("request :" + JSON.stringify(data));

    try {
      const apidata = await axios.post(
        beis_url_publicsearch + "/schemes",
        data,
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
      schemes = apidata.data;

      //TODO: Refactor below to work for schemes, not awards
      var searchawards_api = apidata.data;
      console.log("searchawards" + searchawards_api);
      const seachawardstring = JSON.stringify(searchawards_api);
      const seachawardJSON = JSON.parse(seachawardstring);
      totalrows = searchawards.totalSearchResults;
      console.log(searchawards.awards[0].subsidyFullAmountExact);

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
      beneficiary_arrow = "upanddown";
      subsidyamount_arrow = "upanddown";
      legalgrantingdate_arrow = "updecending";

      console.log("beneficiary_sorting_order :" + beneficiary_sorting_order);

      start_page = 1;
      if (pageCount < 10) {
        end_page = pageCount;
      } else {
        end_page = 10;
      }
      res.render("publicusersearch/searchresults", {
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
  } else {
    var { legalgrantingdate } = req.body;
    var { legal_granting_date_day } = req.body;
    var { legal_granting_date_month } = req.body;
    var { legal_granting_date_year } = req.body;
    var { legal_granting_date_day1 } = req.body;
    var { legal_granting_date_month1 } = req.body;
    var { legal_granting_date_year1 } = req.body;

    frontend_totalRecordsPerPage = 10;

    var append_zero = "0";
    var day_length = legal_granting_date_day.length;
    if (day_length == 1) {
      legal_granting_date_day = append_zero + legal_granting_date_day;
    }
    var month_length = legal_granting_date_month.length;
    if (month_length == 1) {
      legal_granting_date_month = append_zero + legal_granting_date_month;
    }

    var day_length1 = legal_granting_date_day1.length;
    if (day_length1 == 1) {
      legal_granting_date_day1 = append_zero + legal_granting_date_day1;
    }
    var month_length1 = legal_granting_date_month1.length;
    if (month_length1 == 1) {
      legal_granting_date_month1 = append_zero + legal_granting_date_month1;
    }

    radio_legalgrantingdate = legalgrantingdate;

    date_legal_granting_date_day = legal_granting_date_day;
    date_legal_granting_date_month = legal_granting_date_month;
    date_legal_granting_date_year = legal_granting_date_year;

    date_legal_granting_date_day1 = legal_granting_date_day1;
    date_legal_granting_date_month1 = legal_granting_date_month1;
    date_legal_granting_date_year1 = legal_granting_date_year1;

    console.log("legalgrantingdate:" + legalgrantingdate);
    console.log("date_legal_granting_date_day:" + date_legal_granting_date_day);
    console.log(
      "date_legal_granting_date_month:" + date_legal_granting_date_month
    );
    console.log(
      "date_legal_granting_date_year:" + date_legal_granting_date_year
    );

    console.log(
      "date_legal_granting_date_day1:" + date_legal_granting_date_day1
    );
    console.log(
      "date_legal_granting_date_month1:" + date_legal_granting_date_month1
    );
    console.log(
      "date_legal_granting_date_year1:" + date_legal_granting_date_year1
    );

    //  *****************************
    //  Date error validations
    // *****************************

    var SubsidyErrors = [];
    var SubsidyFocus = [];
    var Additem = 0;
    var SubsidyArraySize = 0;
    MonthNotaNumber = "No";
    DayNotaNumber = "No";
    YearNotaNumber = "No";
    date_legal_granting_date_month_Error = false;
    date_legal_granting_date_day_Error = false;
    date_legal_granting_date_year_Error = false;
    date_legal_granting_date_month1_Error = false;
    date_legal_granting_date_day1_Error = false;
    date_legal_granting_date_year1_Error = false;

    if (
      radio_legalgrantingdate == "No" ||
      radio_legalgrantingdate == undefined
    ) {
      date_legal_granting_date_day = "";
      date_legal_granting_date_month = "";
      date_legal_granting_date_year = "";

      date_legal_granting_date_day1 = "";
      date_legal_granting_date_month1 = "";
      date_legal_granting_date_year1 = "";

      legal_granting_from_date = "";
      legal_granting_to_date = "";
    }

    if (
      date_legal_granting_date_day ||
      date_legal_granting_date_month ||
      date_legal_granting_date_year
    ) {
      if (date_legal_granting_date_month) {
        if (isNaN(date_legal_granting_date_month)) {
          MonthNotaNumber = "Yes";
        }
      }
      if (date_legal_granting_date_day) {
        if (isNaN(date_legal_granting_date_day)) {
          DayNotaNumber = "Yes";
        }
      }
      if (date_legal_granting_date_year) {
        if (isNaN(date_legal_granting_date_year)) {
          YearNotaNumber = "Yes";
        }
      }

      if (
        date_legal_granting_date_month > 12 ||
        date_legal_granting_date_month < 1 ||
        date_legal_granting_date_month == "" ||
        MonthNotaNumber == "Yes"
      ) {
        date_legal_granting_date_month_Error = true;
        SubsidyErrors[Additem] = "Enter the valid from month";
        SubsidyFocus[Additem] = "#legal_granting_date_month";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_day > 31 ||
        date_legal_granting_date_day < 1 ||
        date_legal_granting_date_day == "" ||
        DayNotaNumber == "Yes"
      ) {
        date_legal_granting_date_day_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid from day";
        SubsidyFocus[Additem] = "#legal_granting_date_day";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_day == 31 &&
        (date_legal_granting_date_month == parseInt("02", 8) ||
          date_legal_granting_date_month == parseInt("04", 8) ||
          date_legal_granting_date_month == parseInt("06", 8) ||
          date_legal_granting_date_month == parseInt("09", 8) ||
          date_legal_granting_date_month == 11)
      ) {
        date_legal_granting_date_day_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid from day";
        SubsidyFocus[Additem] = "#legal_granting_date_day";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_day == 29 &&
        date_legal_granting_date_month == parseInt("02", 8)
      ) {
        if (
          (date_legal_granting_date_year % 4 == 0 &&
            date_legal_granting_date_year % 100 != 0) ||
          date_legal_granting_date_year % 400 == 0
        ) {
        } else {
          date_legal_granting_date_day_Error = true;
          SubsidyErrors[Additem] = "     Enter the valid from day";
          SubsidyFocus[Additem] = "#legal_granting_date_day";
          Additem = Additem + 1;
        }
      }

      if (
        date_legal_granting_date_day == 30 &&
        date_legal_granting_date_month == parseInt("02", 8)
      ) {
        date_legal_granting_date_day_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid from day";
        SubsidyFocus[Additem] = "#legal_granting_date_day";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_year < 1960 ||
        date_legal_granting_date_year > 9999 ||
        date_legal_granting_date_year == "" ||
        YearNotaNumber == "Yes"
      ) {
        date_legal_granting_date_year_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid from year";
        SubsidyFocus[Additem] = "#legal_granting_date_year";
        Additem = Additem + 1;
      }
    }

    MonthNotaNumber1 = "No";
    DayNotaNumber1 = "No";
    YearNotaNumber1 = "No";

    if (
      date_legal_granting_date_day1 ||
      date_legal_granting_date_month1 ||
      date_legal_granting_date_year1
    ) {
      if (date_legal_granting_date_month1) {
        if (isNaN(date_legal_granting_date_month1)) {
          MonthNotaNumber1 = "Yes";
        }
      }
      if (date_legal_granting_date_day1) {
        if (isNaN(date_legal_granting_date_day1)) {
          DayNotaNumber1 = "Yes";
        }
      }
      if (date_legal_granting_date_year1) {
        if (isNaN(date_legal_granting_date_year1)) {
          YearNotaNumber1 = "Yes";
        }
      }

      if (
        date_legal_granting_date_month1 > 12 ||
        date_legal_granting_date_month1 < 1 ||
        date_legal_granting_date_month1 == "" ||
        MonthNotaNumber1 == "Yes"
      ) {
        date_legal_granting_date_month1_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid to month";
        SubsidyFocus[Additem] = "#legal_granting_date_month1";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_day1 > 31 ||
        date_legal_granting_date_day1 < 1 ||
        date_legal_granting_date_day1 == "" ||
        DayNotaNumber1 == "Yes"
      ) {
        date_legal_granting_date_day1_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid to day";
        SubsidyFocus[Additem] = "#legal_granting_date_day1";
        Additem = Additem + 1;
      }

      if (
        date_legal_granting_date_year1 < 1960 ||
        date_legal_granting_date_year1 == "" ||
        YearNotaNumber1 == "Yes"
      ) {
        date_legal_granting_date_year1_Error = true;
        SubsidyErrors[Additem] = "     Enter the valid to year";
        SubsidyFocus[Additem] = "#legal_granting_date_year1";
        Additem = Additem + 1;
      }
    }

    //  ********************************************************************
    //  check which date is entered properly : This scenario is success case
    // *********************************************************************

    if (
      !date_legal_granting_date_month_Error &&
      !date_legal_granting_date_day_Error &&
      !date_legal_granting_date_year_Error &&
      !date_legal_granting_date_month1_Error &&
      !date_legal_granting_date_day1_Error &&
      !date_legal_granting_date_year1_Error
    ) {
      isFromandTodateAvailable = "No";
      isOnlyFromdateAvailable = "No";
      isOnlyTodateAvailable = "No";

      if (
        date_legal_granting_date_year &&
        date_legal_granting_date_month &&
        date_legal_granting_date_day &&
        date_legal_granting_date_year1 &&
        date_legal_granting_date_month1 &&
        date_legal_granting_date_day1
      ) {
        isFromandTodateAvailable = "Yes";
        isOnlyFromdateAvailable = "No";
        isOnlyTodateAvailable = "No";
      } else if (
        !date_legal_granting_date_year &&
        !date_legal_granting_date_month &&
        !date_legal_granting_date_day &&
        !date_legal_granting_date_year1 &&
        !date_legal_granting_date_month1 &&
        !date_legal_granting_date_day1
      ) {
        isFromandTodateAvailable = "No";
        isOnlyFromdateAvailable = "No";
        isOnlyTodateAvailable = "No";
      } else if (
        date_legal_granting_date_year &&
        date_legal_granting_date_month &&
        date_legal_granting_date_day &&
        !date_legal_granting_date_year1 &&
        !date_legal_granting_date_month1 &&
        !date_legal_granting_date_day1
      ) {
        isFromandTodateAvailable = "No";
        isOnlyFromdateAvailable = "Yes";
        isOnlyTodateAvailable = "No";
      } else if (
        !date_legal_granting_date_year &&
        !date_legal_granting_date_month &&
        !date_legal_granting_date_day &&
        date_legal_granting_date_year1 &&
        date_legal_granting_date_month1 &&
        date_legal_granting_date_day1
      ) {
        isFromandTodateAvailable = "No";
        isOnlyFromdateAvailable = "No";
        isOnlyTodateAvailable = "Yes";
      }

      if (isFromandTodateAvailable == "Yes") {
        legal_granting_from_date =
          date_legal_granting_date_year +
          "-" +
          date_legal_granting_date_month +
          "-" +
          date_legal_granting_date_day;
        legal_granting_to_date =
          date_legal_granting_date_year1 +
          "-" +
          date_legal_granting_date_month1 +
          "-" +
          date_legal_granting_date_day1;
      } else if (isOnlyFromdateAvailable == "Yes") {
        legal_granting_from_date =
          date_legal_granting_date_year +
          "-" +
          date_legal_granting_date_month +
          "-" +
          date_legal_granting_date_day;
        legal_granting_to_date =
          new Date().getFullYear() +
          "-" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date().getDate()).slice(-2);
      } else if (isOnlyTodateAvailable == "Yes") {
        legal_granting_from_date = "1960-01-01";
        legal_granting_to_date =
          date_legal_granting_date_year1 +
          "-" +
          date_legal_granting_date_month1 +
          "-" +
          date_legal_granting_date_day1;
      }

      if (
        !date_legal_granting_date_year &&
        !date_legal_granting_date_month &&
        !date_legal_granting_date_day &&
        !date_legal_granting_date_year1 &&
        !date_legal_granting_date_month1 &&
        !date_legal_granting_date_day1
      ) {
        legal_granting_from_date = "";
        legal_granting_to_date = "";
      }

      // if (isFromandTodateAvailable == "No" && radio_legalgrantingdate == "Yes" ) {

      //   legal_granting_from_date = '';
      //   legal_granting_to_date = '';
      // }

      console.log("legal granting from date:" + legal_granting_from_date);
      console.log("legal granting to date:" + legal_granting_to_date);

      // ***********************
      // API integration section
      // ***********************

      actual_subsidy_objective_trim = actual_subsidy_objective.replace(
        /^"(.+)"$/,
        "$1"
      );
      actual_subsidy_objective_brace = "[" + actual_subsidy_objective + "]";
      actual_subsidy_objective_pass = actual_subsidy_objective_brace.replace(
        /^"(.*)"$/,
        "$1"
      );

      actual_subsidy_objective_pass1 = JSON.parse(
        actual_subsidy_objective_pass
      );
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

      console.log(
        "actual_spending_sector_pass :" + actual_spending_sector_pass
      );

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
        sortBy: [""],
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
        pageNumber: 1,
        totalRecordsPerPage: frontend_totalRecordsPerPage,
        sortBy: [""],
      };

      var data = JSON.parse(JSON.stringify(data_request));

      console.log("request :" + JSON.stringify(data));

      try {
        const apidata = await axios.post(
          beis_url_publicsearch + "/searchResults",
          data,
          {
            headers: {
              "X-Content-Type-Options": "nosniff",
              "X-Frame-Options": "DENY",
              "Content-Security-Policy": "frame-ancestors 'self'",
            },
          }
        );
        console.log(`Status: ${apidata.status}`);

        API_response_code = `${apidata.status}`;
        console.log("API_response_code: try" + API_response_code);
        console.log("Body: ", apidata.data);
        searchawards = apidata.data;
        var searchawards_api = apidata.data;
        console.log("searchawards" + searchawards_api);
        const seachawardstring = JSON.stringify(searchawards_api);
        const seachawardJSON = JSON.parse(seachawardstring);
        totalrows = searchawards.totalSearchResults;
        // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
        // console.log(searchawards.award[0].beneficiary.beneficiaryType);
        console.log(searchawards.awards[0].subsidyFullAmountExact);

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
        beneficiary_arrow = "upanddown";
        subsidyamount_arrow = "upanddown";
        legalgrantingdate_arrow = "updecending";

        start_page = 1;
        if (pageCount < 10) {
          end_page = pageCount;
        } else {
          end_page = 10;
        }

        res.render("publicusersearch/searchresults", {
          pageCount,
          previous_page,
          next_page,
          end_record,
          end_record,
          totalrows,
          current_page_active,
        });
      } catch (err) {
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message);
        res.render("publicusersearch/noresults");
      }
    } else {
      SubsidyArraySize = SubsidyErrors.length;
      console.log("SubsidyArraySize:" + SubsidyArraySize);
      res.render("publicusersearch/legalgrantingdate", {
        SubsidyErrors,
        SubsidyArraySize,
        SubsidyFocus,
      });
    }
  }
  // end of POST call
});

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("publicusersearch/searchresults", {
    date_legal_granting_date_day,
    date_legal_granting_date_month,
    date_legal_granting_date_year,
    date_legal_granting_date_day1,
    date_legal_granting_date_month1,
    date_legal_granting_date_year1,
    date_legal_granting_date_month_Error,
    date_legal_granting_date_day_Error,
    date_legal_granting_date_year_Error,
    date_legal_granting_date_month1_Error,
    date_legal_granting_date_day1_Error,
    date_legal_granting_date_year1_Error,
  });
});

module.exports = router;
