// *********************************************************
// Gov.UK public user search subsidy awards homepage routing 
// *********************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    res.render('publicusersearch/homepage')
  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/homepage')
  });

module.exports = router;
