const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("publicusersearch/search-subsidytransparencydatabase");
});

module.exports = router;
