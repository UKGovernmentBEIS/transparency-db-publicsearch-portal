// ********************************************************************
// Gov.UK public user search export excel routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.post('/',async(req, res) => {

//     const data_request = 
//     {
//       "beneficiaryName": text_beneficiaryname,
//       "subsidyMeasureTitle": "",
//       "subsidyObjective": actual_subsidy_objective_pass1,
//       "spendingRegion": [],
//       "subsidyInstrument": actual_subsidy_instrument_pass1 ,
//       "spendingSector": actual_spending_sector_pass1,
//       "legalGrantingFromDate" :legal_granting_from_date,
//       "legalGrantingToDate" : legal_granting_to_date,
//       "pageNumber": 1,
//       "totalRecordsPerPage" : 50000,
//       "sortBy" : [""]
    
//   };

//   var data = JSON.parse(JSON.stringify(data_request));

//   console.log("request :" + JSON.stringify(data));
    
//       try {
//           const apidata = await axios.post('http://subsidy-search-service.azurewebsites.net/searchResults', data);
//           console.log(`Status: ${apidata.status}`);
//           API_response_code = `${apidata.status}`;
//           console.log('Body: ', apidata.data); 
//           var searchawardsall = apidata.data;
//           const seachawardstringall = JSON.stringify(searchawardsall )
//           const seachawardJSONall = JSON.parse(seachawardstringall );
//           console.log("seachawardJSON" + seachawardJSONall );

//       }
      
//       catch (err) {
//         response_error_message = err;
//         console.log("message error : " + err);
//         console.log("response_error_message catch : " + response_error_message );
//         res.render('publicusersearch/noresults'); 
//       }


var fileData = 
    [ 
        { 
            "name" : "George", 
            "phone" : "+11 9191919191" 
        }, 
        { 
            "name" : "Donald", 
            "phone" : "+11 9191919222" 
        }, 
        { 
            "name" : "Ben", 
            "phone" : "+11 9819179911" 
        } 
    ] ;

    const xlsx = require("xlsx"); 
    const fs = require("fs"); 
    // let fileData1 = fs.readFileSync(data);  
    let rawData = JSON.parse(JSON.stringify(fileData));   
    let workbook = xlsx.utils.book_new(); 
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(rawData), "sample"); 
    xlsx.writeFile(workbook,"result.xlsx");
  
   
    res.render('publicusersearch/searchresults')
  });

  router.get('/',(req, res) => {

  res.render('publicusersearch/searchresults')
   
  });


module.exports = router;
