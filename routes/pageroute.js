// ********************************************************************
// Gov.UK public user search page outing 
// ********************************************************************


const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.get('/',(req, res) => {

 console.log("req.query.page: "+ req.query.page);

 routing_pagenumber =   req.query.page;
 current_page = parseInt(routing_pagenumber);
 current_page_active = current_page;
 frontend_totalRecordsPerPage = 3;

 if (current_page == 1) { previous_page = 1; next_page = 2 } 
 else if (current_page == pageCount ) { previous_page = pageCount - 1; next_page = pageCount } 
 else { previous_page = current_page - 1; next_page = current_page + 1;}



 start_index = current_page

 console.log("routing current page :" + current_page);
 console.log("routing prev page :" + previous_page);
 console.log("routing next page :" + next_page );
 

  const data = 
  {
    "beneficiaryName": text_beneficiaryname,
    "subsidyMeasureTitle": "",
    "subsidyObjective": check_subsidyobjective,
    "spendingRegion": "",
    "subsidyInstrument": check_subsidyinstrument,
    "spendingSector":check_spendingsector,
    "legalGrantingFromDate" :legal_granting_from_date,
    "legalGrantingToDate" : legal_granting_to_date,
    "pageNumber": routing_pagenumber,
    "totalRecordsPerPage" : frontend_totalRecordsPerPage,
    "sortBy" : [""]
  
};
  
  createUsersearch = async () => {
      try {
        const res = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResultsWithPaginationSorting', data);
        console.log(`Status: ${res.status}`);
          console.log('Body: ', res.data);
          searchawards = res.data
          var searchawards_api = res.data;
          console.log("searchawards" + searchawards_api );
          const seachawardstring = JSON.stringify(searchawards_api );
          // console.log('seachawardstring' + seachawardstring );
          const seachawardJSON = JSON.parse(seachawardstring );
          // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
          totalrows = parseInt(searchawards.totalSearchResults);
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);
          console.log("req.query.page: "+ req.query.page);
      } catch (err) {
          console.error(err);
      }
  };
  

  if (current_page == 1) { start_record = 1 ; end_record = frontend_totalRecordsPerPage }
  else if (current_page == pageCount ) { start_record = totalrows - frontend_totalRecordsPerPage - 1 ; end_record =  totalrows }
  else { 
    start_record = current_page * frontend_totalRecordsPerPage - frontend_totalRecordsPerPage + 1 ;
    end_record = current_page * frontend_totalRecordsPerPage ;
  }

  createUsersearch();
  setTimeout(() => {
    pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage) ;
     console.log("routing totalrows :" + totalrows)
     console.log("routing pageCount :" + pageCount)
     
   
      res.render('publicusersearch/searchresults',{pageCount,previous_page,next_page,current_page_active,start_record,end_record ,totalrows})
     }, 1000);

  });

  router.post('/',(req, res) => {
    res.render('publicusersearch/searchresults')
  });


module.exports = router;
