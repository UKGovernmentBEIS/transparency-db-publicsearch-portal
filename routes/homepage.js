// *********************************************************
// Gov.UK public user search subsidy awards homepage routing 
// *********************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

  // All declarations goes here

  radio_beneficiaryname = "";
  text_beneficiaryname = "";
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

  check_subsidyinstrument0="";
  check_subsidyinstrument1="";
  check_subsidyinstrument2="";
  check_subsidyinstrument3="";
  check_subsidyinstrument4="";
  check_subsidyinstrument5="";
  check_subsidyinstrument6="";
  check_subsidyinstrument7="";
  check_subsidyinstrument8="";
  check_subsidyinstrument8_pass="";
  check_subsidyinstrument9="";
  check_subsidyinstrument9_pass ="";

  check_spendingsector0 = "";
  check_spendingsector1 = "";
  check_spendingsector2 = "";
  check_spendingsector3 = "";
  check_spendingsector4 = "";
  check_spendingsector5 = "";
  check_spendingsector6 = "";
  check_spendingsector7 = "";
  check_spendingsector8 = "";
  check_spendingsector9 = "";
  check_spendingsector10 = "";
  check_spendingsector11 = "";
  check_spendingsector12 = "";
  check_spendingsector13 = "";
  check_spendingsector14 = "";
  check_spendingsector15 = "";
  check_spendingsector16 = "";
  check_spendingsector17 = "";
  check_spendingsector18 = "";
  check_spendingsector19 = "";
  check_spendingsector20 = "";

  current_page_active = 1;
  current_page = 1;

  date_legal_granting_date_day = "";
  date_legal_granting_date_month ="";
  date_legal_granting_date_year ="";
  date_legal_granting_date_day1 = "";
  date_legal_granting_date_month1 ="";
  date_legal_granting_date_year1 ="";



    res.render('publicusersearch/homepage')
  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/homepage')
  });

module.exports = router;
