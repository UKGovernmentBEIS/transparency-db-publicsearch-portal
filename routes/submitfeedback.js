const express = require("express");
const axios = require("axios");
const router = express.Router();
const utils = require("../utils");

router.post("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);

  console.log("req.body.feedback", req.body.feedback);
  console.log("req.body.comment", req.body.comment);
  Environment_variable = process.argv[2];
  if (Environment_variable == "env=dev") {
    beis_url_accessmanagement =
      "https://dev-beis-tp-db-accessmanagement-service-app.azurewebsites.net";
  } else if (Environment_variable == "env=integ") {
    beis_url_accessmanagement =
      "https://integ-transparency-db-access-management-service.azurewebsites.net";
  } else if (Environment_variable == "env=stag") {
    beis_url_accessmanagement =
      "https://stag-transparency-db-access-management-service.azurewebsites.net";
  } else if (Environment_variable == "env=prod") {
    beis_url_accessmanagement =
      "https://prod-transparency-db-access-management-service.azurewebsites.net";
  }
  try {
    const apidata = await axios.post(
      beis_url_accessmanagement + "/usermanagement/feedback",
      {
        feedBack: req.body.feedback,
        comments: req.body.comment,
      }
    );
    res.render("publicusersearch/submitfeedback");
  } catch (err) {
    console.log("message error : " + err);
  }
});

module.exports = router;
