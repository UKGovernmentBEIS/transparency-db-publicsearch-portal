// *********************************************************
// Gov.UK public user search subsidy awards filter search routing
// *********************************************************

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  var { showfiter } = req.body;
  console.log("showfiter" + showfiter);

  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

  res.render("publicusersearch/filtersearch", { current_page_active });
});

router.get("/", (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);

  console.log("current page from filtersearch :" + current_page_active);
  res.render("publicusersearch/filtersearch", { current_page_active });
});

module.exports = router;
