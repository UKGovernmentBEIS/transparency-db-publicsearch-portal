
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {

    const { spendingregion } = req.body;
    var  check_spendingregion   = spendingregion 
    console.log("check_spendingregion: " + check_spendingregion );
    res.render('publicusersearch/sizeoforganisation')
  });

module.exports = router;
