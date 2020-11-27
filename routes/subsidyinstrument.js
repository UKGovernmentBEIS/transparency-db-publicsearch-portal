// ********************************************************************
// Gov.UK public user search subsidy awards subsidy instrument routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

    const { spendingsector } = req.body;
    check_spendingsector = spendingsector;
    console.log("spendingsector:"+check_spendingsector);
    res.render('publicusersearch/subsidyinstrument')
  });

  router.get('/',(req, res) => {

    res.render('publicusersearch/subsidyinstrument')
  });

module.exports = router;
