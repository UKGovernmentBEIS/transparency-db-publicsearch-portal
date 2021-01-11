// ********************************************************************
// Gov.UK public user search results routing module
// ********************************************************************

const express = require('express');
const router = express.Router();
const axios = require('axios');
var request = require('request');

router.post('/', async (req, res) => {

  // ***************************************************************
  // Subsidy objective read section from filter display results call 
  // ***************************************************************

  var  {
    subsidyobjective0
  } = req.body;
  var  {
    subsidyobjective1
  } = req.body;
  var  {
    subsidyobjective2
  } = req.body;
  var  {
    subsidyobjective3
  } = req.body;
  var  {
    subsidyobjective4
  } = req.body;
  var  {
    subsidyobjective5
  } = req.body;
  var  {
    subsidyobjective6
  } = req.body;
  var  {
    subsidyobjective7
  } = req.body;
  var  {
    subsidyobjective8
  } = req.body;
  var  {
    subsidyobjective9
  } = req.body;
  var  {
    subsidyobjective10
  } = req.body;
  var  {
    subsidyobjective11
  } = req.body;
  var  {
    subsidyobjective12
  } = req.body;

  var count = 0;

  if (subsidyobjective0) {
    check_subsidyobjective0 = "\"" + subsidyobjective0 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective0 = '';
  }

  if (subsidyobjective1) {
    check_subsidyobjective1 = "\"" + subsidyobjective1 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective1 = '';
  }

  if (subsidyobjective2) {
    check_subsidyobjective2 = "\"" + subsidyobjective2 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective2 = '';
  }

  if (subsidyobjective3) {
    check_subsidyobjective3 = "\"" + subsidyobjective3 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective3 = '';
  }

  if (subsidyobjective4) {
    check_subsidyobjective4 = "\"" + subsidyobjective4 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective4 = '';
  }

  if (subsidyobjective5) {
    check_subsidyobjective5 = "\"" + subsidyobjective5 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective5 = '';
  }

  if (subsidyobjective6) {
    check_subsidyobjective6 = "\"" + subsidyobjective6 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective6 = '';
  }

  if (subsidyobjective7) {
    check_subsidyobjective7 = "\"" + subsidyobjective7 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective7 = '';
  }

  if (subsidyobjective8) {
    check_subsidyobjective8 = "\"" + subsidyobjective8 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective8 = '';
  }

  if (subsidyobjective9) {
    check_subsidyobjective9 = "\"" + subsidyobjective9 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective9 = '';
  }

  if (subsidyobjective10) {
    check_subsidyobjective10 = "\"" + subsidyobjective10 + "\"";
    count = count + 1;
  } else {
    check_subsidyobjective10 = '';
  }

  if (subsidyobjective11 && !subsidyobjective12) {
    check_subsidyobjective11 = '"' + subsidyobjective11 + '"';
    check_subsidyobjective11_pass = subsidyobjective11;
    count = count + 1;
  } else {
    check_subsidyobjective11 = "";
    check_subsidyobjective11_pass = subsidyobjective11;
  }

  // **********************************************
  // the 11th element is Other, hence not considered while preparing payload
  // **********************************************

  if (subsidyobjective12) {
    check_subsidyobjective12 = '"' + "Other-" + subsidyobjective12 + '"';
    count = count + 1;
    (check_subsidyobjective12_pass = subsidyobjective12),
      (subsidyobjective11 = "");
  } else {
    check_subsidyobjective12 = "";
    check_subsidyobjective12_pass = "";
  }


  single_select = '';
  multiple_select = '';
  nothing_selected = '';
  actual_subsidy_objective = '';
  multiple_subsidy_objective = '';

  if (count == 1) {
    single_select = "Yes";
  } else if (count > 1) {
    multiple_select = "Yes";
  } else if (count == 0) {
    nothing_selected = "Yes";
  }


  if (single_select == "Yes") {
    if (subsidyobjective1) {
      actual_subsidy_objective = check_subsidyobjective1;
    } else if (subsidyobjective2) {
      actual_subsidy_objective = check_subsidyobjective2;
    } else if (subsidyobjective3) {
      actual_subsidy_objective = check_subsidyobjective3;
    } else if (subsidyobjective4) {
      actual_subsidy_objective = check_subsidyobjective4;
    } else if (subsidyobjective5) {
      actual_subsidy_objective = check_subsidyobjective5;
    } else if (subsidyobjective6) {
      actual_subsidy_objective = check_subsidyobjective6;
    } else if (subsidyobjective7) {
      actual_subsidy_objective = check_subsidyobjective7;
    } else if (subsidyobjective8) {
      actual_subsidy_objective = check_subsidyobjective8;
    } else if (subsidyobjective9) {
      actual_subsidy_objective = check_subsidyobjective9;
    } else if (subsidyobjective10) {
      actual_subsidy_objective = check_subsidyobjective10;
    } else if (subsidyobjective11) {
      actual_subsidy_objective = check_subsidyobjective11;
    } else if (subsidyobjective12) {
      actual_subsidy_objective = check_subsidyobjective12;
    }
  }

  if (nothing_selected == "Yes") {
    actual_subsidy_objective = '';
  }

  if (multiple_select == "Yes") {

    if (subsidyobjective1) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective1 + ",";
    }
    if (subsidyobjective2) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective2 + ",";
    }
    if (subsidyobjective3) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective3 + ",";
    }
    if (subsidyobjective4) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective4 + ",";
    }
    if (subsidyobjective5) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective5 + ",";
    }
    if (subsidyobjective6) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective6 + ",";
    }
    if (subsidyobjective7) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective7 + ",";
    }
    if (subsidyobjective8) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective8 + ",";
    }
    if (subsidyobjective9) {
      multiple_subsidy_objective = multiple_subsidy_objective + check_subsidyobjective9 + ",";
    }
    if (subsidyobjective10) {
      multiple_subsidy_objective =
        multiple_subsidy_objective + check_subsidyobjective10 + ",";
    }
    if (subsidyobjective11 && !subsidyobjective12) {
      multiple_subsidy_objective =
        multiple_subsidy_objective + check_subsidyobjective11 + ",";
    }
    if (subsidyobjective12) {
      multiple_subsidy_objective =
        multiple_subsidy_objective + check_subsidyobjective12 + ",";
    }
    var stringlength = multiple_subsidy_objective.length - 1;

    actual_subsidy_objective = multiple_subsidy_objective.substr(0, stringlength);

  }


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
  console.log("check_subsidyobjective10:" + check_subsidyobjective11);
  console.log("check_subsidyobjective12:" + check_subsidyobjective12);

  console.log(" actual_subsidy_objective:" + actual_subsidy_objective);

  // ***********************************************************************
  // End of - Subsidy objective read section from filter display results call 
  // **********************************************************************


  // **********************************************************
  // Start of spending sector read from filter display results call 
  // ************************************************************

  var  {
    spendingsector0
  } = req.body;
  var  {
    spendingsector1
  } = req.body;
  var  {
    spendingsector2
  } = req.body;
  var  {
    spendingsector3
  } = req.body;
  var  {
    spendingsector4
  } = req.body;
  var  {
    spendingsector5
  } = req.body;
  var  {
    spendingsector6
  } = req.body;
  var  {
    spendingsector7
  } = req.body;
  var  {
    spendingsector8
  } = req.body;
  var  {
    spendingsector9
  } = req.body;
  var  {
    spendingsector10
  } = req.body;
  var  {
    spendingsector11
  } = req.body;
  var  {
    spendingsector12
  } = req.body;
  var  {
    spendingsector13
  } = req.body;
  var  {
    spendingsector14
  } = req.body;
  var  {
    spendingsector15
  } = req.body;
  var  {
    spendingsector16
  } = req.body;
  var  {
    spendingsector17
  } = req.body;
  var  {
    spendingsector18
  } = req.body;
  var  {
    spendingsector19
  } = req.body;
  var  {
    spendingsector20
  } = req.body;

  var count = 0;

  if (spendingsector0) {
    check_spendingsector0 = "\"" + spendingsector0 + "\"";
    count = count + 1;
  } else {
    check_spendingsector0 = '';
  }
  if (spendingsector1) {
    check_spendingsector1 = "\"" + spendingsector1 + "\"";
    count = count + 1;
  } else {
    check_spendingsector1 = '';
  }
  if (spendingsector2) {
    check_spendingsector2 = "\"" + spendingsector2 + "\"";
    count = count + 1;
  } else {
    check_spendingsector2 = '';
  }
  if (spendingsector3) {
    check_spendingsector3 = "\"" + spendingsector3 + "\"";
    count = count + 1;
  } else {
    check_spendingsector3 = '';
  }
  if (spendingsector4) {
    check_spendingsector4 = "\"" + spendingsector4 + "\"";
    count = count + 1;
  } else {
    check_spendingsector4 = '';
  }
  if (spendingsector5) {
    check_spendingsector5 = "\"" + spendingsector5 + "\"";
    count = count + 1;
  } else {
    check_spendingsector5 = '';
  }
  if (spendingsector6) {
    check_spendingsector6 = "\"" + spendingsector6 + "\"";
    count = count + 1;
  } else {
    check_spendingsector6 = '';
  }
  if (spendingsector7) {
    check_spendingsector7 = "\"" + spendingsector7 + "\"";
    count = count + 1;
  } else {
    check_spendingsector7 = '';
  }
  if (spendingsector8) {
    check_spendingsector8 = "\"" + spendingsector8 + "\"";
    count = count + 1;
  } else {
    check_spendingsector8 = '';
  }
  if (spendingsector9) {
    check_spendingsector9 = "\"" + spendingsector9 + "\"";
    count = count + 1;
  } else {
    check_spendingsector9 = '';
  }
  if (spendingsector10) {
    check_spendingsector10 = "\"" + spendingsector10 + "\"";
    count = count + 1;
  } else {
    check_spendingsector10 = '';
  }
  if (spendingsector11) {
    check_spendingsector11 = "\"" + spendingsector11 + "\"";
    count = count + 1;
  } else {
    check_spendingsector11 = '';
  }
  if (spendingsector12) {
    check_spendingsector12 = "\"" + spendingsector12 + "\"";
    count = count + 1;
  } else {
    check_spendingsector12 = '';
  }
  if (spendingsector13) {
    check_spendingsector13 = "\"" + spendingsector13 + "\"";
    count = count + 1;
  } else {
    check_spendingsector13 = '';
  }
  if (spendingsector14) {
    check_spendingsector14 = "\"" + spendingsector14 + "\"";
    count = count + 1;
  } else {
    check_spendingsector14 = '';
  }
  if (spendingsector15) {
    check_spendingsector15 = "\"" + spendingsector15 + "\"";
    count = count + 1;
  } else {
    check_spendingsector15 = '';
  }
  if (spendingsector16) {
    check_spendingsector16 = "\"" + spendingsector16 + "\"";
    count = count + 1;
  } else {
    check_spendingsector16 = '';
  }
  if (spendingsector17) {
    check_spendingsector17 = "\"" + spendingsector17 + "\"";
    count = count + 1;
  } else {
    check_spendingsector17 = '';
  }
  if (spendingsector18) {
    check_spendingsector18 = "\"" + spendingsector18 + "\"";
    count = count + 1;
  } else {
    check_spendingsector18 = '';
  }
  if (spendingsector19) {
    check_spendingsector19 = "\"" + spendingsector19 + "\"";
    count = count + 1;
  } else {
    check_spendingsector19 = '';
  }
  if (spendingsector20) {
    check_spendingsector20 = "\"" + spendingsector20 + "\"";
    count = count + 1;
  } else {
    check_spendingsector20 = '';
  }

  single_select = '';
  multiple_select = '';
  nothing_selected = '';
  actual_spending_sector = '';
  multiple_spending_sector = '';

  if (count == 1) {
    single_select = "Yes";
  } else if (count > 1) {
    multiple_select = "Yes";
  } else if (count == 0) {
    nothing_selected = "Yes";
  }


  if (single_select == "Yes") {

    if (spendingsector1) {
      actual_spending_sector = check_spendingsector1;
    } else if (spendingsector2) {
      actual_spending_sector = check_spendingsector2;
    } else if (spendingsector3) {
      actual_spending_sector = check_spendingsector3;
    } else if (spendingsector4) {
      actual_spending_sector = check_spendingsector4;
    } else if (spendingsector5) {
      actual_spending_sector = check_spendingsector5;
    } else if (spendingsector6) {
      actual_spending_sector = check_spendingsector6;
    } else if (spendingsector7) {
      actual_spending_sector = check_spendingsector7;
    } else if (spendingsector8) {
      actual_spending_sector = check_spendingsector8;
    } else if (spendingsector9) {
      actual_spending_sector = check_spendingsector9;
    } else if (spendingsector10) {
      actual_spending_sector = check_spendingsector10;
    } else if (spendingsector11) {
      actual_spending_sector = check_spendingsector11;
    } else if (spendingsector12) {
      actual_spending_sector = check_spendingsector12;
    } else if (spendingsector13) {
      actual_spending_sector = check_spendingsector13;
    } else if (spendingsector14) {
      actual_spending_sector = check_spendingsector14;
    } else if (spendingsector15) {
      actual_spending_sector = check_spendingsector15;
    } else if (spendingsector16) {
      actual_spending_sector = check_spendingsector16;
    } else if (spendingsector17) {
      actual_spending_sector = check_spendingsector17;
    } else if (spendingsector18) {
      actual_spending_sector = check_spendingsector18;
    } else if (spendingsector19) {
      actual_spending_sector = check_spendingsector19;
    } else if (spendingsector20) {
      actual_spending_sector = check_spendingsector20;
    }

  }

  if (nothing_selected == "Yes") {
    actual_spending_sector = '';
  }

  if (multiple_select == "Yes") {

    if (spendingsector1) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector1 + ",";
    }
    if (spendingsector2) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector2 + ",";
    }
    if (spendingsector3) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector3 + ",";
    }
    if (spendingsector4) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector4 + ",";
    }
    if (spendingsector5) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector5 + ",";
    }
    if (spendingsector6) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector6 + ",";
    }
    if (spendingsector7) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector7 + ",";
    }
    if (spendingsector8) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector8 + ",";
    }
    if (spendingsector9) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector9 + ",";
    }
    if (spendingsector10) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector10 + ",";
    }
    if (spendingsector11) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector11 + ",";
    }
    if (spendingsector12) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector12 + ",";
    }
    if (spendingsector13) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector13 + ",";
    }
    if (spendingsector14) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector14 + ",";
    }
    if (spendingsector15) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector15 + ",";
    }
    if (spendingsector16) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector16 + ",";
    }
    if (spendingsector17) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector17 + ",";
    }
    if (spendingsector18) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector18 + ",";
    }
    if (spendingsector19) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector19 + ",";
    }
    if (spendingsector20) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector20 + ",";
    }

    var stringlength = multiple_spending_sector.length - 1;

    actual_spending_sector = multiple_spending_sector.substr(0, stringlength);

  }


  console.log("check_spendingsector1:" + check_spendingsector1);
  console.log("check_spendingsector2:" + check_spendingsector2);
  console.log("check_spendingsector3:" + check_spendingsector3);
  console.log("check_spendingsector4:" + check_spendingsector4);
  console.log("check_spendingsector5:" + check_spendingsector5);
  console.log("check_spendingsector6:" + check_spendingsector6);
  console.log("check_spendingsector7:" + check_spendingsector7);
  console.log("check_spendingsector8:" + check_spendingsector8);
  console.log("check_spendingsector9:" + check_spendingsector9);
  console.log("check_spendingsector10:" + check_spendingsector10);
  console.log("check_spendingsector11:" + check_spendingsector11);
  console.log("check_spendingsector12:" + check_spendingsector12);
  console.log("check_spendingsector13:" + check_spendingsector13);
  console.log("check_spendingsector14:" + check_spendingsector14);
  console.log("check_spendingsector15:" + check_spendingsector15);
  console.log("check_spendingsector16:" + check_spendingsector16);
  console.log("check_spendingsector17:" + check_spendingsector17);
  console.log("check_spendingsector18:" + check_spendingsector18);
  console.log("check_spendingsector19:" + check_spendingsector19);
  console.log("check_spendingsector20:" + check_spendingsector20);

  console.log(" actual_spending_sector:" + actual_spending_sector);

  // **********************************************************
  // End of spending sector read from filter display results call 
  // ************************************************************

  // **********************************************************
  // Start of subsidy instrument read from filter display results call 
  // ************************************************************

  var  {
    subsidyinstrument0
  } = req.body;
  var  {
    subsidyinstrument1
  } = req.body;
  var  {
    subsidyinstrument2
  } = req.body;
  var  {
    subsidyinstrument3
  } = req.body;
  var  {
    subsidyinstrument4
  } = req.body;
  var  {
    subsidyinstrument5
  } = req.body;
  var  {
    subsidyinstrument6
  } = req.body;
  var  {
    subsidyinstrument7
  } = req.body;
  var  {
    subsidyinstrument8
  } = req.body;
  var  {
    subsidyinstrument9
  } = req.body;

  var count = 0;

  if (subsidyinstrument0) {
    check_subsidyinstrument0 = "\"" + subsidyinstrument0 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument0 = '';
  }

  if (subsidyinstrument1) {
    check_subsidyinstrument1 = "\"" + subsidyinstrument1 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument1 = '';
  }

  if (subsidyinstrument2) {
    check_subsidyinstrument2 = "\"" + subsidyinstrument2 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument2 = '';
  }

  if (subsidyinstrument3) {
    check_subsidyinstrument3 = "\"" + subsidyinstrument3 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument3 = '';
  }

  if (subsidyinstrument4) {
    check_subsidyinstrument4 = "\"" + subsidyinstrument4 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument4 = '';
  }

  if (subsidyinstrument5) {
    check_subsidyinstrument5 = "\"" + subsidyinstrument5 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument5 = '';
  }

  if (subsidyinstrument6) {
    check_subsidyinstrument6 = "\"" + subsidyinstrument6 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument6 = '';
  }

  if (subsidyinstrument7) {
    check_subsidyinstrument7 = "\"" + subsidyinstrument7 + "\"";
    count = count + 1;
  } else {
    check_subsidyinstrument7 = '';
  }

  if (subsidyinstrument8 && !subsidyinstrument9) {
    check_subsidyinstrument8 = '"' + subsidyinstrument8 + '"';
    check_subsidyinstrument8_pass = subsidyinstrument8;
    count = count + 1;
  } else {
    check_subsidyinstrument8 = "";
    check_subsidyinstrument8_pass = subsidyinstrument8;
  }

  if (subsidyinstrument9) {
    check_subsidyinstrument9 = '"' + "Other-" + subsidyinstrument9 + '"';
    check_subsidyinstrument9_pass = subsidyinstrument9;
    subsidyinstrument8 = "";
    count = count + 1;
  } else {
    check_subsidyinstrument9 = "";
    check_subsidyinstrument9_pass = "";
  }

  single_select = '';
  multiple_select = '';
  nothing_selected = '';
  actual_subsidy_instrument = '';
  multiple_subsidy_instrument = '';

  if (count == 1) {
    single_select = "Yes";
  } else if (count > 1) {
    multiple_select = "Yes";
  } else if (count == 0) {
    nothing_selected = "Yes";
  }


  if (single_select == "Yes") {
    if (subsidyinstrument1) {
      actual_subsidy_instrument = check_subsidyinstrument1;
    } else if (subsidyinstrument2) {
      actual_subsidy_instrument = check_subsidyinstrument2;
    } else if (subsidyinstrument3) {
      actual_subsidy_instrument = check_subsidyinstrument3;
    } else if (subsidyinstrument4) {
      actual_subsidy_instrument = check_subsidyinstrument4;
    } else if (subsidyinstrument5) {
      actual_subsidy_instrument = check_subsidyinstrument5;
    } else if (subsidyinstrument6) {
      actual_subsidy_instrument = check_subsidyinstrument6;
    } else if (subsidyinstrument7) {
      actual_subsidy_instrument = check_subsidyinstrument7;
    } else if (subsidyinstrument8) {
      actual_subsidy_instrument = check_subsidyinstrument8;
    } else if (subsidyinstrument9) {
      actual_subsidy_instrument = check_subsidyinstrument9;
    }
  }

  if (nothing_selected == "Yes") {
    actual_subsidy_instrument = '';
  }

  if (multiple_select == "Yes") {

    if (subsidyinstrument1) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument1 + ",";
    }
    if (subsidyinstrument2) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument2 + ",";
    }
    if (subsidyinstrument3) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument3 + ",";
    }
    if (subsidyinstrument4) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument4 + ",";
    }
    if (subsidyinstrument5) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument5 + ",";
    }
    if (subsidyinstrument6) {
      multiple_subsidy_instrument = multiple_subsidy_instrument + check_subsidyinstrument6 + ",";
    }
    if (subsidyinstrument7) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument7 + ",";
    }
    if (subsidyinstrument8 && !subsidyinstrument9) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument8 + ",";
    }
    if (subsidyinstrument9) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument9 + ",";
    }

    var stringlength = multiple_subsidy_instrument.length - 1;

    actual_subsidy_instrument = multiple_subsidy_instrument.substr(0, stringlength);

  }


  console.log("check_subsidyinstrument1:" + check_subsidyinstrument1);
  console.log("check_subsidyinstrument2:" + check_subsidyinstrument2);
  console.log("check_subsidyinstrument3:" + check_subsidyinstrument3);
  console.log("check_subsidyinstrument4:" + check_subsidyinstrument4);
  console.log("check_subsidyinstrument5:" + check_subsidyinstrument5);
  console.log("check_subsidyinstrument6:" + check_subsidyinstrument6);
  console.log("check_subsidyinstrument7:" + check_subsidyinstrument7);
  console.log("check_subsidyinstrument8:" + check_subsidyinstrument8);
  console.log("check_subsidyinstrument9:" + check_subsidyinstrument9);
  console.log("check_subsidyinstrument9_pass:" + check_subsidyinstrument9_pass);


  console.log(" actual_subsidy_instrument:" + actual_subsidy_instrument);

  // **********************************************************
  // End of subsidy instrument read from filter display results call 
  // ************************************************************

  // ***********************
  // API integration section 
  // ***********************


  actual_subsidy_objective_trim = actual_subsidy_objective.replace(/^"(.+)"$/, '$1');
  actual_subsidy_objective_brace = '[' + actual_subsidy_objective + ']';
  actual_subsidy_objective_pass = actual_subsidy_objective_brace.replace(/^"(.*)"$/, '$1');
  actual_subsidy_objective_pass1 = JSON.parse(actual_subsidy_objective_pass);

  actual_subsidy_instrument_trim = actual_subsidy_instrument.replace(/^"(.+)"$/, '$1');
  actual_subsidy_instrument_brace = '[' + actual_subsidy_instrument + ']';
  actual_subsidy_instrument_pass = actual_subsidy_instrument_brace.replace(/^"(.*)"$/, '$1');
  actual_subsidy_instrument_pass1 = JSON.parse(actual_subsidy_instrument_pass);

  actual_spending_sector_trim = actual_spending_sector.replace(/^"(.+)"$/, '$1');
  actual_spending_sector_brace = '[' + actual_spending_sector + ']';
  actual_spending_sector_pass = actual_spending_sector_brace.replace(/^"(.*)"$/, '$1');
  actual_spending_sector_pass1 = JSON.parse(actual_spending_sector_pass);


  console.log("actual_spending_sector_pass :" + actual_spending_sector_pass);


  const data_request_all = {
    "beneficiaryName": text_beneficiaryname,
    "subsidyMeasureTitle": "",
    "subsidyObjective": actual_subsidy_objective_pass1,
    "spendingRegion": [],
    "subsidyInstrument": actual_subsidy_instrument_pass1,
    "spendingSector": actual_spending_sector_pass1,
    "legalGrantingFromDate": legal_granting_from_date,
    "legalGrantingToDate": legal_granting_to_date,
    "pageNumber": 1,
    "totalRecordsPerPage": 500000,
    "sortBy": [""]

  };
  data_request_clientside = JSON.stringify(data_request_all);

  const data_request = {
    "beneficiaryName": text_beneficiaryname,
    "subsidyMeasureTitle": "",
    "subsidyObjective": actual_subsidy_objective_pass1,
    "spendingRegion": [],
    "subsidyInstrument": actual_subsidy_instrument_pass1,
    "spendingSector": actual_spending_sector_pass1,
    "legalGrantingFromDate": legal_granting_from_date,
    "legalGrantingToDate": legal_granting_to_date,
    "pageNumber": 1,
    "totalRecordsPerPage": frontend_totalRecordsPerPage,
    "sortBy": [""]

  };

  var data = JSON.parse(JSON.stringify(data_request));
  console.log("request :" + JSON.stringify(data));

  try {
    const apidata = await axios.post(beis_url_publicsearch + '/searchResults', data);
    console.log(`Status: ${apidata.status}`);

    API_response_code = `${apidata.status}`;
    console.log("API_response_code: try" + API_response_code);
    console.log('Body: ', apidata.data);
    searchawards = apidata.data;
    var searchawards_api = apidata.data;
    console.log("searchawards" + searchawards_api);
    const seachawardstring = JSON.stringify(searchawards_api);
    const seachawardJSON = JSON.parse(seachawardstring);
    totalrows = searchawards.totalSearchResults;
    // console.log('seachawardJSON ' + seachawardJSON.awards[0]  );
    console.log(searchawards.awards[0].beneficiary.beneficiaryType);
    console.log(searchawards.awards[0].subsidyFullAmountExact);

    pageCount = Math.ceil(totalrows / frontend_totalRecordsPerPage);
    console.log("totalrows :" + totalrows);
    console.log("pageCount :" + pageCount);
    previous_page = 1;
    next_page = 2;
    start_record = 1;
    end_record = frontend_totalRecordsPerPage;
    current_page_active = 1;

    // this is for page management section
    current_page = 1;
    if (pageCount > 9) {
      start_page = 1;
      end_page = 9;
    } else if (pageCount <= 9) {
      start_page = 1;
      end_page = pageCount;
    }


    console.log("Start Page :" + start_page);
    console.log("end page :" + end_page);
    console.log("page count: " + pageCount);


    res.render('publicusersearch/filtersearch', {
      pageCount,
      previous_page,
      next_page,
      end_record,
      end_record,
      totalrows,
      current_page_active,
      start_page,
      end_page
    })


  } catch (err) {

    response_error_message = err;
    console.log("message error : " + err);
    console.log("response_error_message catch : " + response_error_message);
    res.render('publicusersearch/noresults');
  }



  // end of POST call
});




router.get('/', (req, res) => {
  res.render('publicusersearch/searchresults');
});


module.exports = router;