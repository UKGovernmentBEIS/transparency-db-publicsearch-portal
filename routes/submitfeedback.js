const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Security-Policy", 'frame-ancestors "self"');
  res.set("Access-Control-Allow-Origin", beis_url_publicsearch);
  res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.render("publicusersearch/submitfeedback");

  console.log("req.body.feedback", req.body.feedback);
  console.log("req.body.comment", req.body.comment);

  // try {
  //   const apidata = await axios.post(beis_url_searchscheme + "/feedback", {
  //     feedback: req.body.feedback,
  //     comment: req.body.comment,
  //   });

  // } catch (err) {
  //   console.log("message error : " + err);
  // }
});

module.exports = router;
