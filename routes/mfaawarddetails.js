// ********************************************************************
// Gov.UK public user search page outing
// ********************************************************************

const express = require("express");
const router = express.Router();
const axios = require("axios");
const utils = require("../utils");

router.get("/", async (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  const defaultReturnUrl = '/mfaawards';
  var returnUrl = req.query.returnUrl || defaultReturnUrl;
  const backButton_href = returnUrl;

  mfaAwardNumber = req.query.id;
  var endpoint =
    beis_url_publicsearch + "/searchResults/mfa/" + mfaAwardNumber;

  try {
    const response = await axios.get(endpoint);
    var mfaAward = response.data;
    if(response.data.status.toLowerCase() == "rejected" || response.data.status.toLowerCase() == "awaiting approval"){
      res.render("publicusersearch/noresults", {
        backButton_href
      });
    }else{
      res.render("publicusersearch/mfaawarddetails",{
        mfaAward,
        backButton_href
      });;
    }
  } catch (err) {

    if (err.toString().includes("404")) {
      res.render("publicusersearch/noresults", {
        backButton_href
      });
      console.warn("No results found for award number " + mfaAwardNumber);
    } else {
      console.error(err);
    }
  }
});

module.exports = router;
