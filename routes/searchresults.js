
// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.post('/',async(req, res) => {

  var { legalgrantingdate } = req.body;
  var { legal_granting_date_day    } = req.body;
  var { legal_granting_date_month  } = req.body;
  var { legal_granting_date_year   } = req.body;
  var { legal_granting_date_day1   } = req.body;
  var { legal_granting_date_month1 } = req.body;
  var { legal_granting_date_year1  } = req.body;

  var append_zero = "0";
  var day_length = legal_granting_date_day.length;
  if (day_length == 1 ) {  legal_granting_date_day = append_zero + legal_granting_date_day  }
  var month_length = legal_granting_date_month.length
  if (month_length == 1 ) {  legal_granting_date_month = append_zero + legal_granting_date_month  }

  var day_length1 = legal_granting_date_day1.length;
  if (day_length1 == 1 ) {  legal_granting_date_day1 = append_zero + legal_granting_date_day1  }
  var month_length1 = legal_granting_date_month1.length
  if (month_length1 == 1 ) {  legal_granting_date_month1 = append_zero + legal_granting_date_month1  }
  
  radio_legalgrantingdate = legalgrantingdate;  
  
  date_legal_granting_date_day = legal_granting_date_day
  date_legal_granting_date_month = legal_granting_date_month  ;
  date_legal_granting_date_year = legal_granting_date_year  ;
  
  date_legal_granting_date_day1= legal_granting_date_day1
  date_legal_granting_date_month1 = legal_granting_date_month1  ;
  date_legal_granting_date_year1 = legal_granting_date_year1  ;

  console.log("legalgrantingdate:" + legalgrantingdate);
  console.log("date_legal_granting_date_day:" + date_legal_granting_date_day);
  console.log("date_legal_granting_date_month:" + date_legal_granting_date_month);
  console.log("date_legal_granting_date_year:" + date_legal_granting_date_year);

  console.log("date_legal_granting_date_day1:" + date_legal_granting_date_day1);
  console.log("date_legal_granting_date_month1:" + date_legal_granting_date_month1);
  console.log("date_legal_granting_date_year1:" + date_legal_granting_date_year1);


//  *****************************
//  Date error validations
// *****************************


  var SubsidyErrors = [] ;
  var SubsidyFocus = [] ;
  var Additem = 0;
  var SubsidyArraySize = 0;
  MonthNotaNumber ="No";
  DayNotaNumber = "No";
  YearNotaNumber = "No"
  date_legal_granting_date_month_Error = false;
  date_legal_granting_date_day_Error = false;
  date_legal_granting_date_year_Error = false;
  date_legal_granting_date_month1_Error = false;
  date_legal_granting_date_day1_Error = false;
  date_legal_granting_date_year1_Error = false;


  if (radio_legalgrantingdate == "No" || radio_legalgrantingdate == undefined ) {
    date_legal_granting_date_day = '';
    date_legal_granting_date_month =  '';
    date_legal_granting_date_year =  '';
    
    date_legal_granting_date_day1=  '';
    date_legal_granting_date_month1 =  '';
    date_legal_granting_date_year1 =  '';
  }



  if( date_legal_granting_date_day || date_legal_granting_date_month || date_legal_granting_date_year ) 
     {

        if (date_legal_granting_date_month ) {if(isNaN(date_legal_granting_date_month )) { MonthNotaNumber = "Yes" }}
        if (date_legal_granting_date_day )   {if(isNaN(date_legal_granting_date_day ))  { DayNotaNumber = "Yes" }}
        if (date_legal_granting_date_year )  {if(isNaN(date_legal_granting_date_year )) { YearNotaNumber = "Yes" }}
        
        if ( date_legal_granting_date_month > 12 || date_legal_granting_date_month < 1  || date_legal_granting_date_month == '' || MonthNotaNumber == "Yes" )
        { 
          date_legal_granting_date_month_Error = true ;
          SubsidyErrors[Additem] = '     Enter the valid month';
          SubsidyFocus[Additem] = '#legal_granting_date_month';
          Additem = Additem + 1 ;
        }

        if (date_legal_granting_date_day > 31 || date_legal_granting_date_day < 1  || date_legal_granting_date_day == '' || DayNotaNumber == "Yes" ) { 
          date_legal_granting_date_day_Error = true ;
          SubsidyErrors[Additem] = '     Enter the valid day';
          SubsidyFocus[Additem] = '#legal_granting_date_day';
          Additem = Additem + 1 ;
        }

        if (date_legal_granting_date_year < 1960 || date_legal_granting_date_year == '' || YearNotaNumber == "Yes" ) { 
          date_legal_granting_date_year_Error = true ;
          SubsidyErrors[Additem] = '     Enter the valid year';
          SubsidyFocus[Additem] = '#legal_granting_date_year';
          Additem = Additem + 1 ;
        }
  }

  MonthNotaNumber1 ="No";
  DayNotaNumber1 = "No";
  YearNotaNumber1 = "No"


  if( date_legal_granting_date_day1 || date_legal_granting_date_month1 || date_legal_granting_date_year1 ) 
  {

     if (date_legal_granting_date_month1 ) {if(isNaN(date_legal_granting_date_month1 )) { MonthNotaNumber1 = "Yes" }}
     if (date_legal_granting_date_day1 )   {if(isNaN(date_legal_granting_date_day1 ))  { DayNotaNumber1 = "Yes" }}
     if (date_legal_granting_date_year1 )  {if(isNaN(date_legal_granting_date_year1 )) { YearNotaNumber1 = "Yes" }}
     
     if ( date_legal_granting_date_month1 > 12 || date_legal_granting_date_month1 < 1  || date_legal_granting_date_month1 == '' || MonthNotaNumber1 == "Yes" )
     { 
       date_legal_granting_date_month1_Error = true ;
       SubsidyErrors[Additem] = '     Enter the valid month';
       SubsidyFocus[Additem] = '#legal_granting_date_month1';
       Additem = Additem + 1 ;
     }

     if (date_legal_granting_date_day1 > 31 || date_legal_granting_date_day1 < 1  || date_legal_granting_date_day1 == '' || DayNotaNumber1 == "Yes" ) { 
       date_legal_granting_date_day1_Error = true ;
       SubsidyErrors[Additem] = '     Enter the valid day';
       SubsidyFocus[Additem] = '#legal_granting_date_day1';
       Additem = Additem + 1 ;
     }

     if (date_legal_granting_date_year1 < 1960 || date_legal_granting_date_year1 == '' || YearNotaNumber1 == "Yes" ) { 
       date_legal_granting_date_year1_Error = true ;
       SubsidyErrors[Additem] = '     Enter the valid year';
       SubsidyFocus[Additem] = '#legal_granting_date_year1';
       Additem = Additem + 1 ;
     }
}


//  ********************************************************************
//  check which date is entered properly : This scenario is success case
// *********************************************************************

if ( !date_legal_granting_date_month_Error && !date_legal_granting_date_day_Error && !date_legal_granting_date_year_Error && 
  !date_legal_granting_date_month1_Error && !date_legal_granting_date_day1_Error && !date_legal_granting_date_year1_Error
  )
{
      isFromandTodateAvailable = "No";
      isOnlyFromdateAvailable = "No";
      isOnlyTodateAvailable = "No"


      if (date_legal_granting_date_year  && date_legal_granting_date_month  && date_legal_granting_date_day &&
        date_legal_granting_date_year1 && date_legal_granting_date_month1 && date_legal_granting_date_day1
      ) {

      isFromandTodateAvailable = "Yes";
      isOnlyFromdateAvailable = "No";
      isOnlyTodateAvailable = "No"
      }

     else if (!date_legal_granting_date_year  && !date_legal_granting_date_month  && !date_legal_granting_date_day &&
        !date_legal_granting_date_year1 && !date_legal_granting_date_month1 && !date_legal_granting_date_day1
      ) {

      isFromandTodateAvailable = "No";
      isOnlyFromdateAvailable = "No";
      isOnlyTodateAvailable = "No"
      }

      else if ( date_legal_granting_date_year && date_legal_granting_date_month && date_legal_granting_date_day &&
      !date_legal_granting_date_year1 && !date_legal_granting_date_month1 &&  !date_legal_granting_date_day1
      ) {
    
        isFromandTodateAvailable = "No";
        isOnlyFromdateAvailable = "Yes";
        isOnlyTodateAvailable = "No"
      }

      else if  ( !date_legal_granting_date_year && !date_legal_granting_date_month && !date_legal_granting_date_day &&
      date_legal_granting_date_year1 && date_legal_granting_date_month1 &&  date_legal_granting_date_day1
      ) {
        isFromandTodateAvailable = "No";
        isOnlyFromdateAvailable = "No";
        isOnlyTodateAvailable = "Yes"
      }

      if (isFromandTodateAvailable == "Yes") {
      legal_granting_from_date = date_legal_granting_date_year + '-' + date_legal_granting_date_month + '-' + date_legal_granting_date_day;
      legal_granting_to_date = date_legal_granting_date_year1 + '-' + date_legal_granting_date_month1 + '-' + date_legal_granting_date_day1;
      }

      else if (isOnlyFromdateAvailable == "Yes") {
        legal_granting_from_date = date_legal_granting_date_year + '-' + date_legal_granting_date_month + '-' + date_legal_granting_date_day;
        legal_granting_to_date =  new Date().getFullYear()+'-'+("0"+(new Date().getMonth()+1)).slice(-2)+'-'+("0"+new Date().getDate()).slice(-2);
        }
      else if (isOnlyTodateAvailable == "Yes") {
      legal_granting_from_date = "1960-01-01";
      legal_granting_to_date = date_legal_granting_date_year1 + '-' + date_legal_granting_date_month1 + '-' + date_legal_granting_date_day1;

      }

     

        // if (isFromandTodateAvailable == "No" && radio_legalgrantingdate == "Yes" ) {

        //   legal_granting_from_date = '';
        //   legal_granting_to_date = ''; 
        // }
      

        console.log("legal granting from date:" + legal_granting_from_date);
        console.log("legal granting to date:" + legal_granting_to_date);

// ***********************
// API integration section 
// ***********************


  frontend_totalRecordsPerPage = 3;

  actual_subsidy_objective_trim = actual_subsidy_objective.replace(/^"(.+)"$/,'$1');
  actual_subsidy_objective_brace = '[' + actual_subsidy_objective + ']';
  actual_subsidy_objective_pass = actual_subsidy_objective_brace.replace(/^"(.*)"$/, '$1');
  actual_subsidy_objective_pass1 = JSON.parse(actual_subsidy_objective_pass);
 
  actual_subsidy_instrument_trim = actual_subsidy_instrument.replace(/^"(.+)"$/,'$1');
  actual_subsidy_instrument_brace = '[' + actual_subsidy_instrument + ']';
  actual_subsidy_instrument_pass = actual_subsidy_instrument_brace.replace(/^"(.*)"$/, '$1');
  actual_subsidy_instrument_pass1 = JSON.parse(actual_subsidy_instrument_pass);
 
  actual_spending_sector_trim = actual_spending_sector.replace(/^"(.+)"$/,'$1');
  actual_spending_sector_brace = '[' + actual_spending_sector + ']';
  actual_spending_sector_pass = actual_spending_sector_brace.replace(/^"(.*)"$/, '$1');
  actual_spending_sector_pass1 = JSON.parse(actual_spending_sector_pass);
  

  console.log("actual_spending_sector_pass :" + actual_spending_sector_pass )


  const data = 
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
          // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
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
          legalgrantingdate_sorting_order = "desc";
          beneficiary_sorting_order  = "desc";
          subsidyamount_sorting_order  = "desc";
          sorting_order_pass = JSON.parse("[]");
          beneficiary_arrow = "upanddown";
          subsidyamount_arrow = "upanddown";
          legalgrantingdate_arrow = "upanddown";
          res.render('publicusersearch/searchresults',{pageCount,previous_page,next_page,end_record ,end_record,totalrows,current_page_active   })
          

      }
      
      catch (err) {
     
        response_error_message = err;
        console.log("message error : " + err);
        console.log("response_error_message catch : " + response_error_message );
        res.render('publicusersearch/noresults'); 
      }

    }



      else 

      {
        SubsidyArraySize = SubsidyErrors.length;
        console.log("SubsidyArraySize:" + SubsidyArraySize);
        res.render('publicusersearch/legalgrantingdate',{     
          SubsidyErrors,
          SubsidyArraySize,
          SubsidyFocus 
        })

      }


  // end of POST call
    });  




  router.get('/',(req, res) => {
    res.render('publicusersearch/searchresults',{

      date_legal_granting_date_day,
      date_legal_granting_date_month,
      date_legal_granting_date_year,
      date_legal_granting_date_day1,
      date_legal_granting_date_month1,
      date_legal_granting_date_year1,
      date_legal_granting_date_month_Error,
      date_legal_granting_date_day_Error,
      date_legal_granting_date_year_Error,
      date_legal_granting_date_month1_Error,
      date_legal_granting_date_day1_Error,
      date_legal_granting_date_year1_Error 
    

    })
  });


module.exports = router;
