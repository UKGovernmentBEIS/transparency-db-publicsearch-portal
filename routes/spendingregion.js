// ********************************************************************
// Gov.UK public user search subsidy awards spending region routing 
// ********************************************************************


const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

  const { subsidyobjective } = req.body;
  const { subsidy_objective } = req.body;
  radio_subsidyobjective  = subsidyobjective ;
  text_subsidyobjective = subsidy_objective;
  console.log("radio_subsidyobjective :" + radio_subsidyobjective);
  console.log("text_subsidyobjective :" + text_subsidyobjective);

    res.render('publicusersearch/spendingregion')
  });

module.exports = router;
