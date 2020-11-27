// ********************************************************************
// Gov.UK public user search subsidy awards beneficiary name routing 
// ********************************************************************



const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
  
    // const { Subsidy_measure_title } = req.body;
    // console.log("req.body : " + req.body);
    // console.log(JSON.stringify(req.body));
    // text_subsidymeasuretitle  = Subsidy_measure_title;
    // console.log("Subsidy_measure_title : " + Subsidy_measure_title);
    res.render('publicusersearch/beneficiaryname')
  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/beneficiaryname')
  });


module.exports = router;
