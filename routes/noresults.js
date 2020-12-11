// *********************************************************
// Gov.UK public user search subsidy awards noresults routing 
// *********************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    res.render('publicusersearch/noresults')
  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/noresults')
  });

module.exports = router;
