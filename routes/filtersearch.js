// *********************************************************
// Gov.UK public user search subsidy awards filter search routing 
// *********************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    
    res.render('publicusersearch/filtersearch',{current_page_active})
  });

  router.get('/',(req, res) => {
    console.log("current page from filtersearch :" + current_page_active)
    res.render('publicusersearch/filtersearch',{current_page_active})
  });

module.exports = router;
