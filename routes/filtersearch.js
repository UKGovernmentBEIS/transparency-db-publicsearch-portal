// *********************************************************
// Gov.UK public user search subsidy awards filter search routing
// *********************************************************

const express = require("express");
const router = express.Router();
const utils = require("../utils");

router.post("/", (req, res) => {
  var { showfiter } = req.body;
  console.log("showfiter" + showfiter);

  utils.setSecurityHeaders(res, beis_url_publicsearch);

  res.render("publicusersearch/filtersearch", { current_page_active });
});

router.get("/", (req, res) => {
  utils.setSecurityHeaders(res, beis_url_publicsearch);
  console.log("current page from filtersearch :" + current_page_active);
  res.render("publicusersearch/filtersearch", { current_page_active });
});

module.exports = router;
