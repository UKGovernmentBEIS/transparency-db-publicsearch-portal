// ********************************************************************
// Gov.UK public user search page hide filter routing
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',async(req, res) => {

 console.log("req.query.page: "+ req.query.page);

//  routing_pagenumber =   req.query.page;
routing_pagenumber  = current_page_active;
 fetch_pagenumber = routing_pagenumber;
 current_page = parseInt(routing_pagenumber);
 console.log("sorting_order_pass : " + sorting_order_pass);

 current_page_active = current_page;
 

 if (current_page == 1) { previous_page = 1; next_page = 2 } 
 else if (current_page == pageCount ) { previous_page = pageCount - 1; next_page = pageCount } 
 else { previous_page = current_page - 1; next_page = current_page + 1;}



 start_index = current_page

 console.log("routing current page :" + current_page);
 console.log("routing prev page :" + previous_page);
 console.log("routing next page :" + next_page );
 

  const data_request = 
  {
    "beneficiaryName": text_beneficiaryname,
    "subsidyMeasureTitle": "",
    "subsidyObjective": actual_subsidy_objective_pass1,
    "spendingRegion": [],
    "subsidyInstrument": actual_subsidy_instrument_pass1 ,
    "spendingSector":actual_spending_sector_pass1,
    "legalGrantingFromDate" :legal_granting_from_date,
    "legalGrantingToDate" : legal_granting_to_date,
    "pageNumber": fetch_pagenumber,
    "totalRecordsPerPage" : frontend_totalRecordsPerPage,
    "sortBy" : sorting_order_pass
  
};
  
var data = JSON.parse(JSON.stringify(data_request));
console.log("request data : " + data);
  
      try {
        const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
        console.log(`Status: ${apidata.status}`);
          console.log('Body: ', apidata.data);
          searchawards = apidata.data;
          var searchawards_api = apidata.data;
          console.log("searchawards" + searchawards_api );
          const seachawardstring = JSON.stringify(searchawards_api );
          const seachawardJSON = JSON.parse(seachawardstring );
          totalrows = parseInt(searchawards.totalSearchResults);
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);
          console.log("req.query.page: "+ req.query.page);

          if (current_page == 1) { start_record = 1 ; end_record = frontend_totalRecordsPerPage ;}
          else if (current_page == pageCount ) { start_record = (current_page - 1)  * frontend_totalRecordsPerPage + 1; end_record =  totalrows }
          else { 
            start_record = current_page * frontend_totalRecordsPerPage - frontend_totalRecordsPerPage + 1 ;
            end_record = current_page * frontend_totalRecordsPerPage ;
          }

          pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage) ;
          console.log("routing totalrows :" + totalrows)
          console.log("routing pageCount :" + pageCount)
          console.log("beneficiary_arrow : " + beneficiary_arrow )
          res.render('publicusersearch/searchresults',{pageCount,previous_page,next_page,current_page_active,start_record,end_record ,totalrows})
          

      } catch (err) {
          console.error(err);
      }
 
    });



  router.post('/',(req, res) => {
    res.render('publicusersearch/searchresults')
  });


module.exports = router;
