// ********************************************************************
// Gov.UK public user search subsidy awards subsidy objective routing 
// ********************************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
  const { Beneficiary_name,beneficiaryname } = req.body;
  text_beneficiaryname = Beneficiary_name;
  radio_beneficiaryname  = beneficiaryname ;
  if (radio_beneficiaryname == "No") { text_beneficiaryname = "";}
  console.log("text_beneficiaryname: " + text_beneficiaryname  );
  console.log("radio_beneficiaryname: " + radio_beneficiaryname   );
    res.render('publicusersearch/subsidyobjective')
  });

module.exports = router;
