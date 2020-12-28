
// ********************************************************************
// Gov.UK public user search results filter routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.post('/',async(req, res) => {

  const data_request = 
    {
      "beneficiaryName": text_beneficiaryname,
      "subsidyMeasureTitle": "",
      "subsidyObjective": actual_subsidy_objective_pass1,
      "spendingRegion": [],
      "subsidyInstrument": actual_subsidy_instrument_pass1 ,
      "spendingSector": actual_spending_sector_pass1,
      "legalGrantingFromDate" :legal_granting_from_date,
      "legalGrantingToDate" : legal_granting_to_date,
      "pageNumber": 1,
      "totalRecordsPerPage" : frontend_totalRecordsPerPage,
      "sortBy" : [""]
    
  };

  var data = JSON.parse(JSON.stringify(data_request));

  console.log("request :" + JSON.stringify(data));
    
      try {
          const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
          console.log(`Status: ${apidata.status}`);

          API_response_code = `${apidata.status}`;
          console.log("API_response_code: try" + API_response_code);
          console.log('Body: ', apidata.data);
          searchawards = apidata.data
          var searchawards_api = apidata.data;
          console.log("searchawards" + searchawards_api );
          const seachawardstring = JSON.stringify(searchawards_api )
          const seachawardJSON = JSON.parse(seachawardstring );
          totalrows = searchawards.totalSearchResults;
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);  
          pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage );

          
          console.log("totalrows :" + totalrows)
          console.log("pageCount :" + pageCount)
          previous_page = 1;
          next_page = 2;
          start_record = 1;
          end_record = frontend_totalRecordsPerPage;
          current_page_active = 1;
          res.render('publicusersearch/filterroute',{pageCount,previous_page,next_page,end_record ,end_record,totalrows,current_page_active   })
          

      }
      
      catch (err) {
     
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
        res.render('publicusersearch/noresults'); 
      }
  

  });



  router.get('/',(req, res) => {
    res.render('publicusersearch/searchresults');
  });


module.exports = router;
