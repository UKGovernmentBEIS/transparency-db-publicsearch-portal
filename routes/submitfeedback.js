const express = require("express");
const axios = require("axios");
const router = express.Router();
const utils = require("../utils");
const { beisUrlAccessManagement } = require("../config");

router.post("/", async (req, res) => {
  utils.setSecurityHeaders(res);

  console.log("req.body.feedback", req.body.feedback);
  console.log("req.body.comment", req.body.comment);
  
  try {
    const apidata = await axios.post(
      beisUrlAccessManagement + "/usermanagement/feedback",
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
