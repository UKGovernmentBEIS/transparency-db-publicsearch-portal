// ********************************************************************
// Gov.UK public user search subsidy awards subsidy instrument routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

  const {
    spendingsector0
  } = req.body;
  const {
    spendingsector1
  } = req.body;
  const {
    spendingsector2
  } = req.body;
  const {
    spendingsector3
  } = req.body;
  const {
    spendingsector4
  } = req.body;
  const {
    spendingsector5
  } = req.body;
  const {
    spendingsector6
  } = req.body;
  const {
    spendingsector7
  } = req.body;
  const {
    spendingsector8
  } = req.body;
  const {
    spendingsector9
  } = req.body;
  const {
    spendingsector10
  } = req.body;
  const {
    spendingsector11
  } = req.body;
  const {
    spendingsector12
  } = req.body;
  const {
    spendingsector13
  } = req.body;
  const {
    spendingsector13a
  } = req.body;
  const {
    spendingsector14
  } = req.body;
  const {
    spendingsector15
  } = req.body;
  const {
    spendingsector16
  } = req.body;
  const {
    spendingsector17
  } = req.body;
  const {
    spendingsector18
  } = req.body;
  const {
    spendingsector19
  } = req.body;
  const {
    spendingsector20
  } = req.body;

  var count = 0;

  if (subsidy_instrument_isfirst == "Yes") {
    check_subsidyinstrument0 = "";
    check_subsidyinstrument1 = "";
    check_subsidyinstrument2 = "";
    check_subsidyinstrument3 = "";
    check_subsidyinstrument4 = "";
    check_subsidyinstrument5 = "";
    check_subsidyinstrument6 = "";
    check_subsidyinstrument7 = "";
    check_subsidyinstrument8 = "";
    check_subsidyinstrument8_pass = "";
    check_subsidyinstrument9 = "";
    check_subsidyinstrument9_pass = "";
  }


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
  if (spendingsector13a) {
    check_spendingsector13a = "\"" + spendingsector13a + "\"";
    count = count + 1;
  } else {
    check_spendingsector13a = '';
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
    } else if (spendingsector13a) {
      actual_spending_sector = check_spendingsector13a;
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
    if (spendingsector13a) {
      multiple_spending_sector = multiple_spending_sector + check_spendingsector13a + ",";
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
  console.log("check_spendingsector13a:" + check_spendingsector13a);
  console.log("check_spendingsector14:" + check_spendingsector14);
  console.log("check_spendingsector15:" + check_spendingsector15);
  console.log("check_spendingsector16:" + check_spendingsector16);
  console.log("check_spendingsector17:" + check_spendingsector17);
  console.log("check_spendingsector18:" + check_spendingsector18);
  console.log("check_spendingsector19:" + check_spendingsector19);
  console.log("check_spendingsector20:" + check_spendingsector20);

  console.log(" actual_spending_sector:" + actual_spending_sector);


  res.render('publicusersearch/subsidyinstrument');
});

router.get('/', (req, res) => {

  subsidy_instrument_isfirst = "No";

  res.render('publicusersearch/subsidyinstrument');
});

module.exports = router;