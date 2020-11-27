
// ********************************************************************
// Gov.UK public user search subsidy awards spending sector routing 
// ********************************************************************

const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {


    const { subsidyobjective } = req.body;
    const { subsidy_objective } = req.body;
    check_subsidyobjective  = subsidyobjective ;
    text_subsidyobjective = subsidy_objective;

    if (check_subsidyobjective == "Other") { check_subsidyobjective = text_subsidyobjective ; }
    console.log("check_subsidyobjective :" + check_subsidyobjective);
    console.log("text_subsidyobjective :" + text_subsidyobjective);
    res.render('publicusersearch/spendingsector')
  });

  router.get('/',(req, res) => {

    res.render('publicusersearch/spendingsector')
  });  

module.exports = router;
