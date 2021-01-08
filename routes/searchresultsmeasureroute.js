// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/', async (req, res) => {
  console.log("req.query.page: " + req.query.page);
  scnumber = req.query.page;
  console.log("scnumber : " + scnumber);
  var measureendpoint = beis_url + '/searchResults/award/' + scnumber;

  try {
    const measureapidata = await axios.get(measureendpoint);
    console.log(`Status: ${measureapidata.status}`);
    console.log('Body: ', measureapidata.data);
    searchmeasuredetails = measureapidata.data;
    res.render('publicusersearch/searchresultsmeasuredetail');

  } catch (err) {
    console.error(err);
  }

});


module.exports = router;