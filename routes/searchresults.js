
// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.post('/',(req, res) => {

  const { legalgrantingdate } = req.body;
  const { legal_granting_date_day    } = req.body;
  const { legal_granting_date_month  } = req.body;
  const { legal_granting_date_year   } = req.body;
  const { legal_granting_date_day1   } = req.body;
  const { legal_granting_date_month1 } = req.body;
  const { legal_granting_date_year1  } = req.body;
  
  radio_legalgrantingdate = legalgrantingdate;
  date_legal_granting_date_day = legal_granting_date_day  ;
  date_legal_granting_date_month = legal_granting_date_month  ;
  date_legal_granting_date_year = legal_granting_date_year  ;
  date_legal_granting_date_day1 = legal_granting_date_day1 ;
  date_legal_granting_date_month1 = legal_granting_date_month1  ;
  date_legal_granting_date_year1 = legal_granting_date_year1  ;

  console.log("legalgrantingdate:" + legalgrantingdate);
  console.log("date_legal_granting_date_day:" + date_legal_granting_date_day);
  console.log("date_legal_granting_date_month:" + date_legal_granting_date_month);
  console.log("date_legal_granting_date_year:" + date_legal_granting_date_year);

  console.log("date_legal_granting_date_day1:" + date_legal_granting_date_day1);
  console.log("date_legal_granting_date_month1:" + date_legal_granting_date_month1);
  console.log("date_legal_granting_date_year1:" + date_legal_granting_date_year1);
  legal_granting_from_date = date_legal_granting_date_year + '-' + date_legal_granting_date_month + '-' + date_legal_granting_date_day;
  legal_granting_to_date = date_legal_granting_date_year1 + '-' + date_legal_granting_date_month1 + '-' + date_legal_granting_date_day1;
  

  if (legal_granting_from_date == '--') { legal_granting_from_date = ""; }
  if (legal_granting_to_date == '--') { legal_granting_to_date = ""; }

  console.log("legal granting from date:" + legal_granting_from_date);
  console.log("legal granting to date:" + legal_granting_to_date);
  frontend_totalRecordsPerPage = 3;

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
      "pageNumber": 1,
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
          totalrows = searchawards.totalSearchResults;
          // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
          console.log(searchawards.awards[0].beneficiary.beneficiaryType);
          console.log(searchawards.awards[0].subsidyFullAmountExact);
      } catch (err) {
          console.error(err);
      }
  };
  
  

  createUsersearch();
  setTimeout(() => {
     
     
     pageCount = Math.ceil(totalrows/frontend_totalRecordsPerPage );
     console.log("totalrows :" + totalrows)
     console.log("pageCount :" + pageCount)

     previous_page = 1;
     next_page = 2;
     start_record = 1;
     end_record = frontend_totalRecordsPerPage;
     current_page_active = 1;

      res.render('publicusersearch/searchresults',{pageCount,previous_page,next_page,end_record ,end_record,totalrows,current_page_active   })
     }, 8000);

  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/searchresults')
  });


module.exports = router;
