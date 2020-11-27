// ********************************************************************
// Gov.UK public user search subsidy awards legal granting date routing 
// ********************************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

  const { subsidyinstrument } = req.body;
  const { subsidy_instrument } = req.body;
  check_subsidyinstrument  = subsidyinstrument ;
  text_subsidyinstrument = subsidy_instrument

  if (check_subsidyinstrument == "Other" ) { check_subsidyinstrument = text_subsidyinstrument;}
  console.log("radio_subsidyobjective :" + check_subsidyinstrument);
  console.log("text_subsidyobjective :" + text_subsidyinstrument);

    res.render('publicusersearch/legalgrantingdate')
  });

router.get('/',(req, res) => {

    res.render('publicusersearch/legalgrantingdate')
  });

module.exports = router;
