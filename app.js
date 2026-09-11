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
const utils = require("./utils");


// ********************************************************
// Read environment property file and set the API URL end points
// ********************************************************

Environment_variable = process.argv[2];
if (Environment_variable == "env=local") {  
  beis_url_publicsearch =
      "http://localhost:8581"; //http://localhost:8581

  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=dev") {
  beis_url_publicsearch =
      "https://dev-transparency-db-public-search-service.azurewebsites.net";

  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=integ") {
  beis_url_publicsearch =
    "https://integ-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=stg") {
  beis_url_publicsearch =
    "https://stg-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=prod") {
  beis_url_publicsearch =
    "https://prod-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
} else if (Environment_variable == "env=preprod") {
  beis_url_publicsearch =
    "https://default-transparency-db-public-search-service.azurewebsites.net";
  console.log(beis_url_publicsearch);
}

/***************************************************** */
/* Default login screen - Web application Launch screen */
/****************************************************** */

app.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

  res.render("publicusersearch/homepage");
});

/****************************************************** */
/* All Router declarations */
/****************************************************** */

var homepage = require("./routes/homepage");
app.use("/homepage", homepage);

var noresults = require("./routes/noresults");
app.use("/noresults", noresults);

var schemedetailsroute = require("./routes/schemedetailsroute");
app.use("/scheme", schemedetailsroute);

var schemeVersionRoute = require("./routes/schemeversionroute");
app.use("/schemeversion", schemeVersionRoute);

var feedbackform = require("./routes/feedbackform");
app.use("/feedbackform", feedbackform);

var submitfeedback = require("./routes/submitfeedback");
app.use("/submitfeedback", submitfeedback);

var accessibilityStatement = require("./routes/accessibilityStatement");
app.use("/accessibilityStatement", accessibilityStatement);

app.use("/mfaawards", require("./routes/mfaawards"));
app.use("/mfaaward", require("./routes/mfaawarddetails"));
app.use("/mfaawards/export", require("./routes/mfaAwardsExport"));

// Cookies Consent

var cookieshelp = require("./routes/cookies-help");
app.use("/cookieshelp", cookieshelp);

// Privacy Notice
var privacynotice = require("./routes/privacy-notice");
app.use("/privacy", privacynotice);

app.use("/awards", require('./routes/awards'));
app.use("/award", require('./routes/awarddetails'));
app.use("/awards/export", require('./routes/awardsExport'));

app.use("/schemes", require("./routes/schemes"));
app.use("/schemes/export", require('./routes/schemesExport'));

module.exports = app;
