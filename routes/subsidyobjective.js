// ********************************************************************
// Gov.UK public user search subsidy awards subsidy objective routing
// ********************************************************************

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { Beneficiary_name, beneficiaryname } = req.body;
  text_beneficiaryname = Beneficiary_name;
  radio_beneficiaryname = beneficiaryname;

  // for_text_beneficiaryname = Beneficiary_name;
  // for_radio_beneficiaryname = beneficiaryname;
  if (radio_beneficiaryname == "No") {
    text_beneficiaryname = "";
  }
  console.log("text_beneficiaryname: " + text_beneficiaryname);
  console.log("radio_beneficiaryname: " + radio_beneficiaryname);

  console.log("subsidy_objective_isfirst :" + subsidy_objective_isfirst);

  if (subsidy_objective_isfirst == "Yes") {
    check_subsidyobjective0 = "";
    check_subsidyobjective1 = "";
    check_subsidyobjective2 = "";
    check_subsidyobjective3 = "";
    check_subsidyobjective4 = "";
    check_subsidyobjective5 = "";
    check_subsidyobjective6 = "";
    check_subsidyobjective7 = "";
    check_subsidyobjective8 = "";
    check_subsidyobjective9 = "";
    check_subsidyobjective10 = "";
    check_subsidyobjective11 = "";
    check_subsidyobjective11_pass = "";
    check_subsidyobjective12 = "";
    check_subsidyobjective12_pass = "";
  }
  res.render("publicusersearch/subsidyobjective");
});

router.get("/", (req, res) => {
  subsidy_objective_isfirst = "No";
  res.render("publicusersearch/subsidyobjective");
});

module.exports = router;
