// ********************************************************************
// Gov.UK public user search export excel routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
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
    var downloadFolder = process.env.USERPROFILE + "/Downloads";
    let rawData = JSON.parse(JSON.stringify(fileData)); 
    
    let workbook = xlsx.utils.book_new(); 
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet(rawData), "sample"); 
    xlsx.writeFile(workbook,downloadFolder + '/' + "result.xlsx");
  
    
    res.render('publicusersearch/searchresults');
  });

  router.post('/',(req, res) => {

  res.render('publicusersearch/searchresults');
   
  });


module.exports = router;
