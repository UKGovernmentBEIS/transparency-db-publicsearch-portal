// ********************************************************************
// Gov.UK public user search subsidy awards legal granting date routing
// ********************************************************************

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  var { subsidyinstrument0 } = req.body;
  var { subsidyinstrument1 } = req.body;
  var { subsidyinstrument2 } = req.body;
  var { subsidyinstrument3 } = req.body;
  var { subsidyinstrument4 } = req.body;
  var { subsidyinstrument5 } = req.body;
  var { subsidyinstrument6 } = req.body;
  var { subsidyinstrument7 } = req.body;
  var { subsidyinstrument8 } = req.body;
  var { subsidyinstrument9 } = req.body;

  var count = 0;

  if (subsidyinstrument0) {
    check_subsidyinstrument0 = '"' + subsidyinstrument0 + '"';
    (count = count + 1), (subsidyinstrument9 = "");
  } else {
    check_subsidyinstrument0 = "";
  }

  if (subsidyinstrument1) {
    check_subsidyinstrument1 = '"' + subsidyinstrument1 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument1 = "";
  }

  if (subsidyinstrument2) {
    check_subsidyinstrument2 = '"' + subsidyinstrument2 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument2 = "";
  }

  if (subsidyinstrument3) {
    check_subsidyinstrument3 = '"' + subsidyinstrument3 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument3 = "";
  }

  if (subsidyinstrument4) {
    check_subsidyinstrument4 = '"' + subsidyinstrument4 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument4 = "";
  }

  if (subsidyinstrument5) {
    check_subsidyinstrument5 = '"' + subsidyinstrument5 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument5 = "";
  }

  if (subsidyinstrument6) {
    check_subsidyinstrument6 = '"' + subsidyinstrument6 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument6 = "";
  }

  if (subsidyinstrument7) {
    check_subsidyinstrument7 = '"' + subsidyinstrument7 + '"';
    count = count + 1;
  } else {
    check_subsidyinstrument7 = "";
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

  single_select = "";
  multiple_select = "";
  nothing_selected = "";
  actual_subsidy_instrument = "";
  multiple_subsidy_instrument = "";

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
    actual_subsidy_instrument = "";
  }

  if (multiple_select == "Yes") {
    if (subsidyinstrument1) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument1 + ",";
    }
    if (subsidyinstrument2) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument2 + ",";
    }
    if (subsidyinstrument3) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument3 + ",";
    }
    if (subsidyinstrument4) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument4 + ",";
    }
    if (subsidyinstrument5) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument5 + ",";
    }
    if (subsidyinstrument6) {
      multiple_subsidy_instrument =
        multiple_subsidy_instrument + check_subsidyinstrument6 + ",";
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

    actual_subsidy_instrument = multiple_subsidy_instrument.substr(
      0,
      stringlength
    );
  }

  console.log("check_subsidyinstrument0:" + check_subsidyinstrument0);
  console.log("check_subsidyinstrument1:" + check_subsidyinstrument1);
  console.log("check_subsidyinstrument2:" + check_subsidyinstrument2);
  console.log("check_subsidyinstrument3:" + check_subsidyinstrument3);
  console.log("check_subsidyinstrument4:" + check_subsidyinstrument4);
  console.log("check_subsidyinstrument5:" + check_subsidyinstrument5);
  console.log("check_subsidyinstrument6:" + check_subsidyinstrument6);
  console.log("check_subsidyinstrument7:" + check_subsidyinstrument7);
  console.log("check_subsidyinstrument8:" + check_subsidyinstrument8);
  console.log("check_subsidyinstrument9:" + check_subsidyinstrument9);

  console.log(" actual_subsidy_instrument:" + actual_subsidy_instrument);

  date_legal_granting_date_day_Error = false;
  date_legal_granting_date_month_Error = false;
  date_legal_granting_date_year_Error = false;
  date_legal_granting_date_month1_Error = false;
  date_legal_granting_date_day1_Error = false;
  date_legal_granting_date_year1_Error = false;

  date_legal_granting_date_day = "";
  date_legal_granting_date_month = "";
  date_legal_granting_date_year = "";
  date_legal_granting_date_day1 = "";
  date_legal_granting_date_month1 = "";
  date_legal_granting_date_year1 = "";

  res.render("publicusersearch/legalgrantingdate");
});

router.get("/", (req, res) => {
  res.render("publicusersearch/legalgrantingdate");
});

module.exports = router;
