const express = require("express");
var session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  ssn = req.session;
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  res.render("publicusersearch/cookies-help");
});

module.exports = router;
