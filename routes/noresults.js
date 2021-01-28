// *********************************************************
// Gov.UK public user search subsidy awards noresults routing
// *********************************************************

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // res.set("X-Frame-Options", "DENY");
  // res.set("X-Content-Type-Options", "nosniff");
  // res.set("Content-Security-Policy", 'frame-ancestors "self"');
  // res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

  res.render("publicusersearch/noresults");
});

router.get("/", (req, res) => {
  // res.set("X-Frame-Options", "DENY");
  // res.set("X-Content-Type-Options", "nosniff");
  // res.set("Content-Security-Policy", 'frame-ancestors "self"');
  // res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

  res.render("publicusersearch/noresults");
});

module.exports = router;
