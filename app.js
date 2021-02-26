// *************************************************************
// Gov.UK public user search - App.js is the subset of server.js
// *************************************************************

const express = require("express");
const app = express();
const fs = require("fs");
const request = require("request");
const methodOverride = require("method-override");
const path = require("path");
const fileUpload = require("express-fileupload");
const fetch = require("node-fetch");
const { callbackify } = require("util");
const { Http2ServerRequest } = require("http2");
const { contains } = require("jquery");
const axios = require("axios");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
var cors = require("cors");
app.use(cors());
// ********************************************************
// Gov.UK public user search - Global variable declarations
// ********************************************************

app.locals.radio_beneficiaryname;
app.locals.text_beneficiaryname;
app.locals.subsidy_objective_isfirst;
app.locals.subsidy_instrument_isfirst;
app.locals.spending_sector_isfirst;
app.locals.actual_subsidy_objective;
app.locals.actual_spending_sector;
app.locals.actual_subsidy_instrument;
app.locals.actual_subsidy_objective_pass1;
app.locals.actual_spending_sector_pass1;
app.locals.actual_subsidy_instrument_pass1;
app.locals.radio_legalgrantingdate;
app.locals.date_legal_granting_date_day;
app.locals.date_legal_granting_date_month;
app.locals.date_legal_granting_date_year;
app.locals.date_legal_granting_date_day1;
app.locals.date_legal_granting_date_month1;
app.locals.date_legal_granting_date_year1;
app.locals.date_legal_granting_date_day_Error;
app.locals.date_legal_granting_date_month_Error;
app.locals.date_legal_granting_date_year_Error;
app.locals.date_legal_granting_date_day1_Error;
app.locals.date_legal_granting_date_month1_Error;
app.locals.date_legal_granting_date_year1_Error;
app.locals.legal_granting_from_date;
app.locals.legal_granting_to_date;
app.locals.frontend_totalRecordsPerPage;
app.locals.previous_page;
app.locals.next_page;
app.locals.current_page;
app.locals.start_page;
app.locals.end_page;
app.locals.email_addresspass;
app.locals.searchawards;
app.locals.pageCount;
app.locals.rowsperpage;
app.locals.totalrows;
app.locals.start_record;
app.locals.end_record;
app.locals.current_page_active;
app.locals.response_error_message;
app.locals.check_subsidyobjective0;
app.locals.check_subsidyobjective1;
app.locals.check_subsidyobjective2;
app.locals.check_subsidyobjective3;
app.locals.check_subsidyobjective4;
app.locals.check_subsidyobjective5;
app.locals.check_subsidyobjective6;
app.locals.check_subsidyobjective7;
app.locals.check_subsidyobjective8;
app.locals.check_subsidyobjective9;
app.locals.check_subsidyobjective10;
app.locals.check_subsidyobjective11;
app.locals.check_subsidyobjective11_pass;
app.locals.check_subsidyobjective12;
app.locals.check_subsidyobjective12_pass;

app.locals.check_spendingsector0;
app.locals.check_spendingsector1;
app.locals.check_spendingsector2;
app.locals.check_spendingsector3;
app.locals.check_spendingsector4;
app.locals.check_spendingsector5;
app.locals.check_spendingsector6;
app.locals.check_spendingsector7;
app.locals.check_spendingsector8;
app.locals.check_spendingsector9;
app.locals.check_spendingsector10;
app.locals.check_spendingsector11;
app.locals.check_spendingsector12;
app.locals.check_spendingsector13;
app.locals.check_spendingsector13a;
app.locals.check_spendingsector14;
app.locals.check_spendingsector15;
app.locals.check_spendingsector16;
app.locals.check_spendingsector17;
app.locals.check_spendingsector18;
app.locals.check_spendingsector19;
app.locals.check_spendingsector20;

app.locals.check_subsidyinstrument0;
app.locals.check_subsidyinstrument1;
app.locals.check_subsidyinstrument2;
app.locals.check_subsidyinstrument3;
app.locals.check_subsidyinstrument4;
app.locals.check_subsidyinstrument5;
app.locals.check_subsidyinstrument6;
app.locals.check_subsidyinstrument7;
app.locals.check_subsidyinstrument8;
app.locals.check_subsidyinstrument8_pass;
app.locals.check_subsidyinstrument9;
app.locals.check_subsidyinstrument9_pass;

app.locals.check1_subsidyobjective1;
app.locals.beneficiary_sorting_order;
app.locals.subsidyamount_sorting_order;
app.locals.legalgrantingdate_sorting_order;
app.locals.sorting_order_pass;
app.locals.beneficiary_arrow;
app.locals.subsidyamount_arrow;
app.locals.legalgrantingdate_arrow;

app.locals.searchawarddetails;
app.locals.searchmeasuredetails;
app.locals.data_request_clientside;
app.locals.beis_url_publicsearch;
app.locals.beis_url_accessmanagement;
app.locals.awardnumber;

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

  res.render("publicusersearch/homepage");
});

/****************************************************** */
/* All Router declarations */
/****************************************************** */

var homepage = require("./routes/homepage");
app.use("/homepage", homepage);

var beneficiaryname = require("./routes/beneficiaryname");
app.use("/beneficiaryname", beneficiaryname);

var subsidyobjective = require("./routes/subsidyobjective");
app.use("/subsidyobjective", subsidyobjective);

var subsidyinstrument = require("./routes/subsidyinstrument");
app.use("/subsidyinstrument", subsidyinstrument);

var spendingsector = require("./routes/spendingsector");
app.use("/spendingsector", spendingsector);

var legalgrantingdate = require("./routes/legalgrantingdate");
app.use("/legalgrantingdate", legalgrantingdate);

var searchresults = require("./routes/searchresults");
app.use("/searchresults", searchresults);

var pageroute = require("./routes/pageroute");
app.use("/pageroute", pageroute);

var noresults = require("./routes/noresults");
app.use("/noresults", noresults);

var filtersearch = require("./routes/filtersearch");
app.use("/filtersearch", filtersearch);

var updateresults = require("./routes/updateresults");
app.use("/updateresults", updateresults);

var updateresultsroute = require("./routes/updateresultsroute");
app.use("/updateresultsroute", updateresultsroute);

var hidefilter = require("./routes/hidefilter");
app.use("/hidefilter", hidefilter);

var searchresultsmeasureroute = require("./routes/searchresultsmeasureroute");
app.use("/searchresultsmeasureroute", searchresultsmeasureroute);

var searchresultsawardroute = require("./routes/searchresultsawardroute");
app.use("/searchresultsawardroute", searchresultsawardroute);

var pageperroute = require("./routes/pageperroute");
app.use("/pageperroute", pageperroute);

var updateresultspageperroute = require("./routes/updateresultspageperroute");
app.use("/updateresultspageperroute", updateresultspageperroute);

var feedbackform = require("./routes/feedbackform");
app.use("/feedbackform", feedbackform);

var submitfeedback = require("./routes/submitfeedback");
app.use("/submitfeedback", submitfeedback);

var accessibilityStatement = require("./routes/accessibilityStatement");
app.use("/accessibilityStatement", accessibilityStatement);

module.exports = app;
