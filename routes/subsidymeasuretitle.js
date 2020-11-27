
const express = require('express');
const router = express.Router();

router.post('/',(req, res) => {
    res.render('publicusersearch/subsidymeasuretitle')
  });

  router.get('/',(req, res) => {
    res.render('publicusersearch/subsidymeasuretitle')
  });

module.exports = router;
