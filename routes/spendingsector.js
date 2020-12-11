
// ********************************************************************
// Gov.UK public user search subsidy awards spending sector routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

    var { subsidyobjective0 } = req.body;
    var { subsidyobjective1 } = req.body;
    var { subsidyobjective2 } = req.body;
    var { subsidyobjective3 } = req.body;
    var { subsidyobjective4 } = req.body;
    var { subsidyobjective5 } = req.body;
    var { subsidyobjective6 } = req.body;
    var { subsidyobjective7 } = req.body;
    var { subsidyobjective8 } = req.body;
    var { subsidyobjective9 } = req.body;
    var { subsidyobjective10 } = req.body;
    var { subsidyobjective11 } = req.body;
    var { subsidyobjective12 } = req.body;

    
    if (spending_sector_isfirst == "Yes") {
    check_spendingsector0 = "";
    check_spendingsector1 = "";
    check_spendingsector2 = "";
    check_spendingsector3 = "";
    check_spendingsector4 = "";
    check_spendingsector5 = "";
    check_spendingsector6 = "";
    check_spendingsector7 = "";
    check_spendingsector8 = "";
    check_spendingsector9 = "";
    check_spendingsector10 = "";
    check_spendingsector11 = "";
    check_spendingsector12 = "";
    check_spendingsector13 = "";
    check_spendingsector14 = "";
    check_spendingsector15 = "";
    check_spendingsector16 = "";
    check_spendingsector17 = "";
    check_spendingsector18 = "";
    check_spendingsector19 = "";
    check_spendingsector20 = ""; }
   

    var count = 0;

    if (subsidyobjective0) { check_subsidyobjective0  = "\"" + subsidyobjective0 + "\"" ; count = count + 1; subsidyobjective12 ='' }
    else  { check_subsidyobjective0  = ''; }

    if (subsidyobjective1) { check_subsidyobjective1  = "\"" + subsidyobjective1 + "\"" ; count = count + 1 }
    else  { check_subsidyobjective1  = ''; }

    if (subsidyobjective2) { check_subsidyobjective2  = "\"" + subsidyobjective2 + "\"" ; count = count + 1 }
    else  { check_subsidyobjective2  = ''; }

    if (subsidyobjective3) { check_subsidyobjective3  = "\"" + subsidyobjective3 + "\"" ; count = count + 1}
    else  { check_subsidyobjective3  = ''; }

    if (subsidyobjective4) { check_subsidyobjective4  = "\"" + subsidyobjective4 + "\"" ; count = count + 1 }
    else  { check_subsidyobjective4  = ''; }

    if (subsidyobjective5) { check_subsidyobjective5  = "\"" + subsidyobjective5 + "\"" ; count = count + 1}
    else  { check_subsidyobjective5  = ''; }

    if (subsidyobjective6) { check_subsidyobjective6  = "\"" + subsidyobjective6 + "\"" ; count = count + 1}
    else  { check_subsidyobjective6  = ''; }

    if (subsidyobjective7) { check_subsidyobjective7  = "\"" + subsidyobjective7 + "\"" ; count = count + 1}
    else  { check_subsidyobjective7  = ''; }

    if (subsidyobjective8) { check_subsidyobjective8  = "\"" + subsidyobjective8 + "\"" ; count = count + 1}
    else  { check_subsidyobjective8  = ''; }

    if (subsidyobjective9) { check_subsidyobjective9  = "\"" + subsidyobjective9 + "\"" ; count = count + 1}
    else  { check_subsidyobjective9  = ''; }

    if (subsidyobjective10) { check_subsidyobjective10  = "\"" + subsidyobjective10 + "\"" ; count = count + 1}
    else  { check_subsidyobjective10  = ''; }

    if (subsidyobjective11 && !subsidyobjective12) { check_subsidyobjective11  = "\"" + subsidyobjective11 + "\"" ;check_subsidyobjective11_pass = subsidyobjective11; count = count + 1}
    else  { check_subsidyobjective11  = ''; check_subsidyobjective11_pass = subsidyobjective11;}


    // **********************************************
    // the 11th element is Other, hence not considered while preparing payload
    // **********************************************

    if (subsidyobjective12) { check_subsidyobjective12  = "\"" + subsidyobjective12 + "\"" ; count = count + 1; check_subsidyobjective12_pass = subsidyobjective12 , subsidyobjective11 =''}
    else  { check_subsidyobjective12  = ''; check_subsidyobjective12_pass  =''}


    single_select ='';
    multiple_select = '';
    nothing_selected ='';
    actual_subsidy_objective = '';
    multiple_subsidy_objective ='';

    if (count == 1) { single_select = "Yes"}
    else if (count > 1 ) { multiple_select = "Yes"}
    else if (count == 0 ) { nothing_selected = "Yes"}


    if (single_select == "Yes") 
      {
       
        if (subsidyobjective1) { actual_subsidy_objective = check_subsidyobjective1 }
        else if (subsidyobjective2) { actual_subsidy_objective = check_subsidyobjective2 }
        else if (subsidyobjective3) { actual_subsidy_objective = check_subsidyobjective3 }
        else if (subsidyobjective4) { actual_subsidy_objective = check_subsidyobjective4 }
        else if (subsidyobjective5) { actual_subsidy_objective = check_subsidyobjective5 }
        else if (subsidyobjective6) { actual_subsidy_objective = check_subsidyobjective6 }
        else if (subsidyobjective7) { actual_subsidy_objective = check_subsidyobjective7 }
        else if (subsidyobjective8) { actual_subsidy_objective = check_subsidyobjective8 }
        else if (subsidyobjective9) { actual_subsidy_objective = check_subsidyobjective9 }
        else if (subsidyobjective10) { actual_subsidy_objective = check_subsidyobjective10 }
        else if (subsidyobjective11) { actual_subsidy_objective = check_subsidyobjective11 }
        else if (subsidyobjective12) { actual_subsidy_objective = check_subsidyobjective12 }
    

      }

      if (nothing_selected == "Yes") { actual_subsidy_objective = ''}

      if (multiple_select == "Yes") {

        if (subsidyobjective1) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective1 + ","}
        if (subsidyobjective2) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective2 + ","}
        if (subsidyobjective3) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective3 + ","}
        if (subsidyobjective4) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective4 + ","}
        if (subsidyobjective5) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective5 + ","}
        if (subsidyobjective6) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective6 + ","}
        if (subsidyobjective7) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective7 + ","}
        if (subsidyobjective8) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective8 + ","}
        if (subsidyobjective9) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective9 + ","}
        if (subsidyobjective10) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective10 + ","}
        if (subsidyobjective11 && !subsidyobjective12) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective11 + ","}
        if (subsidyobjective12) {  multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective12 + ","}

       var stringlength = multiple_subsidy_objective.length - 1

       actual_subsidy_objective = multiple_subsidy_objective.substr(0, stringlength );

      }

    console.log("check_subsidyobjective0:" + check_subsidyobjective0);
    console.log("check_subsidyobjective1:" + check_subsidyobjective1);
    console.log("check_subsidyobjective2:" + check_subsidyobjective2);
    console.log("check_subsidyobjective3:" + check_subsidyobjective3);
    console.log("check_subsidyobjective4:" + check_subsidyobjective4);
    console.log("check_subsidyobjective5:" + check_subsidyobjective5);
    console.log("check_subsidyobjective6:" + check_subsidyobjective6);
    console.log("check_subsidyobjective7:" + check_subsidyobjective7);
    console.log("check_subsidyobjective8:" + check_subsidyobjective8);
    console.log("check_subsidyobjective9:" + check_subsidyobjective9);
    console.log("check_subsidyobjective10:" + check_subsidyobjective10);
    console.log("check_subsidyobjective11:" + check_subsidyobjective11);
    console.log("check_subsidyobjective12:" + check_subsidyobjective12);
   
  
   
   
    console.log(" actual_subsidy_objective:" +  actual_subsidy_objective);
  
    
   

    res.render('publicusersearch/spendingsector')
  });

  router.get('/',(req, res) => {

    spending_sector_isfirst = "No";

    res.render('publicusersearch/spendingsector')
  });  

module.exports = router;
