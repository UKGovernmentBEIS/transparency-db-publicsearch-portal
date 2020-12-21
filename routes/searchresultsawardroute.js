// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {
console.log("req.query.page: "+ req.query.page);
awardnumber =   req.query.page;
   
console.log("awardnumber : " + awardnumber);  

var awardendpoint = 'http://subsidy-search-service.azurewebsites.net/searchResults/award/' + awardnumber ;
  
      try {
        const awardapidata = await axios.get(awardendpoint);
        console.log(`Status: ${awardapidata.status}`);
        console.log('Body: ', awardapidata.data);
        searchawarddetails = awardapidata.data;
          res.render('publicusersearch/searchresultsawarddetail')  ; 

      } catch (err) {
          console.error(err);
      }
 
    });


module.exports = router;
